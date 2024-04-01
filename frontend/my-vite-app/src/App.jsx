import { useState, useEffect } from 'react';
import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { WalletCard } from './components/WalletCard';
import { WalletInfo } from './components/WalletInfo';
import { RecipientsList } from './components/RecipientsList';

function App() {
  const [balance, setBalance] = useState(0);
  const [recipients, setRecipients] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    console.log('Attempting to establish WebSocket connection...');
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/payments/');

    const handleOpen = () => {
      console.log('WebSocket connection opened.');
    };

    const handleMessage = (event) => {
      console.log('Received message from server:', event.data);
      const data = JSON.parse(event.data);

      switch(data.type) {
        case 'initial_data':
          setBalance(data.balance);
          setRecipients(data.recipients);
          setTransactions(data.transactions);
          break;
        case 'update':
          if (data.balance) setBalance(data.balance);
          if (data.recipients) setRecipients(data.recipients);
          if (data.transactions) setTransactions(data.transactions);
          break;
        default:
          console.log(`Unhandled message type: ${data.type}`);
      }
    }

    const handleError = (error) => {
      console.error('WebSocket error observed:', error);
      console.log(`WebSocket state: ${ws.readyState}`);
    };

    const handleClose = (event) => {
      console.log('WebSocket connection closed.', `Code: ${event.code}, Reason: ${event.reason}`);
      console.log(`WebSocket state: ${ws.readyState}`);
    };
  
    ws.onopen = handleOpen;
    ws.onmessage = handleMessage;
    ws.onerror = handleError;
    ws.onclose = handleClose;

    return () => {
      console.log('Closing WebSocket connection...');
      ws.close();
    };
}, []);

  return (
    <>
      <VStack spacing={8} align="stretch" minH="100vh" p={5} bg="gray.800">
        <Text fontSize="2xl" color="white" textAlign="center">Quik Pay</Text>
        <HStack spacing={5} justifyContent="center">
          <WalletCard balance={balance} />
          <WalletInfo transactions={transactions} />
          <RecipientsList recipients={recipients} />
        </HStack>
      </VStack>
    </>
  );
}

export default App;
