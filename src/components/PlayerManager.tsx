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
  Flex,
  SimpleGrid,
  Badge,
  Heading,
  FormControl,
  FormLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { usePokerStore } from '../store/pokerStore';
import { useTranslation } from '../utils/translations';

export const PlayerManager = () => {
  const t = useTranslation();
  const {
    playerState,
    updatePlayerState,
    resetPlayerState
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
      p={[4, 4, 5, 6]}
      borderRadius="md"
      borderColor="gray.200"
      borderWidth="1px"
      shadow="sm"
      width="100%"
      maxWidth={["100%", "100%", "100%", "900px"]}
      mx="auto"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={[4, 4]}>
        <Text fontSize={["xl", "xl"]} fontWeight="bold">
          Player Management
        </Text>
        <Button
          leftIcon={<RepeatIcon />}
          colorScheme="blue"
          variant="outline"
          size="sm"
          onClick={resetPlayerState}
        >
          {t('reset')}
        </Button>
      </Flex>

      {/* モバイルビュー（スモールスクリーン） */}
      <Box display={["block", "block", "none"]}>
        <SimpleGrid columns={1} spacing={5} width="100%">
          {/* 現在の状況サマリー (モバイル) */}
          <Card variant="filled" bg="gray.50" p={3} shadow="md" borderRadius="lg">
            <CardBody>
              <Flex direction="column" align="center" justify="center">
                <Badge colorScheme="blue" fontSize="md" mb={3} p={2} borderRadius="md">
                  {t('currentStatus')}
                </Badge>
                <Text fontSize="xl" fontWeight="bold" color="gray.700" textAlign="center">
                  {currentPlayers}/{totalPlayers} Players
                </Text>
                <Text fontSize="lg" fontWeight="medium" color="gray.700" textAlign="center" mt={2}>
                  {t('averageStack')}: {averageStack.toLocaleString()}
                </Text>
              </Flex>
            </CardBody>
          </Card>

          {/* 初期プレイヤー数 (モバイル) */}
          <Card shadow="md" borderRadius="lg">
            <CardHeader pb={1}>
              <FormLabel fontSize="md" fontWeight="bold" mb={0}>
                {t('initialPlayers')}
              </FormLabel>
            </CardHeader>
            <CardBody pt={2}>
              <NumberInput
                value={initialPlayers}
                onChange={(_, value) => updatePlayerState({ initialPlayers: value })}
                min={0}
                size="lg"
              >
                <NumberInputField 
                  bg="white" 
                  borderColor="blue.200"
                  _hover={{ borderColor: "blue.300" }}
                  textAlign="right"
                  paddingRight="40px"
                  fontSize="18px"
                  height="48px"
                  color="black"
                  fontWeight="bold"
                  inputMode="numeric"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="blue.500" color="white" _hover={{ bg: 'blue.600' }} />
                  <NumberDecrementStepper bg="blue.500" color="white" _hover={{ bg: 'blue.600' }} />
                </NumberInputStepper>
              </NumberInput>
            </CardBody>
            <CardFooter pt={0}>
              <Badge colorScheme="blue" variant="solid" fontSize="md" p={2} borderRadius="md">
                {initialPlayers} players
              </Badge>
            </CardFooter>
          </Card>

          {/* リバイ回数 (モバイル) */}
          <Card shadow="md" borderRadius="lg">
            <CardHeader pb={1}>
              <FormLabel fontSize="md" fontWeight="bold" mb={0}>
                {t('rebuys')}
              </FormLabel>
            </CardHeader>
            <CardBody pt={2}>
              <NumberInput
                value={rebuys}
                onChange={(_, value) => updatePlayerState({ rebuys: value })}
                min={0}
                size="lg"
              >
                <NumberInputField 
                  bg="white" 
                  borderColor="green.200"
                  _hover={{ borderColor: "green.300" }}
                  textAlign="right"
                  paddingRight="40px"
                  fontSize="18px"
                  height="48px"
                  color="black"
                  fontWeight="bold"
                  inputMode="numeric"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="green.500" color="white" _hover={{ bg: 'green.600' }} />
                  <NumberDecrementStepper bg="green.500" color="white" _hover={{ bg: 'green.600' }} />
                </NumberInputStepper>
              </NumberInput>
            </CardBody>
            <CardFooter pt={0}>
              <Badge colorScheme="green" variant="solid" fontSize="md" p={2} borderRadius="md">
                {rebuys} times
              </Badge>
            </CardFooter>
          </Card>

          {/* 脱落プレイヤー数 (モバイル) */}
          <Card shadow="md" borderRadius="lg">
            <CardHeader pb={1}>
              <FormLabel fontSize="md" fontWeight="bold" mb={0}>
                {t('eliminatedPlayers')}
              </FormLabel>
            </CardHeader>
            <CardBody pt={2}>
              <NumberInput
                value={playersOut}
                onChange={(_, value) => updatePlayerState({ playersOut: value })}
                min={0}
                max={totalPlayers}
                size="lg"
              >
                <NumberInputField 
                  bg="white" 
                  borderColor="red.200"
                  _hover={{ borderColor: "red.300" }}
                  textAlign="right"
                  paddingRight="40px"
                  fontSize="18px"
                  height="48px"
                  color="black"
                  fontWeight="bold"
                  inputMode="numeric"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="red.500" color="white" _hover={{ bg: 'red.600' }} />
                  <NumberDecrementStepper bg="red.500" color="white" _hover={{ bg: 'red.600' }} />
                </NumberInputStepper>
              </NumberInput>
            </CardBody>
            <CardFooter pt={0}>
              <Badge colorScheme="red" variant="solid" fontSize="md" p={2} borderRadius="md">
                {playersOut} players
              </Badge>
            </CardFooter>
          </Card>

          {/* 初期スタック (モバイル) */}
          <Card shadow="md" borderRadius="lg">
            <CardHeader pb={1}>
              <FormLabel fontSize="md" fontWeight="bold" mb={0}>
                {t('initialStack')}
              </FormLabel>
            </CardHeader>
            <CardBody pt={2}>
              <NumberInput
                value={initialStack}
                onChange={(_, value) => updatePlayerState({ initialStack: value })}
                min={0}
                step={1000}
                size="lg"
              >
                <NumberInputField 
                  bg="white" 
                  borderColor="purple.200"
                  _hover={{ borderColor: "purple.300" }}
                  textAlign="right"
                  paddingRight="40px"
                  fontSize="18px"
                  height="48px"
                  color="black"
                  fontWeight="bold"
                  inputMode="numeric"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper bg="purple.500" color="white" _hover={{ bg: 'purple.600' }} />
                  <NumberDecrementStepper bg="purple.500" color="white" _hover={{ bg: 'purple.600' }} />
                </NumberInputStepper>
              </NumberInput>
            </CardBody>
            <CardFooter pt={0}>
              <Badge colorScheme="purple" variant="solid" fontSize="md" p={2} borderRadius="md">
                {initialStack.toLocaleString()}
              </Badge>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </Box>

      {/* デスクトップビュー（ラージスクリーン） */}
      <Box display={["none", "none", "block"]} overflowX="auto" className="desktop-view">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th width="200px" fontSize={["sm", "md"]}>Item</Th>
              <Th fontSize={["sm", "md"]}>Value</Th>
              <Th width="200px" fontSize={["sm", "md"]}>{t('currentStatus')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td fontWeight="medium">{t('initialPlayers')}</Td>
              <Td>
                <NumberInput
                  value={initialPlayers}
                  onChange={(_, value) => updatePlayerState({ initialPlayers: value })}
                  min={0}
                  size="md"
                >
                  <NumberInputField 
                    bg="white" 
                    borderColor="blue.200"
                    _hover={{ borderColor: "blue.300" }}
                    textAlign="right"
                    paddingRight="35px"
                    fontSize="16px"
                    height="40px"
                    color="black"
                    fontWeight="bold"
                    inputMode="numeric"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper bg="blue.500" color="white" _hover={{ bg: 'blue.600' }} />
                    <NumberDecrementStepper bg="blue.500" color="white" _hover={{ bg: 'blue.600' }} />
                  </NumberInputStepper>
                </NumberInput>
              </Td>
              <Td>
                <Badge colorScheme="blue" p={2} borderRadius="md" fontSize="md">
                  {initialPlayers} players
                </Badge>
              </Td>
            </Tr>
            
            <Tr>
              <Td fontWeight="medium">{t('rebuys')}</Td>
              <Td>
                <NumberInput
                  value={rebuys}
                  onChange={(_, value) => updatePlayerState({ rebuys: value })}
                  min={0}
                  size="md"
                >
                  <NumberInputField 
                    bg="white" 
                    borderColor="green.200"
                    _hover={{ borderColor: "green.300" }}
                    textAlign="right"
                    paddingRight="35px"
                    fontSize="16px"
                    height="40px"
                    color="black"
                    fontWeight="bold"
                    inputMode="numeric"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper bg="green.500" color="white" _hover={{ bg: 'green.600' }} />
                    <NumberDecrementStepper bg="green.500" color="white" _hover={{ bg: 'green.600' }} />
                  </NumberInputStepper>
                </NumberInput>
              </Td>
              <Td>
                <Badge colorScheme="green" p={2} borderRadius="md" fontSize="md">
                  {rebuys} times
                </Badge>
              </Td>
            </Tr>
            
            <Tr>
              <Td fontWeight="medium">{t('eliminatedPlayers')}</Td>
              <Td>
                <NumberInput
                  value={playersOut}
                  onChange={(_, value) => updatePlayerState({ playersOut: value })}
                  min={0}
                  max={totalPlayers}
                  size="md"
                >
                  <NumberInputField 
                    bg="white" 
                    borderColor="red.200"
                    _hover={{ borderColor: "red.300" }}
                    textAlign="right"
                    paddingRight="35px"
                    fontSize="16px"
                    height="40px"
                    color="black"
                    fontWeight="bold"
                    inputMode="numeric"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper bg="red.500" color="white" _hover={{ bg: 'red.600' }} />
                    <NumberDecrementStepper bg="red.500" color="white" _hover={{ bg: 'red.600' }} />
                  </NumberInputStepper>
                </NumberInput>
              </Td>
              <Td>
                <Badge colorScheme="red" p={2} borderRadius="md" fontSize="md">
                  {playersOut} players
                </Badge>
              </Td>
            </Tr>
            
            <Tr>
              <Td fontWeight="medium">{t('initialStack')}</Td>
              <Td>
                <NumberInput
                  value={initialStack}
                  onChange={(_, value) => updatePlayerState({ initialStack: value })}
                  min={0}
                  step={1000}
                  size="md"
                >
                  <NumberInputField 
                    bg="white" 
                    borderColor="purple.200"
                    _hover={{ borderColor: "purple.300" }}
                    textAlign="right"
                    paddingRight="35px"
                    fontSize="16px"
                    height="40px"
                    color="black"
                    fontWeight="bold"
                    inputMode="numeric"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper bg="purple.500" color="white" _hover={{ bg: 'purple.600' }} />
                    <NumberDecrementStepper bg="purple.500" color="white" _hover={{ bg: 'purple.600' }} />
                  </NumberInputStepper>
                </NumberInput>
              </Td>
              <Td>
                <Badge colorScheme="purple" p={2} borderRadius="md" fontSize="md">
                  {initialStack.toLocaleString()}
                </Badge>
              </Td>
            </Tr>

            <Tr bg="gray.50">
              <Td fontWeight="bold">{t('currentStatus')}</Td>
              <Td colSpan={2}>
                <Flex align="center" gap={4}>
                  <Badge colorScheme="blue" p={2} borderRadius="md" fontSize="md">
                    {t('remaining')} {currentPlayers}/{totalPlayers} {t('players')}
                  </Badge>
                  <Badge colorScheme="purple" p={2} borderRadius="md" fontSize="md">
                    {t('averageStack')}: {averageStack.toLocaleString()}
                  </Badge>
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}; 