import { Box, Text, VStack, Flex } from '@chakra-ui/react';

export function WalletInfo({ transactions = [] }) {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      flex="1"
      borderRadius="md"
      bgGradient="linear(to-r, #4A00E0, #8E2DE2)"
      colors="white"
    >
      <Text fontSize="xl" mb={4}>Recent Transactions:</Text>
      <VStack spacing={3} align="stretch">
      {(transactions || []).map((transaction, index) => (
        <Flex 
          key={index} 
          p={3} 
          shadow="sm" 
          borderWidth="1px" 
          borderRadius="md" 
          bg="white" 
          color="black" 
          justify="space-between"
        >
          <Text>{new Date(transaction.date).toLocaleDateString()}</Text>
          <Text>{transaction.recipient}</Text>
          <Text>${transaction.amount}</Text>
        </Flex>
      ))}
      </VStack>
    </Box>
  );
}