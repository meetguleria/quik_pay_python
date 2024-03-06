import asyncio
import websockets
import json

async def test():
  uri = "ws://127.0.0.1:8000/ws/path/"
  async with websockets.connect(uri) as websocket:
    
    await websocket.send(json.dumps({ "action": "test" }))

    #Wait for a response and print it
    response = await websocket.recv()
    print(f"Response: {response}")

asyncio.get_event_loop().run_until_complete(test())
