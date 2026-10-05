from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import TeacherProfile


User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={"input_type": "password"},
    )

    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "password",
            "password_confirm",
            "role",
        ]

    def validate_email(self, value):
        value = value.lower().strip()

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )

        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError(
                {"password_confirm": "Passwords do not match."}
            )

        if attrs["role"] == User.Role.ADMIN:
            raise serializers.ValidationError(
                {"role": "Administrator accounts cannot be created through registration."}
            )

        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")

        password = validated_data.pop("password")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "role",
        ]
        read_only_fields = [
            "id",
            "role",
        ]

class TeacherProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        source="user.first_name",
        required=False,
    )

    last_name = serializers.CharField(
        source="user.last_name",
        required=False,
    )

    email = serializers.EmailField(
        source="user.email",
        read_only=True,
    )

    class Meta:
        model = TeacherProfile
        fields = [
            "first_name",
            "last_name",
            "email",
            "phone",
            "date_of_birth",
            "location",
            "province",
            "highest_qualification",
            "institution",
            "field_of_study",
            "years_of_experience",
            "subjects",
            "grade_levels",
            "employment_type",
            "preferred_location",
            "willing_to_relocate",
            "bio",
            "profile_completed",
        ]
        read_only_fields = [
            "email",
            "profile_completed",
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})

        if "first_name" in user_data:
            instance.user.first_name = user_data["first_name"]

        if "last_name" in user_data:
            instance.user.last_name = user_data["last_name"]

        if user_data:
            instance.user.save()

        for attribute, value in validated_data.items():
            setattr(instance, attribute, value)

        instance.save()

        return instance