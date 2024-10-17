from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, UserActionLog, EventUser, Comment, Event

class UserLoginSerializer(serializers.Serializer):
    cedula = serializers.CharField()

    def validate(self, attrs):
        cedula = attrs.get("cedula")
        
        if cedula:
            try:
                user = User.objects.get(cedula=cedula)
            except User.DoesNotExist:
                msg = "La cédula no se encuentra registrado."
                raise serializers.ValidationError(msg, code="authorization")
            if user.is_active:
                user = authenticate(request=self.context.get("request"), username=cedula, password=cedula)
                if not user:
                    msg = "Las credenciales proporcionadas son incorrectas."
                    raise serializers.ValidationError(msg, code='authorization')
            else:
                msg = "La cuenta de usuario no está activa."
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = "Por favor, proporciona un email."
            raise serializers.ValidationError(msg, code='authorization')

        attrs["user"] = user
        return attrs

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["cedula"]

    def create(self, validated_data):
        user = User(
            cedula=validated_data["cedula"],
        )
        user.set_password(validated_data["cedula"])
        user.save()
        return user


class UserActionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActionLog
        fields = ['action']
        extra_kwargs = {
            'user': {'required': False}
        }

    def create(self, validated_data):
        user = validated_data.pop('user', None)
        user_action_log = UserActionLog.objects.create(user=user, **validated_data)
        return user_action_log
    


class EventUserRegisterSerializer(serializers.ModelSerializer):
    print("$$$$$$$$$")
    class Meta:
        model = EventUser
        fields = ["user","event"]

class CommentRegisterSerializer(serializers.ModelSerializer):
    print("#########")
    class Meta:
        model = Comment
        fields = ["user","event","text", "created"]

class EventSerializer(serializers.ModelSerializer):
    print("$$$$$$$$$")
    class Meta:
        model = Event
        fields = "__all__"