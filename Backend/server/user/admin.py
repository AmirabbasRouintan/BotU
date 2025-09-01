from django.contrib import admin

from .models import User, Profile, Bot

@admin.register(Bot)
class BotAdmin(admin.ModelAdmin):
	list_display = ("id", "name", "user", "status", "is_active", "created_at")
	search_fields = ("name", "user__username", "token")
	list_filter = ("status", "is_active", "created_at")

admin.site.register(User)
admin.site.register(Profile)
