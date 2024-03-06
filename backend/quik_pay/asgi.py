import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quik_pay.settings')
# Import Django's ASGI application to initialize Django
django_asgi_app = get_asgi_application()

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from payments.routing import websocket_urlpatterns

application = ProtocolTypeRouter({
  # HTTP requests are handled by Django's ASGI application
  "http": django_asgi_app,
  "websocket": AllowedHostsOriginValidator(
    AuthMiddlewareStack(
      URLRouter(
        websocket_urlpatterns #WebSocket
      )
    )
  ),
})
