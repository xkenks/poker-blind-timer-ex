import React from 'react';
import {
  Box,
  VStack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { usePokerStore } from '../store/pokerStore';

export const PlayerManager = () => {
  const {
    playerState,
    updatePlayerState,
  } = usePokerStore();

  const {
    initialPlayers,
    rebuys,
    playersOut,
    initialStack,
  } = playerState;

  const totalPlayers = initialPlayers + rebuys;
  const currentPlayers = totalPlayers - playersOut;
  const averageStack = currentPlayers > 0
    ? Math.round((initialStack * totalPlayers) / currentPlayers)
    : 0;

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="md"
      borderColor="gray.200"
      borderWidth="1px"
      shadow="sm"
      width="100%"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Player Management
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th width="200px">Item</Th>
            <Th>Value</Th>
            <Th width="200px">Current Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Initial Players</Td>
            <Td>
              <NumberInput
                value={initialPlayers}
                onChange={(_, value) => updatePlayerState({ initialPlayers: value })}
                min={0}
                size="lg"
              >
                <NumberInputField 
                  bg="white" 
                  borderColor="gray.300"
                  textAlign="right"
                  paddingRight="35px"
                  fontSize={["13px", "14px"]}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="gray.900" color="white" _hover={{ bg: 'gray.700' }} />
                  <NumberDecrementStepper bg="gray.900" color="white" _hover={{ bg: 'gray.700' }} />
                </NumberInputStepper>
              </NumberInput>
            </Td>
            <Td>
              <Text fontWeight="bold" color="blue.600">
                {initialPlayers} players
              </Text>
            </Td>
          </Tr>
          
          <Tr>
            <Td>Rebuys</Td>
            <Td>
              <NumberInput
                value={rebuys}
                onChange={(_, value) => updatePlayerState({ rebuys: value })}
                min={0}
                size="lg"
              >
                <NumberInputField 
                  bg="white" 
                  borderColor="gray.300"
                  textAlign="right"
                  paddingRight="35px"
                  fontSize={["13px", "14px"]}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="gray.900" color="white" _hover={{ bg: 'gray.700' }} />
                  <NumberDecrementStepper bg="gray.900" color="white" _hover={{ bg: 'gray.700' }} />
                </NumberInputStepper>
              </NumberInput>
            </Td>
            <Td>
              <Text fontWeight="bold" color="green.600">
                {rebuys} times
              </Text>
            </Td>
          </Tr>
          
          <Tr>
            <Td>Players Out</Td>
            <Td>
              <NumberInput
                value={playersOut}
                onChange={(_, value) => updatePlayerState({ playersOut: value })}
                min={0}
                max={totalPlayers}
                size="lg"
              >
                <NumberInputField 
                  bg="white" 
                  borderColor="gray.300"
                  textAlign="right"
                  paddingRight="35px"
                  fontSize={["13px", "14px"]}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="gray.900" color="white" _hover={{ bg: 'gray.700' }} />
                  <NumberDecrementStepper bg="gray.900" color="white" _hover={{ bg: 'gray.700' }} />
                </NumberInputStepper>
              </NumberInput>
            </Td>
            <Td>
              <Text fontWeight="bold" color="red.600">
                {playersOut} players
              </Text>
            </Td>
          </Tr>
          
          <Tr>
            <Td>Initial Stack</Td>
            <Td>
              <NumberInput
                value={initialStack}
                onChange={(_, value) => updatePlayerState({ initialStack: value })}
                min={0}
                step={1000}
                size="lg"
              >
                <NumberInputField 
                  bg="white" 
                  borderColor="gray.300"
                  textAlign="right"
                  paddingRight="35px"
                  fontSize={["13px", "14px"]}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="gray.900" color="white" _hover={{ bg: 'gray.700' }} />
                  <NumberDecrementStepper bg="gray.900" color="white" _hover={{ bg: 'gray.700' }} />
                </NumberInputStepper>
              </NumberInput>
            </Td>
            <Td>
              <Text fontWeight="bold" color="purple.600">
                {initialStack.toLocaleString()}
              </Text>
            </Td>
          </Tr>

          <Tr bg="gray.50">
            <Td fontWeight="bold">Current Status</Td>
            <Td colSpan={2}>
              <Text fontSize="lg" fontWeight="bold" color="gray.700">
                {currentPlayers}/{totalPlayers} players　
                Average Stack: {averageStack.toLocaleString()}
              </Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}; 