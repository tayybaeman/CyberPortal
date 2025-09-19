from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, permissions 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, HWSerializer, CSSerializer
from .models import HardwareInventory, CyberSecurityObservation

User = get_user_model()

# -------------------------------
# User Registration & Login
# -------------------------------
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Registered successfully",
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username") or request.data.get("email")
        password = request.data.get("password", "")

        user = authenticate(request, username=username, password=password)
        if not user:
            try:
                found = User.objects.get(email__iexact=request.data.get("email",""))
                user = authenticate(request, username=found.username, password=password)
            except User.DoesNotExist:
                user = None

        if not user:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {"id": user.id, "username": user.username, "email": user.email},
        })


# -------------------------------
# Hardware & Cybersecurity APIs
# -------------------------------
class HWFormViewSet(viewsets.ModelViewSet):
    queryset = HardwareInventory.objects.all()
    serializer_class = HWSerializer
    permission_classes = [permissions.IsAuthenticated]  # Optional: protect routes


class CSFormViewSet(viewsets.ModelViewSet):
    queryset = CyberSecurityObservation.objects.all()
    serializer_class = CSSerializer
    permission_classes = [permissions.IsAuthenticated]  # Optional: protect routes
