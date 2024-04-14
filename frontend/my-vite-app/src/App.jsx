import { useState, useEffect } from 'react';
import { Grid, Text, VStack, Box } from '@chakra-ui/react';
import { WalletCard } from './components/WalletCard';
import { WalletInfo } from './components/WalletInfo';
import { RecipientsList } from './components/RecipientsList';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [balance, setBalance] = useState(0);
  const [recipients, setRecipients] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/payments/');

    const handleOpen = () => {
      console.log('WebSocket connection opened.');
    };

    const handleMessage = (event) => {
      console.log('Received message from server:', event.data);
      const data = JSON.parse(event.data);
      console.log(`Handling message type: ${data.type}`, data);

      switch(data.type) {
        case 'initial_data':
        case 'update':
          if (data.balance !== undefined) setBalance(parseFloat(data.balance));
          if (data.recipients !== undefined) setRecipients(data.recipients);
          if (data.transactions !== undefined) setTransactions(data.transactions);
          break;
        default:
          console.log(`Unhandled message type: ${data.type}`);
        }
    };

    const handleError = (error) => {
      console.error('WebSocket error observed:', error);
    };

    const handleClose = (event) => {
      console.log('WebSocket connection closed.', `Code: ${event.code}, Reason: ${event.reason}`);
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
    <AnimatedBackground />
      <VStack spacing={8} align="stretch" minH="100vh" p={5} bg="transparent">
        <Text fontSize="2xl" color="white" textAlign="center">Quik Pay</Text>
        <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
          <WalletCard balance={balance} />
          <WalletInfo transactions={transactions} />
        <Box gridRow="2" gridColumn="1 / -1"> {/* Spans full width in a new row */}
          <RecipientsList recipients={recipients} />
        </Box>
      </Grid>
      </VStack>
    </>
  );
}

export default App;
