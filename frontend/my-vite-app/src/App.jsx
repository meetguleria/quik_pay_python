import { useState, useEffect } from 'react';

import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { WalletCard } from './components/WalletCard';
import { WalletInfo } from './components/WalletInfo';
import { styled } from './stitches.config';

const AppContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  padding: '20px',
  gap: '20px',
  boxSizing: 'border-box',
});

const Header = styled('h1', {
  fontSize: '2rem',
  marginBottom: '2rem',
});

const CardsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  maxWidth: '1200px',
  gap: '20px',
});

function App() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/path');

    ws.onopen = () => console.log('WebSocket connection opened.');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'balanceUpdate') {
        setBalance(data.balance);
      } else if (data.type === 'transactionUpdate') {
        setTransactions(data.transactions);
      }
    };

    ws.onclose = () => console.log('WebSocket connection closed.');

    return () => ws.close();
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
