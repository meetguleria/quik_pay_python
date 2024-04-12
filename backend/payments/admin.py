from django.contrib import admin
from .models import Recipient, Transaction, Wallet

class RecipientAdmin(admin.ModelAdmin):
  list_display = ('name', 'category')
  list_filter = ('category',)
  search_fields = ('name', 'category')

admin.site.register(Recipient, RecipientAdmin)
admin.site.register(Transaction)
admin.site.register(Wallet)