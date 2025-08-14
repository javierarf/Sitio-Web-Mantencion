from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

# Custom Manager
class UsuarioManager(BaseUserManager):
    def create_user(self, username, email=None, password=None, rol='funcionario', **extra_fields):
        if not username:
            raise ValueError('El usuario debe tener nombre de usuario')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, rol=rol, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('rol', 'admin')  # Forzamos rol admin

        return self.create_user(username, email, password, **extra_fields)

# Usuario personalizado
class Usuario(AbstractUser):
    ROLES = (
        ('funcionario', 'Funcionario'),
        ('mantencion', 'Mantención'),
        ('admin', 'Administrador'),
    )
    rol = models.CharField(max_length=20, choices=ROLES, default='funcionario')

    objects = UsuarioManager()

# Modelo de solicitudes
class Solicitud(models.Model):
    resumen = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='solicitudes/', blank=True, null=True)
    prioridad = models.CharField(
        max_length=10,
        choices=[('alta', 'Alta'), ('media', 'Media'), ('baja', 'Baja')],
        default='media'
    )
    completada = models.BooleanField(default=False)
    creada_por = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='solicitudes')
    asignada_a = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, related_name='tareas')
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.resumen} - {self.prioridad}"
