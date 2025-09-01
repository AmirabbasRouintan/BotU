from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **kwargs):
        if not email:
            raise ValueError("Email is required")
        if not username:
            raise ValueError("Username is required")

        user = self.model(
            email=self.normalize_email(email), username=username, **kwargs
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **kwargs):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
            **kwargs,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)

    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    
    gemini_api_key = models.CharField(max_length=255, blank=True, null=True)
    
    botfuther_api_token_1 = models.CharField(max_length=255, blank=True, null=True)
    botfuther_api_token_2 = models.CharField(max_length=255, blank=True, null=True)
    botfuther_api_token_3 = models.CharField(max_length=255, blank=True, null=True)
    botfuther_api_token_4 = models.CharField(max_length=255, blank=True, null=True)
    botfuther_api_token_5 = models.CharField(max_length=255, blank=True, null=True)

    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]  

    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    image = models.ImageField(upload_to="profile/", default="media/profile/avatar.png")


class Command(models.Model):
    bot = models.ForeignKey('Bot', on_delete=models.CASCADE, related_name="commands")
    name = models.CharField(max_length=100)  
    description = models.TextField(blank=True, null=True)  
    response = models.TextField()  
    is_active = models.BooleanField(default=True)
    permissions = models.CharField(
        max_length=20,
        choices=[
            ("everyone", "Everyone"),
            ("admins", "Admins Only"),
        ],
        default="everyone"
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.name} for {self.bot.name}"


class Bot(models.Model):
    STATUS_CHOICES = [
        ("online", "Online"),
        ("offline", "Offline"),
        ("maintenance", "Maintenance"),
    ]

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="bots")
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="offline")
    color = models.CharField(max_length=32, default="bg-green-500")
    initials = models.CharField(max_length=4, default="B")
    token = models.CharField(max_length=255, unique=True, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='bot_avatars/', null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"

@receiver(post_save, sender=get_user_model())
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=get_user_model())
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()