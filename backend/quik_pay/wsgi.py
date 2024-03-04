"""
WSGI config for quik_pay project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import payments.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quik_pay.settings')
application = ProtocolTypeRouter({
  "http": get_asgi_application(), #Django's ASGI application for traditional HTTP requests
  "websocket": AuthMiddlewareStack(
    URLRouter(
      payments.routing.websocket_urlpatterns
    )
  )
})
