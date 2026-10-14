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


class SchoolProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="school_profile",
    )

    school_name = models.CharField(
        max_length=200,
        blank=True,
    )

    school_type = models.CharField(
        max_length=100,
        blank=True,
    )

    registration_number = models.CharField(
        max_length=100,
        blank=True,
    )

    phone = models.CharField(
        max_length=30,
        blank=True,
    )

    province = models.CharField(
        max_length=100,
        blank=True,
    )

    town_or_city = models.CharField(
        max_length=150,
        blank=True,
    )

    address = models.TextField(
        blank=True,
    )

    contact_person = models.CharField(
        max_length=200,
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

    
    country = models.CharField(max_length=100, default="South Africa")
    contact_position = models.CharField(max_length=150, blank=True)

    subjects = models.JSONField(default=list, blank=True)
    grades = models.JSONField(default=list, blank=True)

    number_of_teachers = models.PositiveIntegerField(default=1)
    employment_type = models.CharField(max_length=100, blank=True)
    qualifications = models.CharField(max_length=200, blank=True)
    experience = models.CharField(max_length=100, blank=True)

    start_date = models.DateField(null=True, blank=True)
    additional_requirements = models.TextField(blank=True)


    def __str__(self):
        return self.school_name or f"School Profile - {self.user.email}"


class TeacherRequirement(models.Model):
    class Status(models.TextChoices):
        OPEN = "OPEN", "Open"
        REVIEWING = "REVIEWING", "Reviewing"
        FILLED = "FILLED", "Filled"
        CLOSED = "CLOSED", "Closed"

    school = models.ForeignKey(
        SchoolProfile,
        on_delete=models.CASCADE,
        related_name="requirements",
    )
    title = models.CharField(max_length=200)
    subjects = models.JSONField(default=list, blank=True)
    grades = models.JSONField(default=list, blank=True)
    number_of_teachers = models.PositiveIntegerField(default=1)
    minimum_experience = models.PositiveIntegerField(default=0)
    qualifications = models.CharField(max_length=200, blank=True)
    employment_type = models.CharField(max_length=100, blank=True)
    province = models.CharField(max_length=100, blank=True)
    preferred_location = models.CharField(max_length=200, blank=True)
    start_date = models.DateField(null=True, blank=True)
    additional_requirements = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.OPEN,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.school.school_name}"


class TeacherCandidate(models.Model):
    class Stage(models.TextChoices):
        MATCHED = "MATCHED", "Matched"
        SHORTLISTED = "SHORTLISTED", "Shortlisted"
        INTERVIEW = "INTERVIEW", "Interview"
        SELECTED = "SELECTED", "Selected"
        PLACED = "PLACED", "Placed"
        REJECTED = "REJECTED", "Not proceeding"

    requirement = models.ForeignKey(
        TeacherRequirement,
        on_delete=models.CASCADE,
        related_name="candidates",
    )
    teacher = models.ForeignKey(
        TeacherProfile,
        on_delete=models.CASCADE,
        related_name="school_applications",
    )
    stage = models.CharField(
        max_length=20,
        choices=Stage.choices,
        default=Stage.MATCHED,
    )
    interview_at = models.DateTimeField(null=True, blank=True)
    school_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["requirement", "teacher"],
                name="unique_teacher_per_requirement",
            )
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.teacher.user.get_full_name()} - {self.requirement.title}"
