from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    class Role(models.TextChoices):
        TEACHER = "TEACHER", "Teacher"
        SCHOOL = "SCHOOL", "School"
        ADMIN = "ADMIN", "Administrator"

    email = models.EmailField(unique=True)

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.TEACHER,
    )

    def __str__(self):
        return f"{self.get_full_name()} ({self.email})"