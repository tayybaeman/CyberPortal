from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import HardwareInventory, CyberSecurityObservation

User = get_user_model()

# -------------------------------
# User Registration Serializer
# -------------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("username", "email", "password")

    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Username already taken.")
        return value

    def validate_email(self, value):
        if value and User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email already registered.")
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"]
        )

# -------------------------------
# Hardware Inventory Serializer
# -------------------------------
class HWSerializer(serializers.ModelSerializer):
    class Meta:
        model = HardwareInventory
        fields = '__all__'

# -------------------------------
# Cybersecurity Observation Serializer
# -------------------------------
class CSSerializer(serializers.ModelSerializer):
    class Meta:
        model = CyberSecurityObservation
        fields = '__all__'
