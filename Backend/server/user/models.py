# user/models.py

from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver


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
    # Added username field to match the frontend form
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)

    # Made first_name and last_name optional as they are not in the signup form
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)

    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    # Set USERNAME_FIELD to 'username' for authentication
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]  # email is now required upon creation

    def __str__(self):
        return self.username


# The rest of your models.py (Profile model and signals) can remain the same
# ...
class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    image = models.ImageField(upload_to="profile/", default="media/profile/avatar.png")
    about = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} Profile"


@receiver(post_save, sender=get_user_model())
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=get_user_model())
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
