'use client'

import React from 'react';
import { Box, Text, VStack, HStack, Divider } from '@chakra-ui/react';
import { usePokerStore } from '../store/pokerStore';

export const PrizePool = () => {
  const { prizePool } = usePokerStore();

  const totalPrize = prizePool.reduce((sum, prize) => {
    if (typeof prize.amount === 'number') {
      return sum + prize.amount;
    }
    return sum;
  }, 0);

  return (
    <VStack 
      spacing={2} 
      align="stretch" 
      height="100%"
      position="relative"
    >
      <Box
        overflowY="auto"
        flex="1"
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
        pb={16}
      >
        {prizePool.map((prize, index) => (
          <HStack key={index} spacing={4} justify="space-between" mb={2}>
            <Text 
              fontSize={["xl", "2xl"]} 
              color="gray.400"
            >
              {index + 1}{getOrdinalSuffix(index + 1)}
            </Text>
            <HStack spacing={2}>
              <Text 
                fontSize={["xl", "2xl"]} 
                textAlign="right"
              >
                {typeof prize.amount === 'number' 
                  ? formatPrize(prize.amount, prize.type)
                  : prize.amount}
              </Text>
              {prize.type === 'TICKET' && (
                <Text fontSize="sm" color="gray.500">Ticket</Text>
              )}
            </HStack>
          </HStack>
        ))}
      </Box>

      <Divider my={2} />

      <Box mb={12}>
        <Text 
          fontSize="xl" 
          fontWeight="bold" 
          color="yellow.300"
          mb={1}
        >
          TOTAL PRIZE POOL
        </Text>
        <Text 
          fontSize="2xl" 
          fontWeight="bold"
        >
          ¥{totalPrize.toLocaleString()}
        </Text>
      </Box>
    </VStack>
  );
};

const getOrdinalSuffix = (i: number): string => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
};

const formatPrize = (amount: number, type: string) => {
  switch (type) {
    case 'USD':
      return `$${amount.toLocaleString()}`;
    case 'JPY':
      return `¥${amount.toLocaleString()}`;
    case 'COIN':
      return `${amount.toLocaleString()} COIN`;
    case 'ITEM':
      return amount.toString();
    default:
      return amount.toLocaleString();
  }
}; 