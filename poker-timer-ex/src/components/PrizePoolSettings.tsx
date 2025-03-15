'use client'

import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  HStack,
  Select,
  Input,
  IconButton,
  SimpleGrid,
  VStack,
  Thead,
  Th,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { usePokerStore, Prize } from '../store/pokerStore';

const PRIZE_TYPES = {
  JPY: { label: '¥', prefix: '¥' },
  USD: { label: '$', prefix: '$' },
  COIN: { label: 'COIN', prefix: '' },
  TICKET: { label: 'TICKET', prefix: '' },
  ITEM: { label: 'Item', prefix: '' },
};

const getOrdinal = (position: number) => {
  const suffixes = ['st', 'nd', 'rd'];
  const suffix = position <= 3 ? suffixes[position - 1] : 'th';
  return `${position}${suffix}`;
};

const prizeTypeOptions = [
  { value: 'USD', label: '$' },
  { value: 'JPY', label: '¥' },
  { value: 'COIN', label: 'COIN' },
  { value: 'TICKET', label: 'TICKET' },
  { value: 'ITEM', label: 'ITEM' },
];

export const PrizePoolSettings = () => {
  const { prizes, updatePrizePool } = usePokerStore();
  const [localPrizes, setLocalPrizes] = useState<Prize[]>(prizes);

  // コンポーネントマウント時の初期化
  useEffect(() => {
    if (prizes.length === 0) {
      // 初期の賞金構造を設定
      const initialPrizes: Prize[] = [
        { id: 1, position: 1, amount: 0, type: 'USD' },
        { id: 2, position: 2, amount: 0, type: 'USD' },
        { id: 3, position: 3, amount: 0, type: 'USD' }
      ];
      updatePrizePool(initialPrizes);
    }
  }, []);

  // prizesの変更を監視して同期を取る
  useEffect(() => {
    setLocalPrizes(prizes);
  }, [prizes]);

  const handlePrizeChange = (index: number, field: string, value: string | number) => {
    const newPrizes = [...localPrizes];
    if (field === 'type') {
      newPrizes[index] = {
        ...newPrizes[index],
        type: value as Prize['type'],
        amount: value === 'ITEM' ? '' : (newPrizes[index].amount as number)
      };
    } else {
      newPrizes[index] = {
        ...newPrizes[index],
        [field]: value
      };
    }
    setLocalPrizes(newPrizes);
    updatePrizePool(newPrizes);
  };

  const handleAddPrize = () => {
    const newPrize: Prize = {
      id: localPrizes.length + 1,
      position: localPrizes.length + 1,
      amount: 0,
      type: 'USD'
    };
    const updatedPrizes = [...localPrizes, newPrize];
    setLocalPrizes(updatedPrizes);
    updatePrizePool(updatedPrizes);
  };

  const handleDeletePrize = (position: number) => {
    if (localPrizes.length <= 1) return;

    const updatedPrizes = localPrizes
      .filter(prize => prize.position !== position)
      .map((prize, index) => ({
        ...prize,
        position: index + 1,
        id: index + 1
      }));
    setLocalPrizes(updatedPrizes);
    updatePrizePool(updatedPrizes);
  };

  const calculateTotal = (type: Prize['type']) => {
    return localPrizes
      .filter(prize => prize.type === type && typeof prize.amount === 'number')
      .reduce((sum, prize) => sum + (prize.amount as number), 0);
  };

  const getStepValue = (type: Prize['type']) => {
    switch (type) {
      case 'JPY':
        return 1000;
      case 'USD':
        return 100;
      case 'COIN':
        return 1000;
      default:
        return 1;
    }
  };

  return (
    <Box
      bg="white"
      p={4}
      width="100%"
    >
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold">Prize Pool Settings</Text>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            variant="ghost"
            size="sm"
            onClick={handleAddPrize}
          >
            Add Prize
          </Button>
        </HStack>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="16px" textAlign="center" width="100px">Position</Th>
                <Th fontSize="16px" textAlign="center" width="200px">Prize Amount</Th>
                <Th fontSize="16px" textAlign="center" width="120px">Prize Type</Th>
                <Th fontSize="16px" textAlign="center" width="80px">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {localPrizes.map((prize, index) => (
                <Tr key={prize.position}>
                  <Td>
                    {index + 1}{getOrdinalSuffix(index + 1)}
                  </Td>
                  <Td>
                    {prize.type === 'ITEM' ? (
                      <Input
                        value={prize.amount}
                        onChange={(e) => handlePrizeChange(index, 'amount', e.target.value)}
                        size="lg"
                        fontSize="16px"
                        height="44px"
                      />
                    ) : (
                      <NumberInput
                        value={prize.amount}
                        onChange={(_, value) => handlePrizeChange(index, 'amount', value)}
                        min={0}
                        size="lg"
                      >
                        <NumberInputField
                          fontSize="16px"
                          textAlign="right"
                          paddingRight="8px"
                          height="44px"
                        />
                      </NumberInput>
                    )}
                  </Td>
                  <Td>
                    <Select
                      value={prize.type}
                      onChange={(e) => handlePrizeChange(index, 'type', e.target.value)}
                      size="lg"
                      fontSize="16px"
                      height="44px"
                    >
                      <option value="JPY">¥</option>
                      <option value="USD">$</option>
                      <option value="COIN">Coin</option>
                      <option value="ITEM">Item</option>
                    </Select>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      size="lg"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleDeletePrize(prize.position)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box 
          p={3} 
          bg="blue.50" 
          borderRadius="md"
          borderWidth="1px"
          borderColor="blue.200"
        >
          <Text fontWeight="bold" color="blue.800" mb={2}>
            Total Prize Pool
          </Text>
          <HStack spacing={4} flexWrap="wrap">
            {localPrizes.some(p => p.type === 'JPY') && (
              <Text fontSize={["md", "lg"]} fontWeight="bold" color="blue.600">
                ¥{calculateTotal('JPY').toLocaleString()}
              </Text>
            )}
            {localPrizes.some(p => p.type === 'USD') && (
              <Text fontSize={["md", "lg"]} fontWeight="bold" color="blue.600">
                ${calculateTotal('USD').toLocaleString()}
              </Text>
            )}
            {localPrizes.some(p => p.type === 'COIN') && (
              <Text fontSize={["md", "lg"]} fontWeight="bold" color="blue.600">
                {calculateTotal('COIN').toLocaleString()} COIN
              </Text>
            )}
          </HStack>
        </Box>
      </VStack>
    </Box>
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