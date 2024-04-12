from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.generic import View
from .models import Wallet, Transaction
from .models import Transaction
from .models import Recipient
import json
from decimal import Decimal

def get_recipients(request):
  recipients = Recipient.objects.all()
  recipients_data = [
    {"name": recipient.name, "category": recipient.category}
    for recipient in recipients
  ]
  return JsonResponse({"recipients": recipients_data})
class TransactionsAndBalanceView(View):
  def get(self, request, *args, **kwargs):
    wallet, _ = Wallet.objects.get_or_create(defaults={"balance": Decimal("50000")})
    transactions = Transaction.objects.select_related('recipient').all().order_by('-date')

    transactions_data = [
      {
        "recipient": transaction.recipient.name,
        "category": transaction.recipient.category,
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
      amount = Decimal(data['amount'])
      purpose = data['purpose']

      wallet = Wallet.objects.first()
      if not wallet or amount <= 0 or wallet.balance < amount:
        return HttpResponseBadRequest("Invalid transaction amount or insufficient balance.")

      # Create and save the new transaction
      Transaction.objects.create(recipient=recipient, amount=amount, purpose=purpose)
      wallet.balance -= amount
      wallet.save()
      
      #Return the new balance and transaction
      return JsonResponse({"message": "Transaction successful"})
    except Exception as e:
      return HttpResponseBadRequent(f"Error processing transaction: {str(e)}")