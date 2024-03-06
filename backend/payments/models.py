from django.db import models
from django.conf import settings

# Create your models here
class Wallet(models.Model):
  balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

  def __str__(self):
    return f"Wallet Balance: ${self.balance}"
class Transaction(models.Model):
  recipient = models.CharField(max_length=100, default='Shop')  # Provide a default value for recipient
  amount = models.DecimalField(max_digits=10, decimal_places=2)
  purpose = models.CharField(max_length=255, default='General')
  date = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.amount} to {self.recipient} for {self.purpose} on {self.date}"

class Recipient(models.Model):
  name = models.CharField(max_length=255)

  def __str__(self):
    return self.name