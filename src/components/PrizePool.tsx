'use client'

import React from 'react';
import { Box, Text, VStack, HStack, Divider } from '@chakra-ui/react';
import { usePokerStore } from '../store/pokerStore';

const PRIZE_TYPES = {
  JPY: { label: '¥', prefix: '¥' },
  USD: { label: '$', prefix: '$' },
  COIN: { label: 'COIN', prefix: '' },
  TICKET: { label: 'TICKET', prefix: '' },
  ITEM: { label: 'Item', prefix: '' },
} as const;

type PrizeType = keyof typeof PRIZE_TYPES;

const prizeTypeOptions = [
  { value: 'USD', label: '$' },
  { value: 'JPY', label: '¥' },
  { value: 'COIN', label: 'COIN' },
  { value: 'TICKET', label: 'TICKET' },
  { value: 'ITEM', label: 'ITEM' },
] as const;

export const PrizePool = () => {
  const { prizePool } = usePokerStore();

  const totalPrize = prizePool.reduce((sum, prize) => {
    if (typeof prize.amount === 'number') {
      return sum + prize.amount;
    }
    return sum;
  }, 0);

  const typeCounts = prizePool.reduce((counts, prize) => {
    const type = prize.type || 'JPY';
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  let dominantType = 'JPY';
  let maxCount = 0;
  
  Object.entries(typeCounts).forEach(([type, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantType = type;
    }
  });

  const formattedTotal = formatPrize(totalPrize, dominantType);

  return (
    <VStack 
      spacing={2} 
      align="stretch" 
      height="100%"
      position="relative"
      maxW={{ base: "100%", "3xl": "500px" }}
      mx="auto"
    >
      <Box
        overflowY="auto"
        height="auto"
        maxHeight={["200px", "220px", "240px", "260px", "280px", "300px"]}
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
        pb={4}
        pt={6}
        mb={2}
      >
        {prizePool.map((prize, index) => (
          <HStack key={index} spacing={3} justify="space-between" mb={1} pr={6}>
            <Text 
              fontSize={["xl", "2xl", "2xl", "3xl", "5xl", "6xl"]} 
              color="gray.400"
              lineHeight={1.1}
            >
              {index + 1}{getOrdinalSuffix(index + 1)}
            </Text>
            <HStack spacing={2}>
              <Text 
                fontSize={["xl", "xl", "xl", "2xl", "4xl", "5xl"]} 
                textAlign="right"
                lineHeight={1.1}
              >
                {typeof prize.amount === 'number' 
                  ? formatPrize(prize.amount, prize.type)
                  : prize.amount}
              </Text>
              {prize.type === 'TICKET' && (
                <Text fontSize={["sm", "md", "md", "lg", "2xl", "3xl"]} color="gray.500">Ticket</Text>
              )}
            </HStack>
          </HStack>
        ))}
      </Box>

      <Box 
        width="100%"
        border="1px solid" 
        borderColor="gray.600" 
        p={3} 
        mb={1}
        textAlign="center"
        borderRadius="md"
        backgroundColor="blackAlpha.400"
        boxShadow="sm"
        position="relative" 
        mt={2}
        top="auto"
        display="none"
      >
        <HStack justifyContent="space-between" mb={2}>
          <Text fontSize={["xs", "xs", "xs", "sm", "sm", "sm"]} color="gray.400">Sponsored</Text>
          <Text fontSize={["xs", "xs", "xs", "sm", "sm", "sm"]} color="gray.400">Ad</Text>
        </HStack>
        <Box 
          width="100%" 
          maxWidth="300px"
          height="250px"
          backgroundColor="blackAlpha.300" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          borderRadius="sm"
          overflow="hidden"
          position="relative"
          mx="auto"
        >
          <Text fontSize={["md", "md", "lg", "lg", "lg", "xl"]} color="gray.500" position="absolute">
            レクタングル広告
          </Text>
          <Text fontSize={["xs", "xs", "sm", "sm", "sm", "md"]} color="gray.600" position="absolute" bottom="10px">
            ポーカー関連の広告が最も収益性が高いです
          </Text>
        </Box>
      </Box>

      <Box 
        mb={4}
        position="relative"
        top="auto"
      >
        <Text 
          fontSize={["lg", "xl", "xl", "2xl", "3xl", "4xl"]} 
          fontWeight="bold" 
          color="yellow.300"
          mb={1}
          lineHeight={1.1}
        >
          TOTAL PRIZE POOL
        </Text>
        <Text 
          fontSize={["xl", "2xl", "3xl", "4xl", "5xl", "6xl"]} 
          fontWeight="bold"
          pr={6}
          textAlign="right"
          lineHeight={1.1}
        >
          {formattedTotal}
        </Text>
      </Box>
    </VStack>
  );
};

const getOrdinalSuffix = (i: number): string => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) return 'ST';
  if (j === 2 && k !== 12) return 'ND';
  if (j === 3 && k !== 13) return 'RD';
  return 'TH';
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