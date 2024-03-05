import { useState, useEffect } from 'react';

import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { WalletCard } from './components/WalletCard';
import { WalletInfo } from './components/WalletInfo';

function App() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    console.log('Attempting to establish WebSocket connection...');
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/path');

    ws.onopen = () => console.log('WebSocket connection opened.');
    ws.onmessage = (event) => {
      console.log('Received message from server:', event.data);

      const data = JSON.parse(event.data);

      if (data.type === 'balanceUpdate') {
        console.log('Received balance update:', data.balance);
        setBalance(data.balance);
      } else if (data.type === 'transactionUpdate') {
        console.log('Received transaction update:', data.transactions);
        setTransactions(data.transactions);
      }
    };

    ws.onerror = (error) => console.error('WebSocket error:', error);
    ws.onclose = () => console.log('WebSocket connection closed.');

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
        </HStack>
      </VStack>
    </>
  );
}

export default App;
