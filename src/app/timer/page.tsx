'use client'

import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Link as ChakraLink,
  VStack,
  Text,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  IconButton,
} from '@chakra-ui/react';
import { ArrowBackIcon, SettingsIcon } from '@chakra-ui/icons';
import { FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { usePokerStore } from '../../store/pokerStore';
import { Timer } from '../../components/Timer';
import { PrizePool } from '../../components/PrizePool';
import { formatTime } from '../../utils/timeUtils';
import { BlindSettings } from '../../components/BlindSettings';
import { PlayerManager } from '../../components/PlayerManager';
import { PrizePoolSettings } from '../../components/PrizePoolSettings';
import { DisplaySettings } from '../../components/DisplaySettings';

const TimerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [playerStats, setPlayerStats] = useState({ totalPlayers: 0, currentPlayers: 0, averageStack: 0 });

  // SEO用の構造化データ
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'ポーカー ブラインドタイマー',
    'applicationCategory': 'GameApplication',
    'operatingSystem': 'Any',
    'description': 'ポーカートーナメント運営に最適な高機能タイマー。ブラインド管理、プレイヤー管理、賞金管理など、トーナメントの運営に必要な機能を全て搭載。',
  };

  const { 
    playerState, 
    displaySettings,
  } = usePokerStore();

  const { backgroundColor, textColor, backgroundImage, backgroundImageOptions } = displaySettings;

  // クライアントサイドのみの処理
  useEffect(() => {
    setIsClient(true);
  }, []);

  // プレイヤー統計情報の更新
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

  // 次の休憩時間を取得
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

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // 構造化データをheadに追加
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Box 
      bg={backgroundColor}
      minH="100vh"
      maxH="100vh"
      position="relative"
      color={textColor}
      overflow="hidden"
    >
      {backgroundImage && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage={backgroundImage ? `url(${backgroundImage})` : undefined}
          bgSize="cover"
          bgPosition="center"
          opacity={backgroundImageOptions?.opacity ?? 0.5}
          filter={`blur(${backgroundImageOptions?.blur ?? 0}px)`}
          zIndex={0}
          pointerEvents="none"
        />
      )}
      
      {/* ヘッダー */}
      <Box position="absolute" top={4} left={4} zIndex={10}>
        {/* ホームに戻るボタンを削除 */}
      </Box>
      
      <Box 
        position="relative" 
        width="100%" 
        minHeight="calc(100vh - 8px)"
        maxHeight="calc(100vh - 8px)"
        display="flex" 
        flexDirection="column"
        overflow="hidden"
        maxW="1920px"
        mx="auto"
        zIndex={1}
        p={[1, 2, 3, 4]}
      >
        <VStack spacing={0} width="100%" height={["calc(100vh - 16px)", "calc(100vh - 16px)", "calc(100vh - 24px)", "calc(100vh - 32px)"]}>
          <Box 
            width="100%" 
            textAlign="center" 
            pb={[1, 1, 2]} 
            borderBottom="1px solid" 
            borderColor="whiteAlpha.700"
            display={["none", "none", "none", "block"]}
            position="relative"
            zIndex="1"
            mb={0}
          >
            <Text
              fontSize={["xl", "2xl", "3xl", "3xl", "4xl", "5xl"]}
              fontWeight="bold"
              color="yellow.300"
              suppressHydrationWarning
            >
              {isClient ? usePokerStore.getState().tournamentName || "Tournament" : "Tournament"}
            </Text>
          </Box>

          <Box position="relative" width="100%" height="calc(100% - 53px)">
            <Box 
              display={["none", "none", "none", "block"]} 
              position="absolute" 
              left="25%" 
              top="-1px" 
              bottom="0"
              width="1px" 
              bg="whiteAlpha.700"
              pointerEvents="none"
              zIndex="2"
            />

            <Box 
              display={["none", "none", "none", "block"]} 
              position="absolute" 
              right="25%" 
              top="-1px" 
              bottom="0"
              width="1px" 
              bg="whiteAlpha.700"
              pointerEvents="none"
              zIndex="2"
            />

            <Grid
              templateColumns={["1fr", "1fr", "1fr", "minmax(250px, 25%) 1fr minmax(250px, 25%)"]}
              templateAreas={["'main'", "'main'", "'main'", "'left main right'"]}
              gap={0}
              height="100%"
              width="100%"
              position="relative"
              pt={0}
              mt={0}
              maxW="100%"
              sx={{
                '@media screen and (min-width: 1600px)': {
                  templateColumns: "300px 1fr 300px"
                },
                '@media screen and (min-width: 1920px)': {
                  templateColumns: "350px 1fr 350px"
                }
              }}
            >
              {/* 左側：プライズプール */}
              <GridItem display={["none", "none", "none", "block"]} overflow="hidden" area="left">
                <Box
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  pr={12}
                >
                  <Text 
                    fontSize={["xl", "xl", "xl", "2xl", "3xl", "4xl"]} 
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

              {/* 中央：タイマー */}
              <GridItem area="main">
                <VStack 
                  spacing={0} 
                  width="100%" 
                  height="100%" 
                  justify="center"
                  px={[0, 1, 2, 3]}
                  pb={[0, 2, 4, 6]}
                  maxW={{ base: "100%", "3xl": "1200px" }}
                  mx="auto"
                >
                  <Timer />
                </VStack>
              </GridItem>

              {/* 右側：休憩時間・スタック情報・プレイヤー情報 */}
              <GridItem display={["none", "none", "none", "block"]} area="right">
                <VStack spacing={6} height="100%" p={6} position="relative" alignItems="flex-start">
                  <Text 
                    fontSize={["xl", "xl", "xl", "2xl", "3xl", "4xl"]} 
                    fontWeight="bold" 
                    mb={4} 
                    color="yellow.300"
                  >
                    NEXT BREAK IN
                  </Text>
                  <Text 
                    fontSize={["3xl", "3xl", "4xl", "5xl", "6xl", "7xl"]} 
                    fontWeight="bold"
                    whiteSpace="nowrap"
                    width="100%"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {getNextBreakIn()}
                  </Text>

                  <Text 
                    fontSize={["xl", "xl", "xl", "2xl", "3xl", "4xl"]} 
                    fontWeight="bold" 
                    mt={2} 
                    color="yellow.300"
                  >
                    AVG STACK
                  </Text>
                  <Text 
                    fontSize={["4xl", "4xl", "5xl", "6xl", "7xl", "8xl"]} 
                    fontWeight="bold"
                  >
                    {isClient ? playerStats.averageStack.toLocaleString() : "0"}
                  </Text>

                  <Text 
                    fontSize={["xl", "xl", "xl", "2xl", "3xl", "4xl"]} 
                    fontWeight="bold" 
                    mt={2} 
                    color="yellow.300"
                  >
                    PLAYERS
                  </Text>
                  <Text fontSize={["4xl", "4xl", "5xl", "6xl", "7xl", "8xl"]} fontWeight="bold">
                    {isClient ? playerStats.currentPlayers : 0} / {isClient ? playerStats.totalPlayers : 0}
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        </VStack>

        {/* 設定ボタン */}
        <IconButton
          aria-label="Settings"
          icon={<SettingsIcon boxSize={6} />}
          position="fixed"
          right={4}
          bottom={4}
          size="lg"
          onClick={openModal}
          colorScheme="blue"
          variant="solid"
          color="white"
          _hover={{ bg: 'blue.600' }}
          zIndex={1000}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
          borderRadius="md"
        />
        
        {/* ホームボタン - 新規追加 */}
        <Link href="/" passHref legacyBehavior>
          <IconButton
            as="a"
            aria-label="Home"
            icon={<ArrowBackIcon boxSize={6} />}
            position="fixed"
            right={20}
            bottom={4}
            size="lg"
            colorScheme="blue"
            variant="solid"
            color="white"
            _hover={{ bg: 'blue.600' }}
            zIndex={1000}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
            borderRadius="md"
          />
        </Link>

        {/* 設定モーダル */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          size="6xl" 
          isCentered
          returnFocusOnClose={false}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent bg="white" color="black" maxW="1000px" mx={4}>
            <ModalHeader borderBottom="1px" borderColor="gray.200">Tournament Settings</ModalHeader>
            <ModalCloseButton onClick={closeModal} />
            <ModalBody pb={6} pt={4}>
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
    </Box>
  );
};

export default TimerPage; 