from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.generic import View
from .models import Wallet, Transaction
from .models import Transaction
import json
from decimal import Decimal

class TransactionsAndBalanceView(View):
  def get(self, request, *args, **kwargs):
    wallet, _ = Wallet.objects.get_or_create(defaults={"balance": Decimal("50000")})
    transactions = Transaction.objects.all().order_by('-date')
    # spent_amount = sum(transaction.amount for transaction in transactions)
    # current_balance = initial_balance - spent_amount

    transactions_data = [
      {
        "recipient": transaction.recipient,
        "amount": float(transaction.amount),
        "purpose": transaction.purpose,
        "date": transaction.date.strftime('%Y-%m-%d')
      } for transaction in transactions
    ]

    data = {
      "balance": float(wallet.balance),
      "transactions": transactions_data,
    }
    return JsonResponse(data)

@method_decorator(csrf_exempt, name='dispatch')
class CreateTransactionView(View):
  def post(self, request, *args, **kwargs):
    try:
      data = json.loads(request.body)
      recipient = data['recipient']
      amount = data['amount']
      purpose = data['purpose']

      # Validate the transaction amount
      if amount  <= 0 or amount > 50000:
        return HttpResponseBadRequest("Invalid transaction amount.")

      # Create and save the new transaction
      transaction = Transaction(recipient=recipient, amount=amount, purpose=purpose)
      transaction.save()

      #Return the new balance and transaction
      return JsonResponse({"message": "Transaction successful"})
    except Exception as e:
      return HttpResponseBadRequent(f"Error processing transaction: {str(e)}")