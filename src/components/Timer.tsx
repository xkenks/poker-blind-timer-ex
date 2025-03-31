'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, Button, Text, VStack, HStack, Icon, Divider, Progress, IconButton, Center, Tooltip } from '@chakra-ui/react';
import { usePokerStore } from '../store/pokerStore';
import { formatTime } from '../utils/timeUtils';
import { playWarningSound, playBlindChangeSound, initAudio } from '../utils/soundUtils';
import { 
  BsFillSkipBackwardFill, 
  BsFillPlayFill, 
  BsFillPauseFill, 
  BsFillSkipForwardFill, 
  BsArrowCounterclockwise 
} from 'react-icons/bs';
import { FaPlay, FaPause, FaRedo, FaStepForward } from 'react-icons/fa';

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
    displaySettings,
    getCurrentLevel,
    isBreak
  } = usePokerStore();
  
  const currentBlindLevel = blindLevels[currentLevel] || { smallBlind: 0, bigBlind: 0, ante: 0 };
  const nextBlindLevel = blindLevels[currentLevel + 1];

  const [audioInitialized, setAudioInitialized] = useState(false);
  const hadUserInteraction = useRef(false);

  useEffect(() => {
    console.log("Timer component rendered", { currentLevel, isRunning, currentTime });
  }, [currentLevel, isRunning, currentTime]);

  const initializeAudio = useCallback(() => {
    if (!audioInitialized && hadUserInteraction.current) {
      console.log("ユーザーインタラクションによりオーディオを初期化します (Timer)");
      const success = initAudio();
      setAudioInitialized(success);
      return success;
    }
    return audioInitialized;
  }, [audioInitialized]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        const newTime = decrementTimer();
        
        if (newTime === 0 && displaySettings.soundEnabled) {
          initializeAudio();
          playWarningSound();
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, decrementTimer, displaySettings.soundEnabled, initializeAudio]);

  useEffect(() => {
    if (currentLevel > 1 && displaySettings.soundEnabled) {
      initializeAudio();
    }
  }, [currentLevel, displaySettings.soundEnabled, initializeAudio]);

  const handlePreviousLevel = () => {
    console.log("Previous level button clicked");
    try {
      previousLevel();
    } catch (error) {
      console.error("Error in previousLevel:", error);
    }
  };

  const handleNextLevel = () => {
    console.log("Next level button clicked");
    try {
      nextLevel();
    } catch (error) {
      console.error("Error in nextLevel:", error);
    }
  };

  const handleStart = () => {
    console.log("Start button clicked");
    hadUserInteraction.current = true;
    initializeAudio();
    try {
      startTimer();
    } catch (error) {
      console.error("Error in startTimer:", error);
    }
  };

  const handlePause = () => {
    console.log("Pause button clicked");
    hadUserInteraction.current = true;
    try {
      pauseTimer();
    } catch (error) {
      console.error("Error in pauseTimer:", error);
    }
  };

  const handleReset = () => {
    console.log("Reset button clicked");
    hadUserInteraction.current = true;
    try {
      resetTimer();
    } catch (error) {
      console.error("Error in resetTimer:", error);
    }
  };

  const displayBlinds = isBreak ? 'BREAK TIME' : `${currentBlindLevel.smallBlind} / ${currentBlindLevel.bigBlind}`;
  const nextBlinds = nextBlindLevel ? (nextBlindLevel.isBreak ? 'BREAK TIME' : `${nextBlindLevel.smallBlind} / ${nextBlindLevel.bigBlind}`) : 'END';
  
  const nextLevelOrBreak = currentLevel < blindLevels.length - 1 ? nextBlinds : 'END OF SESSION';

  return (
    <Box position="relative" width="100%" height="100%">
      <VStack 
        spacing={0} 
        width="100%" 
        align="stretch" 
        pt={0} 
        maxH="100vh" 
        overflow="hidden"
        justify="center"
        height="100%"
        maxW="1200px"
        mx="auto"
        px={[2, 3, 4]}
      >
        <Text 
          fontSize={["2xl", "2xl", "3xl", "4xl", "5xl", "6xl"]} 
          textAlign="center" 
          fontWeight="bold"
          lineHeight="1"
          mb={[3, 3, 4]}
          mt={[3, 3, 4]}
          color="yellow.300"
        >
          {currentBlindLevel.isBreak ? "Break" : `Level ${currentLevel + 1}`}
        </Text>
        
        <Box 
          height={["100px", "120px", "160px", "180px", "200px", "260px"]} 
          width="100%" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          mb={[1, 1, 2]}
          mt={0}
        >
          <Text 
            fontSize={["100px", "120px", "160px", "180px", "200px", "260px"]}
            textAlign="center" 
            fontWeight="bold"
            fontFamily="monospace, monospace"
            lineHeight={1}
            width="100%"
            minWidth={["100%", "350px", "400px", "450px", "500px", "600px"]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale"
            }}
          >
            {formatTime(currentTime)}
          </Text>
        </Box>

        <Box position="relative" width="100%" mx={0} mt={0} mb={0} px={0}>
          <Box position="absolute" left={0} right={0} height="2px" bg="whiteAlpha.700" />
        </Box>

        <Box 
          width="100%" 
          pt={2}
          mb={2}
        >
          <Text fontSize={["xl", "xl", "xl", "2xl", "3xl", "4xl"]} mb={1} lineHeight="1.1" color="yellow.300" fontWeight="bold">
            {currentBlindLevel.isBreak ? "" : "Blinds"}
          </Text>
          <Text 
            fontSize={["4xl", "4xl", "5xl", "6xl", "7xl", "8xl"]} 
            textAlign="center" 
            fontWeight="bold" 
            fontFamily="system-ui, sans-serif"
            lineHeight="1.1"
            color={currentBlindLevel.isBreak ? "red.500" : "inherit"}
            py={1}
          >
            {displayBlinds}
          </Text>
        </Box>

        {!currentBlindLevel.isBreak && currentBlindLevel.ante > 0 && (
          <>
            <Box position="relative" width="100%" mx={0} mt={0} mb={0} px={0}>
              <Box position="absolute" left={0} right={0} height="2px" bg="whiteAlpha.700" />
            </Box>
            <Box
              width="100%"
              pt={2}
              mb={2}
            >
              <Text fontSize={["xl", "xl", "xl", "2xl", "3xl", "4xl"]} mb={1} lineHeight="1.1" color="yellow.300" fontWeight="bold">Ante</Text>
              <Text 
                fontSize={["4xl", "4xl", "5xl", "6xl", "7xl", "8xl"]} 
                textAlign="center" 
                fontWeight="bold" 
                fontFamily="system-ui, sans-serif"
                lineHeight="1.1"
                py={1}
              >
                {currentBlindLevel.ante}
              </Text>
            </Box>
          </>
        )}

        <Box position="relative" width="100%" mx={0} mt={0} mb={0} px={0}>
          <Box position="absolute" left={0} right={0} height="2px" bg="whiteAlpha.700" />
        </Box>

        <Box
          width="100%"
          pt={2}
          mb={2}
        >
          <Text fontSize={["xl", "xl", "xl", "2xl", "3xl", "4xl"]} mb={1} lineHeight="1.1" color="yellow.300" fontWeight="bold">Next Level</Text>
          <Text 
            fontSize={["3xl", "3xl", "4xl", "5xl", "6xl", "7xl"]} 
            textAlign="center" 
            fontWeight="bold" 
            fontFamily="system-ui, sans-serif"
            lineHeight="1.1"
            py={1}
          >
            {nextLevelOrBreak}
          </Text>
        </Box>

        <HStack spacing={[2, 2, 3, 4, 5, 6]} justify="center" mt={4} mb={4}>
          <Button
            size={["md", "md", "lg", "lg", "lg", "lg"]}
            onClick={handlePreviousLevel}
            isDisabled={currentLevel === 0}
            colorScheme="white"
            variant="ghost"
            _hover={{ bg: 'whiteAlpha.200' }}
            w={["44px", "44px", "44px", "45px", "60px", "80px"]}
            h={["44px", "44px", "44px", "45px", "60px", "80px"]}
            borderRadius="full"
            p={0}
          >
            <Icon as={BsFillSkipBackwardFill} boxSize={[4, 4, 5, 5, 7, 9]} />
          </Button>
          <Button
            size={["md", "md", "lg", "lg", "lg", "lg"]}
            onClick={isRunning ? handlePause : handleStart}
            colorScheme={isRunning ? "red" : "green"}
            variant="solid"
            w={["60px", "60px", "50px", "55px", "70px", "90px"]}
            h={["60px", "60px", "50px", "55px", "70px", "90px"]}
            borderRadius="full"
            p={0}
          >
            <Icon 
              as={isRunning ? BsFillPauseFill : BsFillPlayFill} 
              boxSize={[6, 6, 6, 6, 8, 10]}
            />
          </Button>
          <Button
            size={["md", "md", "lg", "lg", "lg", "lg"]}
            onClick={handleNextLevel}
            isDisabled={currentLevel === blindLevels.length - 1}
            colorScheme="white"
            variant="ghost"
            _hover={{ bg: 'whiteAlpha.200' }}
            w={["44px", "44px", "44px", "45px", "60px", "80px"]}
            h={["44px", "44px", "44px", "45px", "60px", "80px"]}
            borderRadius="full"
            p={0}
          >
            <Icon as={BsFillSkipForwardFill} boxSize={[4, 4, 5, 5, 7, 9]} />
          </Button>
          <Button
            size={["md", "md", "lg", "lg", "lg", "lg"]}
            onClick={handleReset}
            colorScheme="white"
            variant="ghost"
            _hover={{ bg: 'whiteAlpha.200' }}
            w={["44px", "44px", "44px", "45px", "60px", "80px"]}
            h={["44px", "44px", "44px", "45px", "60px", "80px"]}
            borderRadius="full"
            p={0}
          >
            <Icon as={BsArrowCounterclockwise} boxSize={[4, 4, 5, 5, 7, 9]} />
          </Button>
        </HStack>
        <Box height={["10px", "10px", "20px", "30px", "40px", "50px"]} />
      </VStack>
    </Box>
  );
}; 