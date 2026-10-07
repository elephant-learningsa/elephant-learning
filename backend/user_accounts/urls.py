from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    CurrentUserView,
    RegisterView,
    TeacherProfileView,
    AdminEducatorListView,
    AdminEducatorDetailView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", CurrentUserView.as_view(), name="current_user"),

    path(
        "teacher/profile/",
        TeacherProfileView.as_view(),
        name="teacher_profile",
    ),

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