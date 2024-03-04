from channels.generic.websocket import AsyncWebsocketConsumer
import json

class YourConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    await self.accept()

  async def disconnect(self, close_code):
    pass

  async def receive(self, text_data=None, bytes_data=None):
    text_data_json = json.loads(text_data)
    message = text_data_json['message']

    # Send message back to WebSocket
    await self.send(text_data=json.dumps({
      'message': message
    }))