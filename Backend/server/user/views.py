# List all bots for the current authenticated user
from rest_framework import response, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .bot_serializers import BotSerializer
from .serializers import RegistrationSerializer, LoginSerializer, UserSerializer
from .models import Bot

User = get_user_model()

@api_view(["POST"])
@permission_classes([AllowAny])
def generate_ai_content(request):
    """
    Proxy endpoint for generating content with Gemini AI.
    This avoids CORS issues by making the API call from the backend.
    """
    try:
        prompt = request.data.get('prompt', '')
        api_key = request.data.get('api_key', '')
        
        if not prompt:
            return response.Response({
                'error': 'Prompt is required'
            }, status=status.HTTP_400_BAD_REQUEST)
            
        if not api_key:
            return response.Response({
                'error': 'API key is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Make request to Gemini API
        import requests
        import json
        
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
        
        headers = {
            "Content-Type": "application/json"
        }
        
        data = {
            "contents": [{
                "parts": [{
                    "text": prompt
                }]
            }]
        }
        
        gemini_response = requests.post(url, headers=headers, data=json.dumps(data))
        
        if gemini_response.status_code != 200:
            return response.Response({
                'error': f'Gemini API error: {gemini_response.text}'
            }, status=gemini_response.status_code)
        
        response_data = gemini_response.json()
        
        # Extract the text from the response
        try:
            text = response_data['candidates'][0]['content']['parts'][0]['text']
        except (KeyError, IndexError):
            text = "Sorry, I couldn't generate a response. Please try rephrasing your question."
        
        return response.Response({
            'text': text
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return response.Response({
            'error': f'An error occurred: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([AllowAny])
def user_bots(request):
    # Get all bots
    bots = Bot.objects.all()
    serializer = BotSerializer(bots, many=True)
    return response.Response(serializer.data)


@api_view(["POST"])
@permission_classes([AllowAny])
def update_gemini_api_key(request):
    username = request.data.get('username', '')
    gemini_api_key = request.data.get('gemini_api_key', '')
    
    if not username:
        return response.Response({
            'error': 'Username is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(username=username)
        user.gemini_api_key = gemini_api_key
        user.save()
        
        return response.Response({
            'message': 'Gemini API key updated successfully',
            'gemini_api_key': user.gemini_api_key
        }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return response.Response({
            'error': 'User not found'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return response.Response({
            'error': f'An error occurred: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([AllowAny])
def update_botfuther_tokens(request):
    username = request.data.get('username', '')
    
    if not username:
        return response.Response({
            'error': 'Username is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(username=username)
        
        # Update BotFuther API tokens
        user.botfuther_api_token_1 = request.data.get('botfuther_api_token_1', '')
        user.botfuther_api_token_2 = request.data.get('botfuther_api_token_2', '')
        user.botfuther_api_token_3 = request.data.get('botfuther_api_token_3', '')
        user.botfuther_api_token_4 = request.data.get('botfuther_api_token_4', '')
        user.botfuther_api_token_5 = request.data.get('botfuther_api_token_5', '')
        
        user.save()
        
        return response.Response({
            'message': 'BotFuther API tokens updated successfully',
            'tokens': {
                'botfuther_api_token_1': user.botfuther_api_token_1,
                'botfuther_api_token_2': user.botfuther_api_token_2,
                'botfuther_api_token_3': user.botfuther_api_token_3,
                'botfuther_api_token_4': user.botfuther_api_token_4,
                'botfuther_api_token_5': user.botfuther_api_token_5
            }
        }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return response.Response({
            'error': 'User not found'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return response.Response({
            'error': f'An error occurred: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return response.Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'username': user.username,
                'email': user.email
            }
        }, status=status.HTTP_201_CREATED)
    return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        login = serializer.validated_data.get('login')
        password = serializer.validated_data.get('password')
        remember_me = serializer.validated_data.get('remember_me', False)
        
        # Try to authenticate with username or email
        user = authenticate(username=login, password=password)
        if not user:
            # Try with email if username authentication failed
            try:
                user = User.objects.get(email=login)
                if not user.check_password(password):
                    user = None
            except User.DoesNotExist:
                user = None
        
        if user:
            refresh = RefreshToken.for_user(user)
            return response.Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'gemini_api_key': user.gemini_api_key
                },
                'remember_me': remember_me
            }, status=status.HTTP_200_OK)
        else:
            return response.Response({
                'detail': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
    return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)