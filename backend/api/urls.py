from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, SolicitudViewSet, CustomTokenObtainPairView
from django.contrib import admin

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'solicitudes', SolicitudViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    
    # Configuración para autenticación por email
    path('auth/', include([
        path('', include('djoser.urls')),  # Rutas básicas de Djoser
        path('', include('djoser.urls.authtoken')),  # Solo rutas de autenticación
    ])),
    
    # Endpoint personalizado para login con JWT
    path('auth/jwt/create/', CustomTokenObtainPairView.as_view(), name='jwt-create'),
    
    # Opcional: Si necesitas refresh token
    path('auth/jwt/refresh/', include('djoser.urls.jwt')),  # Solo refresh
]