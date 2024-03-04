"""
ASGI config for quik_pay project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import payments.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quik_pay.settings')

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
  # HTTP requests are handled by Django's ASGI application
  "http": django_asgi_app,
  "websocket": AuthMiddlewareStack(
    URLRouter(
      payments.routing.websocket_urlpatterns #WebSocket
    )
  )
})
