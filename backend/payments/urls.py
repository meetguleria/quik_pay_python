from django.urls import path
from .views import TransactionsAndBalanceView, CreateTransactionView, get_recipients

urlpatterns = [
  path('transactions/', TransactionsAndBalanceView.as_view(), name='transactions_and_balance'),
  path('create-transaction/', CreateTransactionView.as_view(), name='create_transaction'),
  path('recipients/', get_recipients, name='get_recipients'),
]