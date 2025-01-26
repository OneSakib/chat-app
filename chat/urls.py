from django.urls import path, re_path
from . import views
app_name = 'chat'

urlpatterns = [
    path('', views.IndexView.as_view(), name='chat'),
    path('api/messages', views.MessageView.as_view(), name='messages'),
    re_path(r'^chat/(?P<room_name>[a-zA-Z0-]+)',
            views.RoomView.as_view(), name='room')
]
