from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import UserManager


class User(AbstractUser):
    class Role(models.TextChoices):
        TEACHER = "TEACHER", "Teacher"
        SCHOOL = "SCHOOL", "School"
        ADMIN = "ADMIN", "Administrator"

    username = None

    email = models.EmailField(unique=True)

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.TEACHER,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f"{self.get_full_name()} ({self.email})"


class TeacherProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="teacher_profile",
    )

    phone = models.CharField(
        max_length=30,
        blank=True,
    )

    date_of_birth = models.DateField(
        null=True,
        blank=True,
    )

    location = models.CharField(
        max_length=150,
        blank=True,
    )

    province = models.CharField(
        max_length=100,
        blank=True,
    )

    highest_qualification = models.CharField(
        max_length=200,
        blank=True,
    )

    institution = models.CharField(
        max_length=200,
        blank=True,
    )

    field_of_study = models.CharField(
        max_length=200,
        blank=True,
    )

    years_of_experience = models.PositiveIntegerField(
        default=0,
    )

    subjects = models.TextField(
        blank=True,
    )

    grade_levels = models.CharField(
        max_length=200,
        blank=True,
    )

    employment_type = models.CharField(
        max_length=100,
        blank=True,
    )

    preferred_location = models.CharField(
        max_length=200,
        blank=True,
    )

    willing_to_relocate = models.BooleanField(
        default=False,
    )

    bio = models.TextField(
        blank=True,
    )

    profile_completed = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"{self.user.get_full_name()} - Teacher Profile"