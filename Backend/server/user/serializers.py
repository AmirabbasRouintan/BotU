from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User
from .bot_serializers import BotSerializer

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password_confirm"]

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError("Passwords do not match")
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    login = serializers.CharField() 
    password = serializers.CharField()
    remember_me = serializers.BooleanField(required=False, default=False)

    def validate(self, attrs):
        login = attrs.get("login")
        password = attrs.get("password")

        if login and password:
            user = authenticate(username=login, password=password)
            if not user:
                try:
                    user = User.objects.get(email=login)
                    if not user.check_password(password):
                        user = None
                except User.DoesNotExist:
                    user = None

            if not user:
                raise serializers.ValidationError("Invalid credentials")
            
            attrs["user"] = user
        else:
            raise serializers.ValidationError("Must include 'login' and 'password'")
        
        return attrs


class UserSerializer(serializers.ModelSerializer):
    bots = BotSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "gemini_api_key",
            "botfuther_api_token_1",
            "botfuther_api_token_2", 
            "botfuther_api_token_3",
            "botfuther_api_token_4",
            "botfuther_api_token_5",
            "is_admin",
            "is_active",
            "is_staff",
            "is_superuser",
            "created_at",
            "updated_at",
            "bots"
        ]
        read_only_fields = ["id", "is_admin", "is_active", "is_staff", "is_superuser", "created_at", "updated_at"]


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "gemini_api_key",
            "botfuther_api_token_1",
            "botfuther_api_token_2", 
            "botfuther_api_token_3",
            "botfuther_api_token_4",
            "botfuther_api_token_5",
        ]
        read_only_fields = ["username"]