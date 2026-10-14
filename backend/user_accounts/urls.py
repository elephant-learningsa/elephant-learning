from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    CurrentUserView,
    RegisterView,
    SchoolRegisterView,
    TeacherProfileView,
    SchoolProfileView,
    AdminEducatorListView,
    AdminEducatorDetailView,
    SchoolEducatorSearchView,
    SchoolRequirementListCreateView,
    SchoolRequirementDetailView,
    RequirementCandidateListCreateView,
    SchoolCandidateDetailView,
)

urlpatterns = [
    # Authentication
    path("register/", RegisterView.as_view(), name="register"),
    path(
        "schools/register/",
        SchoolRegisterView.as_view(),
        name="school_register",
    ),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", CurrentUserView.as_view(), name="current_user"),

    # Teacher profile
    path(
        "teacher/profile/",
        TeacherProfileView.as_view(),
        name="teacher_profile",
    ),

    # School profile
    path(
        "school/profile/",
        SchoolProfileView.as_view(),
        name="school_profile",
    ),

    # School educator directory
    path(
        "school/educators/",
        SchoolEducatorSearchView.as_view(),
        name="school_educators",
    ),

    # School recruitment requirements
    path(
        "school/requirements/",
        SchoolRequirementListCreateView.as_view(),
        name="school_requirements",
    ),
    path(
        "school/requirements/<int:pk>/",
        SchoolRequirementDetailView.as_view(),
        name="school_requirement_detail",
    ),

    # Educators linked to a requirement
    path(
        "school/requirements/<int:requirement_id>/candidates/",
        RequirementCandidateListCreateView.as_view(),
        name="requirement_candidates",
    ),
    path(
        "school/candidates/<int:pk>/",
        SchoolCandidateDetailView.as_view(),
        name="school_candidate_detail",
    ),

    # Admin - Educators
    path(
        "admin/educators/",
        AdminEducatorListView.as_view(),
        name="admin_educators",
    ),
    path(
        "admin/educators/<int:pk>/",
        AdminEducatorDetailView.as_view(),
        name="admin_educator_detail",
    ),
]