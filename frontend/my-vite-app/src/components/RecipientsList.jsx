import { Box, Text, VStack } from '@chakra-ui/react';

export const RecipientsList = ({ recipients }) => {
  return (
    <VStack bg="whiteAlpha.500" p={4} borderRadius="md" w="100%" align="stretch">
      <Text fontSize="lg" mb={2}>Recipients:</Text>
      {recipients.map((recipient, index) => (
        <Box key={index} p={2} bg="blue.100" borderRadius="md">
          {recipient}
        </Box>
      ))}
    </VStack>
  );
};