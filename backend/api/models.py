from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    ROLES = (
        ('funcionario', 'Funcionario'),
        ('mantencion', 'Mantención'),
        ('admin', 'Administrador'),
    )
    rol = models.CharField(max_length=20, choices=ROLES)

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
