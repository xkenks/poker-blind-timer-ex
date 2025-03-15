'use client'

import React, { useEffect } from 'react';
import { Box, Button, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { usePokerStore } from '../store/pokerStore';
import { formatTime } from '../utils/timeUtils';
import { 
  BsFillSkipBackwardFill, 
  BsFillPlayFill, 
  BsFillPauseFill, 
  BsFillSkipForwardFill, 
  BsArrowCounterclockwise 
} from 'react-icons/bs';

export const Timer = () => {
  const {
    currentTime,
    isRunning,
    currentLevel,
    blindLevels,
    startTimer,
    pauseTimer,
    resetTimer,
    nextLevel,
    previousLevel,
    decrementTimer,
  } = usePokerStore();

  const currentBlindLevel = blindLevels[currentLevel] || { smallBlind: 0, bigBlind: 0, ante: 0 };
  const nextBlindLevel = blindLevels[currentLevel + 1];

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        decrementTimer();
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, decrementTimer]);

  return (
    <VStack spacing={2} width="100%" align="stretch">
      <Text 
        fontSize={["4xl", "5xl", "6xl"]} 
        textAlign="center" 
        fontWeight="bold"
        lineHeight="1"
        mb={0}
      >
        {currentBlindLevel.isBreak ? "Break" : `Level ${currentLevel + 1}`}
      </Text>

      <Text 
        fontSize={["100px", "140px", "180px"]}
        textAlign="center" 
        fontWeight="bold"
        fontFamily="mono"
        lineHeight="1"
        mb={0}
      >
        {formatTime(currentTime)}
      </Text>

      <Box 
        width="100%" 
        pt={2}
      >
        <Text fontSize="xl" mb={0}>
          {currentBlindLevel.isBreak ? "" : "Blinds"}
        </Text>
        <Text 
          fontSize={["4xl", "5xl", "6xl"]} 
          textAlign="center" 
          fontWeight="bold" 
          fontFamily="mono"
          lineHeight="1"
          color={currentBlindLevel.isBreak ? "red.500" : "inherit"}
        >
          {currentBlindLevel.isBreak 
            ? "Break Time" 
            : `${currentBlindLevel.smallBlind} / ${currentBlindLevel.bigBlind}`}
        </Text>
      </Box>

      {!currentBlindLevel.isBreak && currentBlindLevel.ante > 0 && (
        <Box
          width="100%"
          pt={2}
        >
          <Text fontSize="xl" mb={0}>Ante</Text>
          <Text 
            fontSize={["4xl", "5xl", "6xl"]} 
            textAlign="center" 
            fontWeight="bold" 
            fontFamily="mono"
            lineHeight="1"
          >
            {currentBlindLevel.ante}
          </Text>
        </Box>
      )}

      <Box
        width="100%"
        pt={2}
      >
        <Text fontSize="xl" mb={0}>Next Level</Text>
        <Text 
          fontSize={["2xl", "3xl", "4xl"]} 
          textAlign="center" 
          fontWeight="bold" 
          fontFamily="mono"
          lineHeight="1"
        >
          {nextBlindLevel 
            ? (nextBlindLevel.isBreak 
                ? "Break"
                : `${nextBlindLevel.smallBlind} / ${nextBlindLevel.bigBlind}${nextBlindLevel.ante ? ` (${nextBlindLevel.ante})` : ''}`)
            : 'Tournament End'
          }
        </Text>
      </Box>

      <HStack spacing={6} justify="center" mt={2}>
        <Button
          size={["md", "lg"]}
          onClick={previousLevel}
          isDisabled={currentLevel === 0}
          colorScheme="white"
          variant="ghost"
          _hover={{ bg: 'whiteAlpha.200' }}
          w={["40px", "50px"]}
          h={["40px", "50px"]}
          borderRadius="full"
        >
          <Icon as={BsFillSkipBackwardFill} boxSize={[5, 6]} />
        </Button>
        <Button
          size={["md", "lg"]}
          onClick={isRunning ? pauseTimer : startTimer}
          colorScheme={isRunning ? "red" : "green"}
          variant="solid"
          w={["50px", "60px"]}
          h={["50px", "60px"]}
          borderRadius="full"
        >
          <Icon 
            as={isRunning ? BsFillPauseFill : BsFillPlayFill} 
            boxSize={[6, 7]}
          />
        </Button>
        <Button
          size={["md", "lg"]}
          onClick={nextLevel}
          isDisabled={currentLevel === blindLevels.length - 1}
          colorScheme="white"
          variant="ghost"
          _hover={{ bg: 'whiteAlpha.200' }}
          w={["40px", "50px"]}
          h={["40px", "50px"]}
          borderRadius="full"
        >
          <Icon as={BsFillSkipForwardFill} boxSize={[5, 6]} />
        </Button>
        <Button
          size={["md", "lg"]}
          onClick={resetTimer}
          colorScheme="white"
          variant="ghost"
          _hover={{ bg: 'whiteAlpha.200' }}
          w={["40px", "50px"]}
          h={["40px", "50px"]}
          borderRadius="full"
        >
          <Icon as={BsArrowCounterclockwise} boxSize={[5, 6]} />
        </Button>
      </HStack>
    </VStack>
  );
}; 