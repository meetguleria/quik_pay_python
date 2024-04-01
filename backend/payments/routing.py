from django.urls import path
from .consumers import TransactionConsumer

websocket_urlpatterns = [
  path('ws/payments/', TransactionConsumer.as_asgi()),
]