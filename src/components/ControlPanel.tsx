import React from 'react';
import {
  Box,
  Button,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { usePokerStore } from '../store/pokerStore';

export const ControlPanel = () => {
  const {
    isRunning,
    startTimer,
    pauseTimer,
    nextLevel,
    previousLevel,
    resetTimer,
  } = usePokerStore();

  return (
    <Box
      bg="blackAlpha.500"
      p={4}
      borderRadius="md"
      width="100%"
    >
      <HStack spacing={4} justify="center">
        <Button
          onClick={previousLevel}
          size="lg"
          colorScheme="whiteAlpha"
          variant="solid"
        >
          Previous
        </Button>

        <Button
          onClick={isRunning ? pauseTimer : startTimer}
          size="lg"
          colorScheme="whiteAlpha"
          variant="solid"
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>

        <Button
          onClick={nextLevel}
          size="lg"
          colorScheme="whiteAlpha"
          variant="solid"
        >
          Next
        </Button>

        <Button
          onClick={resetTimer}
          size="lg"
          colorScheme="whiteAlpha"
          variant="solid"
        >
          Reset
        </Button>
      </HStack>
    </Box>
  );
}; 