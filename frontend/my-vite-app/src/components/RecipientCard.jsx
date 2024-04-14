import { Box, Text, Icon } from '@chakra-ui/react';
import { FaSeedling, FaMobileAlt, FaHome, FaWrench, FaPlay, 
  FaPiggyBank, FaLaughBeam, FaLaptop, FaTshirt, FaCapsules, FaQuestion } from 'react-icons/fa';

const getCategoryIcon = (category) => {
  const categoryIcons = {
    "Grocery": FaSeedling,
    "Electronics": FaMobileAlt,
    "Real Estate": FaHome,
    "Utilities": FaWrench,
    "Banking": FaPiggyBank,
    "Entertainment": FaLaughBeam,
    "Technology": FaLaptop,
    "Retail": FaTshirt,
    "Healthcare": FaCapsules,
  };

  return categoryIcons[category] || FaQuestion
};


const RecipientCard = ({ recipient }) => {
  const IconComponent = getCategoryIcon(recipient.category);

  console.log("Rendering RecipientCard with:", recipient);

  return (
    <Box
      display="flex"
      alignItems="center"
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      bgGradient="linear(to-r, #EC407A, #AB47BC)"
      color="white"
    >
      <Icon as={IconComponent} marginRight={3} w={6} h={6} />
      <Text fontWeight="bold">{recipient.name}</Text>
      <Text ml={2}>{recipient.category}</Text>
    </Box>
  );
};

export default RecipientCard;