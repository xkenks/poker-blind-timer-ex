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
  Badge,
  Flex,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import { usePokerStore, Prize } from '../store/pokerStore';

const PRIZE_TYPES = {
  JPY: { label: '¥', prefix: '¥', color: 'green' },
  USD: { label: '$', prefix: '$', color: 'blue' },
  COIN: { label: 'COIN', prefix: '', color: 'yellow' },
  TICKET: { label: 'TICKET', prefix: '', color: 'purple' },
  ITEM: { label: 'Item', prefix: '', color: 'red' },
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
  const { prizes, updatePrizePool, resetPrizePool } = usePokerStore();
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

  // Prize Typeに対応するバッジの色を取得
  const getPrizeTypeBadgeColor = (type: Prize['type']) => {
    return PRIZE_TYPES[type]?.color || 'gray';
  };

  return (
    <Box
      bg="white"
      p={[3, 4, 5, 6]}
      borderRadius="md"
      borderColor="gray.200"
      borderWidth="1px"
      shadow="sm"
      width="100%"
      maxWidth={["100%", "100%", "100%", "900px"]}
      mx="auto"
    >
      <VStack spacing={4} align="stretch">
        <Flex 
          justify="space-between" 
          align="center" 
          flexDir={["column", "column", "row"]}
          gap={2}
        >
          <Text fontSize={["lg", "xl"]} fontWeight="bold">Prize Pool Settings</Text>
          <HStack spacing={2}>
            <Button
              leftIcon={<RepeatIcon />}
              colorScheme="blue"
              variant="outline"
              size={["sm", "md"]}
              onClick={resetPrizePool}
            >
              Reset
            </Button>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              variant="ghost"
              size={["sm", "md"]}
              onClick={handleAddPrize}
            >
              Add Prize
            </Button>
          </HStack>
        </Flex>

        {/* モバイルビュー（スモールスクリーン） */}
        <Box display={["block", "block", "none"]}>
          {localPrizes.map((prize, index) => (
            <Box 
              key={prize.position}
              p={3}
              mb={3}
              borderWidth="1px"
              borderRadius="md"
              borderColor="gray.200"
              position="relative"
            >
              <Flex justify="space-between" mb={3}>
                <Badge
                  colorScheme={getPrizeTypeBadgeColor(prize.type)}
                  fontSize="sm"
                  p={1}
                  borderRadius="md"
                >
                  {index + 1}{getOrdinalSuffix(index + 1)} Place
                </Badge>
                <Badge
                  colorScheme={getPrizeTypeBadgeColor(prize.type)}
                  fontSize="sm"
                  p={1}
                  borderRadius="md"
                  variant="solid"
                >
                  {prize.type === 'JPY' ? '¥' : 
                   prize.type === 'USD' ? '$' : 
                   prize.type}
                </Badge>
              </Flex>
              
              <FormControl mb={3}>
                <FormLabel fontSize="sm" mb={1}>Prize Amount</FormLabel>
                {prize.type === 'ITEM' ? (
                  <Input
                    value={prize.amount}
                    onChange={(e) => handlePrizeChange(index, 'amount', e.target.value)}
                    size="md"
                    fontSize="16px"
                  />
                ) : (
                  <NumberInput
                    value={prize.amount}
                    onChange={(_, value) => handlePrizeChange(index, 'amount', value)}
                    min={0}
                    size="md"
                  >
                    <NumberInputField
                      fontSize="16px"
                      textAlign="right"
                      paddingRight="8px"
                    />
                  </NumberInput>
                )}
              </FormControl>
              
              <FormControl mb={3}>
                <FormLabel fontSize="sm" mb={1}>Prize Type</FormLabel>
                <Select
                  value={prize.type}
                  onChange={(e) => handlePrizeChange(index, 'type', e.target.value)}
                  size="md"
                  fontSize="16px"
                  bg={`${getPrizeTypeBadgeColor(prize.type)}.50`}
                  borderColor={`${getPrizeTypeBadgeColor(prize.type)}.200`}
                >
                  <option value="JPY">¥ (円)</option>
                  <option value="USD">$ (ドル)</option>
                  <option value="COIN">Coin (コイン)</option>
                  <option value="ITEM">Item (アイテム)</option>
                </Select>
              </FormControl>
              
              <Flex justify="flex-end">
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleDeletePrize(prize.position)}
                />
              </Flex>
            </Box>
          ))}
        </Box>

        {/* デスクトップビュー（ラージスクリーン） */}
        <Box overflowX="auto" display={["none", "none", "block"]}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize={["sm", "md", "16px"]} textAlign="center" width="100px">Position</Th>
                <Th fontSize={["sm", "md", "16px"]} textAlign="center" width="200px">Prize Amount</Th>
                <Th fontSize={["sm", "md", "16px"]} textAlign="center" width="120px">Prize Type</Th>
                <Th fontSize={["sm", "md", "16px"]} textAlign="center" width="80px">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {localPrizes.map((prize, index) => (
                <Tr key={prize.position}>
                  <Td>
                    <Badge colorScheme={getPrizeTypeBadgeColor(prize.type)} p={1} borderRadius="md">
                      {index + 1}{getOrdinalSuffix(index + 1)}
                    </Badge>
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
                      bg={`${getPrizeTypeBadgeColor(prize.type)}.50`}
                      borderColor={`${getPrizeTypeBadgeColor(prize.type)}.200`}
                    >
                      <option value="JPY">¥ (円)</option>
                      <option value="USD">$ (ドル)</option>
                      <option value="COIN">Coin (コイン)</option>
                      <option value="ITEM">Item (アイテム)</option>
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
              <Badge fontSize={["sm", "md", "lg"]} p={2} colorScheme="green" variant="solid" borderRadius="md">
                ¥{calculateTotal('JPY').toLocaleString()}
              </Badge>
            )}
            {localPrizes.some(p => p.type === 'USD') && (
              <Badge fontSize={["sm", "md", "lg"]} p={2} colorScheme="blue" variant="solid" borderRadius="md">
                ${calculateTotal('USD').toLocaleString()}
              </Badge>
            )}
            {localPrizes.some(p => p.type === 'COIN') && (
              <Badge fontSize={["sm", "md", "lg"]} p={2} colorScheme="yellow" variant="solid" borderRadius="md">
                {calculateTotal('COIN').toLocaleString()} COIN
              </Badge>
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