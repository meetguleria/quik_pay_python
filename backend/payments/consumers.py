from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .models import Wallet, Recipient, Transaction
from channels.db import database_sync_to_async
from django.db.models import F
from decimal import Decimal

class YourConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    await self.accept()
    await self.send_initial_data()
    # Join a group to receive updates
    await self.channel_layer.group_add("wallet_group", self.channel_name)

  async def disconnect(self, close_code):
    # Leave the group on disconnect
    await self.channel_layer.group_discard("wallet_group", self.channel_name)

  async def receive(self, text_data=None, bytes_data=None):
    text_data_json = json.loads(text_data)
    action = text_data_json.get('action')

    if action == 'send_payment':
      recipient_name = text_data_json['recipient']
      amount = text_data_json['amount']
      purpose = text_data_json.get('purpose', 'General')

      await self.process_payment(recipient_name, amount, purpose)
      await self.broadcast_update()

  async def send_initial_data(self):
    balance = await self.get_wallet_balance()
    recipients = await self.get_recipients_list()
    await self.send(text_data=json.dumps({
      'type': 'initial_data',
      'balance': balance,
      'recipients': recipients
    }))

  @database_sync_to_async
  def get_wallet_balance(self):
    wallet = Wallet.objects.first()
    return str(wallet.balance) if wallet else '0.00'

  @database_sync_to_async
  def get_recipients_list(self):
    return list(Recipient.objects.value_list('name', flat=True))

  @database_sync_to_async
  def process_payment(self, recipient_name, amount, purpose):
    wallet = Wallet.objects.first()
    wallet.balance = F('balance') - amount
    wallet.save()

    recipient, _ = Recipient.objects.get_or_create(name=recipient_name)
    Transaction.objects.create(
      recipient=recipient,
      amount=amount,
      purpose=purpose
    )

    async def broadcast_update(self):
      balance = await self.get_wallet_balance()
      recipients = await self.get_recipients_list()
      transactions = await self.get_recent_transactions()

      await self.channel_layer.group_send(
        "wallet_updates",
        {
          "type": "update",
          "balance": balance,
          "recipients": recipients,
          "transactions": transactions,
        }
      )

    async def send_update(self, event):
      # Method to handle sending the message to the WebSocket
      await self.send(text_data=json.dumps(event))

    @database_sync_to_async
    def get_recent_transactions(self):
      # Fetch and return the recent transactions
      transactions = list(Transaction.objects.order_by('-date').values('date', 'recipient', 'amount', 'purpose')[:5])
      return transactions