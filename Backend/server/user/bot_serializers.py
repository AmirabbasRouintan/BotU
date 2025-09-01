from rest_framework import serializers
from .models import Bot, Command

class CommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Command
        fields = [
            'id', 'bot', 'name', 'description', 'response', 
            'is_active', 'permissions', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class BotSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    commands = CommandSerializer(many=True, read_only=True)

    class Meta:
        model = Bot
        fields = [
            'id', 'user', 'name', 'status', 'color', 'initials',
            'token', 'description', 'avatar', 'created_at', 'updated_at', 'is_active',
            'commands'
        ]