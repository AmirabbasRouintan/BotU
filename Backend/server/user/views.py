# user/views.py

from django.contrib.auth import authenticate
from django.conf import settings
from django.middleware import csrf
from django.db.models import Q
from rest_framework import (
    exceptions as rest_exceptions,
    response,
    decorators as rest_decorators,
    permissions as rest_permissions,
)
from rest_framework_simplejwt import (
    tokens,
    views as jwt_views,
    serializers as jwt_serializers,
    exceptions as jwt_exceptions,
)
from . import serializers, models


def get_user_tokens(user):
    refresh = tokens.RefreshToken.for_user(user)
    return {"refresh_token": str(refresh), "access_token": str(refresh.access_token)}


@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def loginView(request):
    serializer = serializers.LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    login_identifier = serializer.validated_data["login"]
    password = serializer.validated_data["password"]
    # UPDATED: Get the 'remember_me' value from the validated data
    remember_me = serializer.validated_data.get("remember_me", False)

    try:
        user_query = models.User.objects.get(
            Q(username=login_identifier) | Q(email=login_identifier)
        )
    except models.User.DoesNotExist:
        user_query = None

    if user_query:
        user = authenticate(username=user_query.username, password=password)
    else:
        user = None

    if user is not None:
        tokens = get_user_tokens(user)
        res = response.Response()

        # UPDATED: Conditional logic for setting cookie expiration
        if remember_me:
            access_token_expires = settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME_REMEMBER"]
            refresh_token_expires = settings.SIMPLE_JWT[
                "REFRESH_TOKEN_LIFETIME_REMEMBER"
            ]
        else:
            access_token_expires = settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"]
            refresh_token_expires = settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"]

        res.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=tokens["access_token"],
            expires=access_token_expires,  # Use the new expiration value
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )

        res.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"],
            value=tokens["refresh_token"],
            expires=refresh_token_expires,  # Use the new expiration value
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )

        res.data = {"success": "Login successful", "tokens": tokens}
        res["X-CSRFToken"] = csrf.get_token(request)
        return res

    raise rest_exceptions.AuthenticationFailed(
        "Username/Email or Password is incorrect!"
    )


@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def registerView(request):
    serializer = serializers.RegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()

    if user is not None:
        return response.Response(
            {"message": "User registered successfully!"}, status=201
        )

    return response.Response(serializer.errors, status=400)


@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def logoutView(request):
    try:
        refreshToken = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"])
        token = tokens.RefreshToken(refreshToken)
        token.blacklist()

        res = response.Response()
        res.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE"])
        res.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"])
        res.delete_cookie("X-CSRFToken")
        res.delete_cookie("csrftoken")
        res["X-CSRFToken"] = None
        res.data = {"success": "Logout successful"}
        return res
    except Exception:
        raise rest_exceptions.ParseError("Invalid token")


class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs["refresh"] = self.context["request"].COOKIES.get(
            settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"]
        )
        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise jwt_exceptions.InvalidToken("No valid token found in cookie")


class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            # Note: The refresh view does not respect "remember me" as it uses
            # the original lifetime of the refresh token. This is standard behavior.
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"],
                value=response.data["refresh"],
                expires=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )

            del response.data["refresh"]
        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)


@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def user(request):
    try:
        user_obj = models.User.objects.get(id=request.user.id)
    except models.User.DoesNotExist:
        return response.Response(status=404)

    serializer = serializers.UserSerializer(user_obj)
    return response.Response(serializer.data)
