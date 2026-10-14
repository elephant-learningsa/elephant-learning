from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import (
    TeacherProfile,
    SchoolProfile,
    TeacherRequirement,
    TeacherCandidate,
)
from django.db import transaction



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

    role = serializers.ChoiceField(
        choices=[
            (User.Role.TEACHER, "Teacher"),
            (User.Role.SCHOOL, "School"),
        ],
        required=False,
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

        return attrs

    def create(self, validated_data):
        from django.db import transaction

        validated_data.pop("password_confirm")
        password = validated_data.pop("password")

        # The view should set this from the registration endpoint.
        role = self.context.get("registration_role")

        if role not in (User.Role.TEACHER, User.Role.SCHOOL):
            raise serializers.ValidationError(
                {"role": "A valid registration type is required."}
            )

        validated_data["role"] = role

        with transaction.atomic():
            user = User(**validated_data)
            user.set_password(password)
            user.save()

            if role == User.Role.TEACHER:
                TeacherProfile.objects.create(user=user)

            elif role == User.Role.SCHOOL:
                SchoolProfile.objects.create(user=user)

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



class SchoolProfileSerializer(serializers.ModelSerializer):
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
        model = SchoolProfile
        fields = [
            "first_name",
            "last_name",
            "email",
            "school_name",
            "school_type",
            "registration_number",
            "phone",
            "province",
            "town_or_city",
            "address",
            "contact_person",
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


class SchoolRegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        validators=[validate_password],
        style={"input_type": "password"},
    )
    password_confirm = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
    )
    city = serializers.CharField(
        source="town_or_city",
        max_length=150,
    )
    position = serializers.CharField(
        source="contact_position",
        max_length=150,
        required=False,
        allow_blank=True,
    )

    class Meta:
        model = SchoolProfile
        fields = [
            "first_name",
            "last_name",
            "email",
            "password",
            "password_confirm",
            "school_name",
            "school_type",
            "country",
            "city",
            "address",
            "position",
            "phone",
            "subjects",
            "grades",
            "number_of_teachers",
            "employment_type",
            "qualifications",
            "experience",
            "start_date",
            "additional_requirements",
        ]

    def validate_email(self, value):
        value = value.strip().lower()

        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )

        return value

    def validate(self, attrs):
        if attrs.get("password") != attrs.get("password_confirm"):
            raise serializers.ValidationError({
                "password_confirm": "Passwords do not match."
            })

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        validated_data.pop("password_confirm")
        password = validated_data.pop("password")
        first_name = validated_data.pop("first_name")
        last_name = validated_data.pop("last_name")
        email = validated_data.pop("email")

        user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            role=User.Role.SCHOOL,
        )
        user.set_password(password)
        user.save()

        SchoolProfile.objects.create(
            user=user,
            contact_person=f"{first_name} {last_name}".strip(),
            **validated_data,
        )

        return user

class AdminEducatorSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    profile_completion = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "first_name",
            "last_name",
            "email",
            "role",
            "date_joined",
            "profile",
            "profile_completion",
        ]

    def get_full_name(self, obj):
        full_name = obj.get_full_name().strip()

        return full_name or obj.email

    def get_profile(self, obj):
        try:
            profile = obj.teacher_profile
        except TeacherProfile.DoesNotExist:
            return None

        return {
            "phone": profile.phone,
            "location": profile.location,
            "province": profile.province,
            "highest_qualification": profile.highest_qualification,
            "institution": profile.institution,
            "field_of_study": profile.field_of_study,
            "years_of_experience": profile.years_of_experience,
            "subjects": profile.subjects,
            "grade_levels": profile.grade_levels,
            "employment_type": profile.employment_type,
            "preferred_location": profile.preferred_location,
            "willing_to_relocate": profile.willing_to_relocate,
            "bio": profile.bio,
        }

    def get_profile_completion(self, obj):
        try:
            profile = obj.teacher_profile
        except TeacherProfile.DoesNotExist:
            return 0

        completed_fields = 0
        total_fields = 12

        required_fields = [
            obj.first_name,
            obj.last_name,
            profile.phone,
            profile.location,
            profile.province,
            profile.highest_qualification,
            profile.institution,
            profile.field_of_study,
            profile.subjects,
            profile.grade_levels,
            profile.employment_type,
            profile.preferred_location,
        ]

        for value in required_fields:
            if value and str(value).strip():
                completed_fields += 1

        return round(
            (completed_fields / total_fields) * 100
        )


class EducatorDirectorySerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = TeacherProfile
        fields = [
            "id",
            "first_name",
            "last_name",
            "full_name",
            "location",
            "province",
            "highest_qualification",
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

    def get_full_name(self, obj):
        return obj.user.get_full_name().strip() or "Educator"


class TeacherRequirementSerializer(serializers.ModelSerializer):
    school_name = serializers.CharField(
        source="school.school_name",
        read_only=True,
    )

    class Meta:
        model = TeacherRequirement
        fields = [
            "id",
            "school_name",
            "title",
            "subjects",
            "grades",
            "number_of_teachers",
            "minimum_experience",
            "qualifications",
            "employment_type",
            "province",
            "preferred_location",
            "start_date",
            "additional_requirements",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "school_name",
            "status",
            "created_at",
            "updated_at",
        ]


class TeacherCandidateSerializer(serializers.ModelSerializer):
    teacher_id = serializers.PrimaryKeyRelatedField(
        source="teacher",
        queryset=TeacherProfile.objects.select_related("user").all(),
        write_only=True,
        required=False,
    )
    educator = serializers.SerializerMethodField()

    class Meta:
        model = TeacherCandidate
        fields = [
            "id",
            "teacher_id",
            "educator",
            "stage",
            "interview_at",
            "school_notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "educator",
            "created_at",
            "updated_at",
        ]

    def get_educator(self, obj):
        return EducatorDirectorySerializer(obj.teacher).data
