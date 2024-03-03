from django.urls import path
from .views import TransactionsAndBalanceView, CreateTransactionView

urlpatterns = [
  path('transactions/', TransactionsAndBalanceView.as_view(), name='transactions_and_balance'),
  path('create-transaction/', CreateTransactionView.as_view(), name='create_transaction'),
]