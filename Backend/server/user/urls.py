from django.urls import path
from . import views

app_name = 'user'

urlpatterns = [
    path('bots/', views.user_bots, name='user_bots'),
    path('update_gemini_api_key/', views.update_gemini_api_key, name='update_gemini_api_key'),
    path('update_botfuther_tokens/', views.update_botfuther_tokens, name='update_botfuther_tokens'),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('ai/generate-content/', views.generate_ai_content, name='generate_ai_content'),
]