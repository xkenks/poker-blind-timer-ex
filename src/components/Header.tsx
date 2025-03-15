import { Box, Heading, Text, HStack, VStack } from '@chakra-ui/react';
import { usePokerStore } from '../store/pokerStore';

export const Header = () => {
  const tournamentName = usePokerStore(state => state.tournamentName);

  return (
    <Box
      as="header"
      bg="gray.800"
      color="white"
      py={6}
      px={8}
      shadow="lg"
      width="100%"
    >
      <VStack spacing={2} align="center">
        <Heading size="lg" mb={2}>
          Poker Tournament Timer
        </Heading>
        {tournamentName && (
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="yellow.300"
            textAlign="center"
          >
            {tournamentName}
          </Text>
        )}
      </VStack>
    </Box>
  );
}; 