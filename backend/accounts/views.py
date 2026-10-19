from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny] # means can access by any one 

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated] ## to access the user must authenticated

    def get(self,request):
        response={
            'status':'Request was permitted'
        }
        return Response(response)