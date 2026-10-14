
from django.contrib.auth import get_user_model
from django.db import models
from django.shortcuts import get_object_or_404

from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError

from .models import (
    TeacherProfile,
    SchoolProfile,
    TeacherRequirement,
    TeacherCandidate,
)

from .serializers import (
    RegisterSerializer,
    SchoolRegisterSerializer,
    UserSerializer,
    TeacherProfileSerializer,
    SchoolProfileSerializer,
    AdminEducatorSerializer,
    EducatorDirectorySerializer,
    TeacherRequirementSerializer,
    TeacherCandidateSerializer,
)

User = get_user_model()


# ============================================================
# PERMISSIONS
# ============================================================

class IsAdminUserRole(permissions.BasePermission):
    """Allows access only to authenticated administrators."""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == User.Role.ADMIN
        )


class IsTeacherUserRole(permissions.BasePermission):
    """Allows access only to authenticated teacher accounts."""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == User.Role.TEACHER
        )


class IsSchoolUserRole(permissions.BasePermission):
    """Allows access only to authenticated school accounts."""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == User.Role.SCHOOL
        )


# ============================================================
# REGISTRATION
# ============================================================

class RegisterView(generics.CreateAPIView):
    """Registers a teacher account."""

    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["registration_role"] = User.Role.TEACHER
        return context


class SchoolRegisterView(generics.CreateAPIView):
    """Registers a school account using SchoolRegisterSerializer."""

    serializer_class = SchoolRegisterSerializer
    permission_classes = [permissions.AllowAny]


# ============================================================
# AUTHENTICATION
# ============================================================

class CurrentUserView(generics.RetrieveAPIView):
    """Returns the currently authenticated user's information."""

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# ============================================================
# TEACHER PROFILE
# ============================================================

class TeacherProfileView(generics.RetrieveUpdateAPIView):
    """Returns or updates the authenticated teacher's profile."""

    serializer_class = TeacherProfileSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsTeacherUserRole,
    ]

    def get_object(self):
        profile, _ = TeacherProfile.objects.get_or_create(
            user=self.request.user
        )
        return profile


# ============================================================
# SCHOOL PROFILE
# ============================================================

class SchoolProfileView(generics.RetrieveUpdateAPIView):
    """Returns or updates the authenticated school's profile."""

    serializer_class = SchoolProfileSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsSchoolUserRole,
    ]

    def get_object(self):
        profile, _ = SchoolProfile.objects.get_or_create(
            user=self.request.user
        )
        return profile


# ============================================================
# ADMIN - EDUCATORS
# ============================================================

class AdminEducatorListView(generics.ListAPIView):
    """Returns all registered teachers for the admin dashboard."""

    serializer_class = AdminEducatorSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsAdminUserRole,
    ]

    def get_queryset(self):
        return (
            User.objects
            .filter(role=User.Role.TEACHER)
            .select_related("teacher_profile")
            .order_by("-date_joined")
        )


class AdminEducatorDetailView(generics.RetrieveAPIView):
    """Returns an individual teacher's profile for administrators."""

    serializer_class = AdminEducatorSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsAdminUserRole,
    ]

    def get_queryset(self):
        return (
            User.objects
            .filter(role=User.Role.TEACHER)
            .select_related("teacher_profile")
        )


# ============================================================
# SCHOOL - EDUCATOR DIRECTORY
# ============================================================

class SchoolEducatorSearchView(generics.ListAPIView):
    """Searches registered teachers by professional criteria."""

    serializer_class = EducatorDirectorySerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsSchoolUserRole,
    ]

    def get_queryset(self):
        queryset = (
            TeacherProfile.objects
            .filter(user__role=User.Role.TEACHER)
            .select_related("user")
            .order_by("user__last_name", "user__first_name")
        )

        params = self.request.query_params

        search = params.get("search", "").strip()
        subject = params.get("subject", "").strip()
        grade = params.get("grade", "").strip()
        qualification = params.get("qualification", "").strip()
        province = params.get("province", "").strip()
        location = params.get("location", "").strip()
        minimum_experience = params.get("min_experience", "").strip()

        if search:
            queryset = queryset.filter(
                models.Q(user__first_name__icontains=search)
                | models.Q(user__last_name__icontains=search)
                | models.Q(subjects__icontains=search)
                | models.Q(highest_qualification__icontains=search)
                | models.Q(preferred_location__icontains=search)
                | models.Q(province__icontains=search)
            )

        if subject:
            queryset = queryset.filter(subjects__icontains=subject)

        if grade:
            queryset = queryset.filter(grade_levels__icontains=grade)

        if qualification:
            queryset = queryset.filter(
                highest_qualification__icontains=qualification
            )

        if province:
            queryset = queryset.filter(province__icontains=province)

        if location:
            queryset = queryset.filter(
                models.Q(location__icontains=location)
                | models.Q(preferred_location__icontains=location)
            )

        if minimum_experience:
            try:
                years = int(minimum_experience)
                if years < 0:
                    raise ValueError
            except ValueError:
                raise ValidationError({
                    "min_experience": (
                        "Enter a valid non-negative number."
                    )
                })

            queryset = queryset.filter(
                years_of_experience__gte=years
            )

        return queryset.distinct()


# ============================================================
# SCHOOL - RECRUITMENT REQUIREMENTS
# ============================================================

class SchoolRequirementListCreateView(generics.ListCreateAPIView):
    """Lists and creates requirements for the logged-in school."""

    serializer_class = TeacherRequirementSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsSchoolUserRole,
    ]

    def get_queryset(self):
        return (
            TeacherRequirement.objects
            .filter(school__user=self.request.user)
            .order_by("-created_at")
        )

    def perform_create(self, serializer):
        school, _ = SchoolProfile.objects.get_or_create(
            user=self.request.user
        )
        serializer.save(school=school)


class SchoolRequirementDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    """Retrieves, updates, or deletes the school's own requirement."""

    serializer_class = TeacherRequirementSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsSchoolUserRole,
    ]

    def get_queryset(self):
        return TeacherRequirement.objects.filter(
            school__user=self.request.user
        )


# ============================================================
# SCHOOL - CANDIDATE MANAGEMENT
# ============================================================

class RequirementCandidateListCreateView(generics.ListCreateAPIView):
    """Lists and adds educators to a school's requirement."""

    serializer_class = TeacherCandidateSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsSchoolUserRole,
    ]

    def get_requirement(self):
        return get_object_or_404(
            TeacherRequirement,
            pk=self.kwargs["requirement_id"],
            school__user=self.request.user,
        )

    def get_queryset(self):
        return (
            TeacherCandidate.objects
            .filter(requirement=self.get_requirement())
            .select_related("teacher__user", "requirement")
        )

    def perform_create(self, serializer):
        requirement = self.get_requirement()
        teacher = serializer.validated_data.get("teacher")

        if teacher is None:
            raise ValidationError({
                "teacher_id": "Select an educator to add."
            })

        if teacher.user.role != User.Role.TEACHER:
            raise ValidationError({
                "teacher_id": "The selected account is not a teacher."
            })

        if TeacherCandidate.objects.filter(
            requirement=requirement,
            teacher=teacher,
        ).exists():
            raise ValidationError({
                "teacher_id": (
                    "This educator is already linked to this requirement."
                )
            })

        serializer.save(requirement=requirement)


class SchoolCandidateDetailView(generics.RetrieveUpdateAPIView):
    """Retrieves or updates a candidate belonging to the logged-in school."""

    serializer_class = TeacherCandidateSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsSchoolUserRole,
    ]

    def get_queryset(self):
        return (
            TeacherCandidate.objects
            .filter(requirement__school__user=self.request.user)
            .select_related("teacher__user", "requirement")
        )
