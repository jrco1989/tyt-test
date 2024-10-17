from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.validators import FileExtensionValidator 

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, cedula, password=None, is_active=True, **kwargs):
        if not cedula:
            raise ValueError("Debe tener campo cédula")

        user = self.model(
            cedula=cedula, is_active=is_active, **kwargs
        )
        user.set_password(cedula)
        user.save(using=self._db)

        return user

    def create_superuser(self, **kwargs):
        user = self.create_user(**kwargs)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class User(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = "cedula"

    REQUIRED_FIELDS = []

    cedula = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Cédula",
        help_text="""Ten en cuenta que al cambiar el cédula,
        ese sería con el que ingresarías a la plataforma.""",
    )

    email = models.EmailField(
        blank=True,
        max_length=200,
        verbose_name="Correo electrónico",
    )

    name = models.CharField(
        blank=True,
        max_length=200,
        verbose_name="Nombre",
    )

    last_name = models.CharField(
        blank=True,
        max_length=200,
        verbose_name="Apellido",
    )

    is_active = models.BooleanField(
        default=True,
        verbose_name="Activo",
        help_text="Indica si el usuario puede ser tratado como activo.",
    )

    is_staff = models.BooleanField(
        default=False,
        verbose_name="Staff",
        help_text="Indica si puede entrar al sitio de administración.",
    )

    date_joined = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de registro",
    )

    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    modified = models.DateTimeField(
        auto_now_add=True, verbose_name="Fecha de Actualización"
    )

    objects = UserManager()

    class Meta:
        verbose_name = "usuario"
        verbose_name_plural = "usuarios"
    
    def __str__(self):
        return self.cedula

class UserActionLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    action = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.action} at {self.timestamp}"
    

class Event(models.Model):

    name = models.CharField(
        max_length = 100,
        verbose_name= 'Nombre'
    )

    description = models.TextField(
        max_length = 1000,
        verbose_name= 'Descripción'
    )

    imagen = models.ImageField(
        upload_to='media/',
        blank=True,
    )

    video = models.CharField(
        verbose_name= 'video'
    )
    
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    modified = models.DateTimeField(
    auto_now_add=True, verbose_name="Fecha de Actualización"
    )

    class Meta:
        verbose_name = "evento"
        verbose_name_plural = "eventos"
    
    def __str__(self):
        return self.name


class EventUser(models.Model):

    user = models.ForeignKey(
        User, 
        on_delete= models.CASCADE
    )
    event = models.ForeignKey(
        Event, 
        on_delete= models.CASCADE
    )
    created = models.DateTimeField(
        auto_now_add=True, 
        verbose_name="Fecha de creación"
    )
    modified = models.DateTimeField(
    auto_now_add=True, verbose_name="Fecha de Actualización"
    )
    
    class Meta:
        verbose_name = "evento-usuario"
        verbose_name_plural = "eventos-usuarios"
        
class Comment (models.Model):
    
    event = models.ForeignKey(
        Event, 
        on_delete=models.CASCADE,
        related_name='Event'
        )
    
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='Usuario'
        )
    
    text= models.TextField()
    created = models.DateTimeField(
        auto_now_add=True, 
        verbose_name="Fecha de creación"
        )
    
    class Meta:
        verbose_name = "comentario"
        verbose_name_plural = "comentarios"