'use client'

import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Text,
  VStack,
  HStack,
  Link,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { Timer } from '../components/Timer';
import { PlayerManager } from '../components/PlayerManager';
import { PrizePool } from '../components/PrizePool';
import { BlindSettings } from '../components/BlindSettings';
import { PrizePoolSettings } from '../components/PrizePoolSettings';
import { usePokerStore } from '../store/pokerStore';
import { DisplaySettings } from '../components/DisplaySettings';
import { formatTime } from '../utils/timeUtils';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClient, setIsClient] = useState(false);
  const [playerStats, setPlayerStats] = useState({ totalPlayers: 0, currentPlayers: 0, averageStack: 0 });
  const { 
    playerState, 
    blindLevels,
    currentTime,
    displaySettings: { backgroundColor, textColor }
  } = usePokerStore();

  // Add structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Poker Blind Timer EX',
    'applicationCategory': 'GameApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'JPY'
    },
    'description': 'ポーカートーナメント運営に最適な高機能タイマー。ブラインド管理、プレイヤー管理、賞金管理など、トーナメントの運営に必要な機能を全て搭載。'
  };

  useEffect(() => {
    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const total = playerState.initialPlayers + playerState.rebuys;
      const current = total - playerState.playersOut;
      const average = current > 0
        ? Math.round((playerState.initialStack * total) / current)
        : 0;

      setPlayerStats({
        totalPlayers: total,
        currentPlayers: current,
        averageStack: average
      });
    }
  }, [
    isClient,
    playerState.initialPlayers,
    playerState.rebuys,
    playerState.playersOut,
    playerState.initialStack
  ]);

  const getNextBreakIn = () => {
    if (!isClient) return "--:--";
    
    const nextBreakTime = usePokerStore.getState().getNextBreakTime();
    
    if (nextBreakTime === -1) {
      return "No Break";
    }
    
    if (nextBreakTime === 0) {
      return "Break Time!";
    }
    
    return formatTime(nextBreakTime);
  };

  return (
    <Box 
      bg={backgroundColor}
      minH="100vh"
      maxH="100vh"
      position="relative"
      color={textColor}
      p={4}
      overflow="hidden"
    >
      <VStack spacing={4} width="100%">
        <Box 
          width="100%" 
          textAlign="center" 
          pb={2} 
          borderBottom="1px solid" 
          borderColor="whiteAlpha.300"
          display={["none", "none", "block"]}
        >
          <Text
            fontSize={["2xl", "3xl", "4xl"]}
            fontWeight="bold"
            color="yellow.300"
            suppressHydrationWarning
          >
            {isClient ? usePokerStore.getState().tournamentName || "Tournament" : "Tournament"}
          </Text>
        </Box>

        <Grid
          templateColumns={["1fr", "1fr", "350px 1fr 350px"]}
          gap={4}
          height="calc(100vh - 100px)"
          maxH="calc(100vh - 100px)"
          position="relative"
          width="100%"
        >
          <GridItem display={["none", "none", "block"]} overflow="hidden">
            <Box
              height="100%"
              position="relative"
              overflow="hidden"
            >
              <Text 
                fontSize={["xl", "2xl"]} 
                fontWeight="bold" 
                position="absolute"
                top={0}
                left={0}
                color="yellow.300"
              >
                PRIZE POOL
              </Text>
              <Box 
                position="absolute"
                top={10}
                left={0}
                right={0}
                bottom={0}
                overflow="hidden"
              >
                <PrizePool />
              </Box>
            </Box>
          </GridItem>

          <GridItem>
            <VStack spacing={2} width="100%" height="100%" justify="center"
              px={4}
            >
              <Timer />
            </VStack>
          </GridItem>

          <GridItem display={["none", "none", "block"]} overflow="hidden">
            <Box
              height="100%"
              position="relative"
              overflow="hidden"
            >
              <VStack spacing={8} align="stretch" height="100%">
                <Box>
                  <Text 
                    fontSize={["xl", "2xl"]} 
                    fontWeight="bold" 
                    color="yellow.300" 
                    mb={2}
                  >
                    NEXT BREAK IN
                  </Text>
                  <Text 
                    fontSize={["4xl", "5xl", "6xl"]} 
                    fontWeight="bold" 
                    suppressHydrationWarning
                    fontFamily="mono"
                  >
                    {getNextBreakIn()}
                  </Text>
                </Box>

                <Box
                  width="100%"
                  pt={4}
                >
                  <Text 
                    fontSize={["xl", "2xl"]} 
                    fontWeight="bold" 
                    color="yellow.300" 
                    mb={2}
                  >
                    AVG STACK
                  </Text>
                  <Text 
                    fontSize={["4xl", "5xl", "6xl"]} 
                    fontWeight="bold" 
                    suppressHydrationWarning
                    fontFamily="mono"
                  >
                    {isClient ? playerStats.averageStack.toLocaleString() : "0"}
                  </Text>
                </Box>

                <Box
                  width="100%"
                  pt={4}
                >
                  <Text 
                    fontSize={["xl", "2xl"]} 
                    fontWeight="bold" 
                    color="yellow.300" 
                    mb={2}
                  >
                    PLAYERS
                  </Text>
                  <Text 
                    fontSize={["4xl", "5xl", "6xl"]} 
                    fontWeight="bold" 
                    suppressHydrationWarning
                    fontFamily="mono"
                  >
                    {isClient ? `${playerStats.currentPlayers}/${playerStats.totalPlayers}` : "0/0"}
                  </Text>
                </Box>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </VStack>

      <IconButton
        aria-label="Settings"
        icon={<SettingsIcon boxSize={6} />}
        position="fixed"
        right={4}
        bottom={4}
        size="lg"
        onClick={onOpen}
        colorScheme="gray"
        variant="ghost"
        color="white"
        _hover={{ bg: 'whiteAlpha.200' }}
      />

      <HStack
        position="fixed"
        right={20}
        bottom={4}
        spacing={4}
      >
        <Link
          href="/terms"
          fontSize="sm"
          color="whiteAlpha.700"
          _hover={{ color: 'white' }}
        >
          利用規約
        </Link>
        <Link
          href="/privacy"
          fontSize="sm"
          color="whiteAlpha.700"
          _hover={{ color: 'white' }}
        >
          プライバシーポリシー
        </Link>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="white" color="black" maxW="1000px">
          <ModalHeader borderBottom="1px" borderColor="gray.200">Tournament Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6} width="100%" maxW="900px" mx="auto">
              <BlindSettings />
              <PlayerManager />
              <PrizePoolSettings />
              <DisplaySettings />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
} 