import { Box, Text, VStack } from '@chakra-ui/react';

export const RecipientsList = ({ recipients }) => {
  return (
<VStack bgGradient="linear(to-r, #FF416C, #FF4B2B)" p={4} borderRadius="md" w="100%" align="stretch">
      <Text fontSize="lg" mb={2}>Recipients:</Text>
      {recipients.map((recipient, index) => (
        <Box 
        p={5}
        shadow="md"
        borderWidth="1px"
        flex="1"
        borderRadius="md"
        bgGradient="linear(to-r, #EC407A, #AB47BC)"
        color="white"
        >
          {recipient}
        </Box>
      ))}
      </VStack>
  );
};