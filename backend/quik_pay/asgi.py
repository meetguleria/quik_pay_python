import os
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
import payments.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quik_pay.settings')

application = ProtocolTypeRouter({
  # HTTP requests are handled by Django's ASGI application
  "http": get_asgi_application(),
  "websocket": AllowedHostsOriginsValidator(
    AuthMiddlewareStack(
      URLRouter(
        payments.routing.websocket_urlpatterns #WebSocket
      )
    )
  ),
})
