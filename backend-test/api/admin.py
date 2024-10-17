from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserActionLog, Event, EventUser, Comment
from .forms import UserCreationForm, UserChangeForm

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    add_form = UserCreationForm  # Usar el formulario de creación personalizado
    form = UserChangeForm        # Usar el formulario de cambio personalizado
    model = User

    list_display = (
        "id",
        "cedula",
        "email",
        "is_active",
        "is_staff",
        "is_superuser",
    )
    list_filter = (
        "is_active",
        "is_staff",
        "is_superuser",
        "groups",
    )
    ordering = ["email"]
    readonly_fields = ["date_joined"]
    search_fields = ("name", "email")

    add_fieldsets = (
        (
            "Información básica",
            {
                "fields": (
                    "name",
                    "last_name",
                    "email",  # Solo pedir el email
                ),
            },
        ),
        (
            "Permisos",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                ),
            },
        ),
    )

    fieldsets = (
        (
            "Información de acceso",
            {
                "fields": (
                    "cedula",
                ),
            },
        ),
        (
            "Información básica",
            {
                "fields": (
                    "name",
                    "last_name",
                    "email",
                ),
            },
        ),
        (
            "Permisos",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
    )

admin.site.register(Event)
# class CustomEventAdmin(UserAdmin):
#     model = Event

#     list_display = (
#         "id",
#         "name",
#         "pk",
#     )

admin.site.register(UserActionLog)
admin.site.register(EventUser)
admin.site.register(Comment)

