from django.shortcuts import render
from django.views import View
from .models import Message
from .serializers import MessageSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
# Create your views here.


class IndexView(View):
    def get(self, request):
        return render(request, 'chat/index.html')


class RoomView(View):
    def get(self, request, room_name):
        context = {'room_name': room_name}
        return render(request, 'chat/room.html', context)


class MessageView(APIView):
    def get(self, request):
        queryset = Message.objects.all()
        serializer_class = MessageSerializer(queryset, many=True)
        return Response(serializer_class.data)
