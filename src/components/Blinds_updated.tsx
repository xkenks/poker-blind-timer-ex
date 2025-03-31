import React from 'react';
import { usePokerStore } from '../store/pokerStore';
import { VStack, Text, Box } from '@chakra-ui/react';

export const Blinds = () => {
  const currentLevel = usePokerStore(state => state.currentLevel);
  const blindLevels = usePokerStore(state => state.blindLevels);
  const isBreak = usePokerStore(state => state.isBreak); // BREAK 状態を取得
  const currentLevelData = blindLevels[currentLevel];
  const nextLevelData = blindLevels[currentLevel + 1];

  // デバッグ用のログ
  console.log('Current Level:', currentLevel);
  console.log('Current Level Data:', currentLevelData);
  console.log('Is Break:', isBreak);
  console.log('Blind Levels:', blindLevels);

  if (!currentLevelData) return null;

  return (
    <VStack spacing={0} align="center">
      <Box>
        <Text fontSize="sm" color="gray.400">
          {isBreak ? 'Break Time' : 'Blinds'}
        </Text>
      </Box>
      
      <Box mb={2}>
        {isBreak ? (
          <Text fontSize="4xl" fontWeight="bold" color="red.500" height="48px" display="flex" alignItems="center">
            On Break
          </Text>
        ) : (
          <Text fontSize="4xl" fontWeight="bold" height="48px" display="flex" alignItems="center">
            {currentLevelData.smallBlind} / {currentLevelData.bigBlind}
            {currentLevelData.ante > 0 && (
              <Text as="span" fontSize="2xl" ml={2}>
                ({currentLevelData.ante})
              </Text>
            )}
          </Text>
        )}
      </Box>

      {!isBreak && (
        <Box>
          <Text fontSize="lg" color="gray.400">
            Next Level
          </Text>
        </Box>
      )}
      
      {!isBreak && nextLevelData && (
        <Box mb={16}>
          <Text fontSize="2xl" fontWeight="bold" height="44px" display="flex" alignItems="center">
            {nextLevelData.isBreak ? (
              'On Break'
            ) : (
              <>
                {nextLevelData.smallBlind} / {nextLevelData.bigBlind}
                {nextLevelData.ante > 0 && (
                  <Text as="span" fontSize="xl" ml={2}>
                    ({nextLevelData.ante})
                  </Text>
                )}
              </>
            )}
          </Text>
        </Box>
      )}
    </VStack>
  );
};