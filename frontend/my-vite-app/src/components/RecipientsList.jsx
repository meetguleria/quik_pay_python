import { Box, Text, VStack } from '@chakra-ui/react';
import RecipientCard from './RecipientCard';

export const RecipientsList = ({ recipients }) => {
  console.log(recipients);

  return (
    <VStack 
      p={4} 
      borderRadius="md" 
      w="100%" 
      align="stretch"
      bg="rgba(74, 20, 140, 0.85)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.2)"
    >
      <Text fontSize="lg" mb={2} color="white">Recipients:</Text>
      {recipients.map((recipient) => (
        <RecipientCard key={recipient.id} recipient={recipient} />
      ))}
    </VStack>
  );
};