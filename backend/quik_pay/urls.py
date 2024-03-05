from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home_view(request):
  return HttpResponse("Welcome to QuikPay!")

urlpatterns = [
  path('', home_view, name='home'),
  path('admin/', admin.site.urls),
  path('api/', include('payments.urls')),
]
