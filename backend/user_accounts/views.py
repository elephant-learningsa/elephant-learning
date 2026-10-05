from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import TeacherProfile
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    TeacherProfileSerializer,
)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class TeacherProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = TeacherProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, created = TeacherProfile.objects.get_or_create(
            user=self.request.user
        )

        return profile