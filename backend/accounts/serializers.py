from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):

    # Enforce uniqueness, required status, and valid email format
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="A user with that email already exists."
            )
        ]
    )

    # Enforce write-only, require a minimum of 8 characters, 
    # and render as a hidden password input in the DRF browsable API.
    password = serializers.CharField(
        write_only=True, 
        min_length=8, 
        style={'input_type': 'password'}
    )
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        """
        Custom create method to handle user registration securely.
        - User.objects.create(): Saves the password in plain text (insecure).
        - User.objects.create_user(): Automatically hashes/encrypts the password.
        """
        
        # Approach 1: Explicit field mapping (ideal for custom preprocessing)
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        # Approach 2 (Alternative): Unpacking kwargs
        # Use '**validated_data' to automatically handle future fields 
        # (e.g., billing address, gender) without rewriting explicit arguments above.
        # return User.objects.create_user(**validated_data)