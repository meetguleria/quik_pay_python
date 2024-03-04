from django.urls import path
from . import consumers

from payments import consumers

websocket_urlpatterns = [
  path('ws/path/', consumers.YourConsumer.as_asgi()),
]