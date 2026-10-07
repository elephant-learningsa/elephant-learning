from django.contrib.auth import get_user_model

from rest_framework import generics, permissions

from .models import TeacherProfile
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    TeacherProfileSerializer,
    AdminEducatorSerializer,
)

User = get_user_model()


# ============================================================
# PERMISSIONS
# ============================================================

class IsAdminUserRole(permissions.BasePermission):
    """
    Allows access only to authenticated Elephant Learning
    administrators.
    """

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == User.Role.ADMIN
        )


# ============================================================
# AUTHENTICATION
# ============================================================

class RegisterView(generics.CreateAPIView):
    """
    Allows new teachers and schools to create an account.

    Administrator accounts cannot be created through
    public registration.
    """

    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class CurrentUserView(generics.RetrieveAPIView):
    """
    Returns the currently authenticated user's information.
    """

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# ============================================================
# TEACHER PROFILE
# ============================================================

class TeacherProfileView(generics.RetrieveUpdateAPIView):
    """
    Returns or updates the currently authenticated teacher's
    profile.

    A TeacherProfile is automatically created if the teacher
    does not have one yet.
    """

    serializer_class = TeacherProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, created = TeacherProfile.objects.get_or_create(
            user=self.request.user
        )

        return profile


# ============================================================
# ADMIN - EDUCATORS
# ============================================================

class AdminEducatorListView(generics.ListAPIView):
    """
    Returns all registered teachers for the Elephant Learning
    admin dashboard.

    Only administrators can access this endpoint.
    """

    serializer_class = AdminEducatorSerializer
    permission_classes = [IsAdminUserRole]

    def get_queryset(self):
        return (
            User.objects
            .filter(role=User.Role.TEACHER)
            .select_related("teacher_profile")
            .order_by("-date_joined")
        )

class AdminEducatorDetailView(generics.RetrieveAPIView):
    """
    Returns a single educator's full profile.

    Only administrators can access this endpoint.
    """

    serializer_class = AdminEducatorSerializer
    permission_classes = [IsAdminUserRole]

    def get_queryset(self):
        return (
            User.objects
            .filter(role=User.Role.TEACHER)
            .select_related("teacher_profile")
        )