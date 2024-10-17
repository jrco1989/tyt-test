import logging

from .models import Event, EventUser,Comment

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserLoginSerializer, UserRegisterSerializer, UserActionLogSerializer,EventUserRegisterSerializer, CommentRegisterSerializer
from .serializers import EventSerializer

logger = logging.getLogger('user_actions')

class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        cedula = request.data.get("cedula")
        data = {
            "cedula": cedula,
        }
        
        serializer = UserLoginSerializer(data=data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)

        logger.info(f"Login", extra={'user': user})

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "id_user": str(user.id),
        }, status=status.HTTP_200_OK)

class UserRegisterAPIView(APIView):
    print("post")
    permission_classes = [AllowAny]
    def post(self, request):
        print("#######################")
        print(request.data)
        print("#######################")
        cedula = request.data.get("cedula")
        data = {
            "cedula": cedula,
        }

        serializer = UserRegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            logger.info(f"Registro del usuario {cedula}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserActionLogCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserActionLogSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            user = request.user if request.user.is_authenticated else None
            action = serializer.validated_data.get('action', 'Acción sin especificar')
            
            logger.info(action, extra={'user': user})

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EventUserAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        print("get events")
        print(request.query_params)
        print(request.data)
        id= request.query_params.get("user", )
        print("requestyyyy",id)

        serializer =  EventUserRegisterSerializer(EventUser.objects.filter(user=id), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        print(request.data)
        print("requestyyyy")

        serializer = EventUserRegisterSerializer(data=request.data, context={'request': request})
        print("3")

        if serializer.is_valid():
            user = request.user if request.user.is_authenticated else None
            action = serializer.validated_data.get('action', 'Acción sin especificar')
            
            logger.info(action, extra={'user': user})
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CommentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        
        id= request.query_params.get("event", )
        print("requestyyyy",id)

        serializer =  CommentRegisterSerializer(Comment.objects.filter(event=id), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        print("get events")
        print(request.query_params)
        print(request.data)
        
        serializer = CommentRegisterSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = request.user if request.user.is_authenticated else None
            action = serializer.validated_data.get('action', 'Acción sin especificar')
            
            logger.info(action, extra={'user': user})
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class EventAPIView(APIView):
# class EventAPIView(viewsets.ModelViewSet):

    print("////////")
    queryset = Event.objects.all()
    
    def get(self, request, format=None):
        print("////////")
        serializer =  EventSerializer(Event.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class EventApiViewDetail(APIView):
    
    def get_object(self, pk):
        print("get_object", self, pk)
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return None
        
    def get(self, request):
        id= request.data.get("id")
        event = self.get_object(id)
        serializer = EventSerializer(event)  
        return Response(status=status.HTTP_200_OK, data=serializer.data)
