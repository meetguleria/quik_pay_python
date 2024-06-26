import { Box, Text, Icon } from '@chakra-ui/react';
import { FaWallet } from 'react-icons/fa';

export function WalletCard({ balance }) {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      flex="1"
      borderRadius="md"
      bgGradient="linear(to-r, #EC407A, #AB47BC)"
      color="white"
    >
      <Icon as={FaWallet} w={6} h={6} mb={4} />
      <Text mt={4}>Your Quik Pay Wallet</Text>
      <Text fontSize="xl">Balance: ${balance}</Text>
    </Box>
  );
}