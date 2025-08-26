from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Usuario, Solicitud
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate({
            'email': attrs['email'],
            'password': attrs['password']
        })
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['rol'] = user.rol
        token['email'] = user.email
        return token

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'rol']
        extra_kwargs = {
            'email': {'required': True},
            'password': {'write_only': True}
        }

class UsuarioCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'rol']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            rol=validated_data.get('rol', 'funcionario')
        )
        return user

class SolicitudSerializer(serializers.ModelSerializer):
    creada_por = UsuarioSerializer(read_only=True)
    asignada_a = UsuarioSerializer(read_only=True)

    imagen_url = serializers.SerializerMethodField()
    def validate_prioridad(self, value):
        if value not in ['alta', 'media', 'baja']:
            raise serializers.ValidationError("Prioridad debe ser alta, media o baja")
        return value

    def get_imagen_url(self, obj):
        if obj.imagen:
            return self.context['request'].build_absolute_uri(obj.imagen.url)
        return None


    class Meta:
        model = Solicitud
        fields = [
            'id', 'resumen', 'descripcion', 'imagen', 
            'prioridad', 'completada', 'creada_por', 
            'asignada_a', 'fecha_creacion'
        ]
        read_only_fields = ['creada_por', 'asignada_a', 'fecha_creacion']
        
    class Meta:
        model = Solicitud
        fields = '__all__'
        read_only_fields = ['creada_por', 'asignada_a', 'fecha_creacion']