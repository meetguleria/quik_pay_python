from django.db import models
from django.conf import settings
# Create your models here.

class Transaction(models.Model):
  recipient = models.CharField(max_length=100)
  amount = models.DecimalField(max_digits=10, decimal_places=2)
  purpose = models.CharField(max_length=255)
  date = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.amount} to {self.recipient} for {self.purpose} on {self.date}"
