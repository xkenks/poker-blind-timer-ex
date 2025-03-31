'use client'

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  Image,
  Grid,
  GridItem,
  Icon,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Divider,
  Badge,
  chakra,
  Stack,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { ChevronRightIcon, CheckIcon, StarIcon } from '@chakra-ui/icons';
import { FaClock, FaUsers, FaTrophy, FaCog, FaMobileAlt, FaChartLine, FaHandPaper, FaDice, FaChartBar } from 'react-icons/fa';
import Link from 'next/link';
import { IconType } from 'react-icons';

// アニメーションの定義
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const FadeIn = chakra(Box, {
  baseStyle: {
    animation: `${fadeIn} 0.8s ease-out forwards`,
  },
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  // SEO用の構造化データ
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
    // 構造化データをheadに追加
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    // アニメーション用の遅延ロード
    setIsLoaded(true);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Box minH="100vh">
      {/* ヒーローセクション */}
      <Box 
        bg="linear-gradient(135deg, #1a365d 0%, #2d3748 100%)" 
        color="white" 
        pt={[10, 16, 20, 28]} 
        pb={[16, 20, 28, 36]} 
        position="relative" 
        overflow="hidden"
      >
        {/* 装飾的な背景要素 */}
        <Box 
          position="absolute" 
          top={0} 
          left={0} 
          right={0} 
          bottom={0} 
          opacity={0.08} 
          bgImage={`url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFF" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`} 
        />

        {/* 円形の装飾 */}
        <Box
          position="absolute"
          top={["-50px", "-75px", "-100px"]}
          right={["-50px", "-75px", "-100px"]}
          width={["300px", "400px", "500px"]}
          height={["300px", "400px", "500px"]}
          borderRadius="full"
          bg="blue.500"
          opacity="0.1"
          filter="blur(60px)"
        />
        
        <Box
          position="absolute"
          bottom={["-75px", "-100px", "-150px"]}
          left={["-75px", "-100px", "-150px"]}
          width={["200px", "300px", "400px"]}
          height={["200px", "300px", "400px"]}
          borderRadius="full"
          bg="cyan.400"
          opacity="0.1"
          filter="blur(80px)"
        />
        
        <Container maxW="container.xl" position="relative" px={[4, 6, 8]}>
          {/* サービス名を中央に表示 */}
          <Box textAlign="center" mb={[6, 8, 10]} mt={[-6, -8, -12]}>
            <Box 
              as="h1" 
              fontSize={["2xl", "3xl", "4xl", "5xl"]}
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="normal"
              color="white"
              display="inline-block"
              fontFamily="'Montserrat', sans-serif"
              px={[2, 3, 4]}
              py={[1, 1.5, 2]}
              pb={[3, 4, 5]}
              borderBottom="2px solid"
              borderColor="yellow.400"
              position="relative"
              width={["auto", "auto", "auto"]}
              maxWidth="100%"
              overflowWrap="break-word"
              mb={[4, 6, 8]}
            >
              Poker Blind Timer EX
            </Box>
          </Box>
          
          <Grid 
            templateColumns={["1fr", "1fr", "1fr 1fr"]} 
            gap={[4, 6, 8]} 
            alignItems="center"
          >
            <GridItem>
              <FadeIn style={{ animationDelay: '0.1s' }}>
                <Badge 
                  colorScheme="yellow" 
                  fontSize={["xs", "sm"]} 
                  px={[2, 3]} 
                  py={1} 
                  mb={[2, 3, 4]} 
                  borderRadius="full"
                >
                  無料で使えるプロ仕様
                </Badge>
                
                <Heading 
                  as="h2" 
                  fontSize={["xl", "2xl", "3xl", "4xl"]}
                  fontWeight="extrabold"
                  lineHeight="1.1"
                  mb={[2, 3]}
                >
                  <Box 
                    as="span"
                    bgGradient="linear(to-r, white, blue.200)"
                    bgClip="text"
                  >
                    ポーカートーナメントを<br />
                    スマートに運営
                  </Box>
                </Heading>
                
                <Text 
                  fontSize={["md", "lg", "xl"]} 
                  maxW="xl" 
                  mb={[4, 6, 8]} 
                  opacity={0.9} 
                  lineHeight="tall"
                >
                  直感的な操作で、ブラインド管理、プレイヤー追跡、賞金計算まで。
                  プロフェッショナルなトーナメント運営を、あなたの手元で。
                </Text>
                
                <Stack 
                  direction={["column", "row"]} 
                  spacing={[3, 4]} 
                  pt={2}
                  width="100%"
                >
                  <Link href="/timer" passHref legacyBehavior>
                    <Button 
                      as="a" 
                      size={["md", "lg"]} 
                      px={[4, 6, 8]}
                      py={[5, 6, 7]}
                      fontSize={["md", "lg"]}
                      fontWeight="bold"
                      rightIcon={<ChevronRightIcon boxSize={[4, 5, 6]} />}
                      colorScheme="yellow"
                      _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                      transition="all 0.2s"
                      width={["100%", "auto"]}
                    >
                      タイマーを使う
                    </Button>
                  </Link>
                  <Link href="/guide" passHref legacyBehavior>
                    <Button 
                      as="a" 
                      size={["md", "lg"]}
                      variant="outline"
                      px={[4, 6, 8]}
                      py={[5, 6, 7]}
                      fontSize={["md", "lg"]}
                      borderColor="whiteAlpha.400"
                      color="blue.500"
                      _hover={{ bg: 'whiteAlpha.100', borderColor: 'white', color: 'blue.300' }}
                      transition="all 0.2s"
                      width={["100%", "auto"]}
                    >
                      使い方ガイド
                    </Button>
                  </Link>
                </Stack>
              </FadeIn>
            </GridItem>
            
            <GridItem display={["none", "none", "block"]}>
              <Box 
                sx={{ 
                  animation: `${float} 3s ease-in-out infinite`,
                  transformOrigin: 'center center',
                }}
              >
                <Box
                  overflow="hidden"
                  boxShadow="xl"
                  position="relative"
                  height="auto"
                  mx="auto"
                  maxWidth="100%"
                  borderRadius="2xl"
                >
                  <Image 
                    src="/images/screenshot.png" 
                    alt="Poker Blind Timer EXのスクリーンショット" 
                    width={600}
                    height={350}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: 'auto'
                    }}
                  />
                </Box>
              </Box>
            </GridItem>
          </Grid>
          
          {/* ハイライトスタッツ */}
          <Grid 
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
            gap={4}
            mt={16}
            px={[4, 8, 12]}
            py={[6, 8]}
            bg="whiteAlpha.100"
            borderRadius="xl"
            backdropFilter="blur(8px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            <GridItem>
              <Stat
                icon={FaHandPaper}
                label="設計"
                value="ポーカープレイヤー"
                color="yellow.300"
              />
            </GridItem>
            <GridItem>
              <Stat
                icon={FaTrophy}
                label="形式"
                value="トーナメント最適化"
                color="cyan.300"
              />
            </GridItem>
            <GridItem>
              <Stat
                icon={FaUsers}
                label="機能"
                value="プレイヤー管理"
                color="purple.300"
              />
            </GridItem>
            <GridItem>
              <Stat
                icon={FaDice}
                label="適応性"
                value="全ての変種対応"
                color="green.300"
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* モバイル表示用のタイマープレビュー */}
      <Box 
        display={["block", "block", "none"]} 
        bg="gray.100" 
        p={4} 
        textAlign="center"
      >
        <Box
          bg="white"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          position="relative"
          maxWidth="300px"
          mx="auto"
          mb={4}
        >
          <Image 
            src="/images/screenshot-mobile.png" 
            alt="Poker Blind Timer EXのモバイル表示" 
            width={300}
            height={200}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: 'auto'
            }}
          />
        </Box>
      </Box>

      {/* 機能紹介セクション */}
      <Box py={20} bg="#f8fafc">
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <FadeIn style={{ animationDelay: '0.1s' }}>
                <Badge colorScheme="blue" fontSize="md" px={3} py={1} mb={2} borderRadius="full">
                  主な機能
                </Badge>
                <Heading as="h2" fontSize={["3xl", "4xl"]} fontWeight="bold" color="gray.800">
                  プロ仕様の機能で<br />トーナメントを完全制御
                </Heading>
                <Text fontSize="lg" maxW="2xl" mt={4} color="black">
                  Poker Blind Timer EXは、ポーカートーナメント運営に必要な全ての機能を、洗練されたインターフェースで提供します。
                  カスタマイズ性と使いやすさを両立したタイマーで、あなたのトーナメントをサポートします。
                </Text>
              </FadeIn>
            </VStack>
            
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={10}>
              <FeatureCard 
                icon={FaClock} 
                title="高度なブラインド管理" 
                description="カスタマイズ可能なブラインド構成、ブレイク設定、レベル時間調整など、トーナメント構造を自由に設計できます。"
                delay="0.2s"
              />
              <FeatureCard 
                icon={FaUsers} 
                title="プレイヤー追跡システム" 
                description="リアルタイムのプレイヤー統計情報を表示。バイイン、リバイ、脱落者を管理し、平均スタックを自動計算します。"
                delay="0.3s"
              />
              <FeatureCard 
                icon={FaTrophy} 
                title="賞金プール計算ツール" 
                description="エントリー数に応じた賞金計算と柔軟な配分率設定。ITM（イン・ザ・マネー）の詳細な管理ができます。"
                delay="0.4s"
              />
              <FeatureCard 
                icon={FaCog} 
                title="カスタマイズディスプレイ" 
                description="画面の色やレイアウト、背景画像などを自由に変更可能。あなたのイベントのブランディングに合わせた表示が可能です。"
                delay="0.5s"
              />
              <FeatureCard 
                icon={FaMobileAlt} 
                title="完全レスポンシブ対応" 
                description="スマートフォン、タブレット、デスクトップのどのデバイスからでも最適な表示で使用できます。どこでもトーナメントを管理できます。"
                delay="0.6s"
              />
              <FeatureCard 
                icon={FaChartBar} 
                title="トーナメント分析" 
                description="プレイヤー数の推移、平均スタック、ブラインドレベルの視覚的な分析で、トーナメントの進行状況を把握できます。"
                delay="0.7s"
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* 使い方セクション */}
      <Box py={24} bg="gray.50">
        <Container maxW="container.xl">
          <FadeIn style={{ animationDelay: '0.2s' }}>
            <VStack spacing={8} align="center" textAlign="center" maxW="container.md" mx="auto">
              <Badge colorScheme="green" fontSize="md" px={3} py={1} borderRadius="full">
                簡単操作
              </Badge>
              <Heading as="h2" fontSize={["3xl", "4xl"]} fontWeight="bold" color="gray.800">
                直感的な操作でスムーズな運営を
              </Heading>
              <Text fontSize="lg" color="black" maxW="800px">
                Poker Blind Timer EXは、初めての方でも迷わず使える直感的な設計になっています。基本的な使い方は以下の通りです：
              </Text>
              
              <Box 
                bg="white" 
                p={8} 
                borderRadius="xl" 
                boxShadow="md" 
                w="100%" 
                maxW="800px"
                border="1px solid"
                borderColor="gray.100"
              >
                <VStack align="flex-start" spacing={6}>
                  <FeaturePoint 
                    text="タイマーの開始・一時停止・次のレベルへの移動は大きなボタンでワンタッチ操作"
                  />
                  <FeaturePoint 
                    text="ブラインド構造は簡単ドラッグ＆ドロップでカスタマイズ。プリセットも多数用意"
                  />
                  <FeaturePoint 
                    text="プレイヤー管理画面でバイイン・リバイ・脱落を記録し、平均スタックを自動計算"
                  />
                  <FeaturePoint 
                    text="賞金計算機能で参加人数に応じた配分率を自動設定。ITM（イン・ザ・マネー）人数も調整可能"
                  />
                  <FeaturePoint 
                    text="設定はすべて自動保存。次回起動時にも前回の状態を即座に復元"
                  />
                </VStack>
              </Box>
              
              <Text fontSize="lg" color="black" fontWeight="medium" maxW="800px" mt={4}>
                画面上部のブラインド表示では、現在と次のレベルの情報が一目で確認できます。画面中央の大きなタイマーは会場のどこからでも視認可能です。画面下部にはプレイヤー情報や統計データをリアルタイムで表示します。
              </Text>
              
              <Text fontSize="lg" color="black" maxW="800px" mb={4}>
                初めてのトーナメント開催でも、「設定ウィザード」機能が最適なブラインド構造を提案。プレイヤー数や希望時間を入力するだけで、プロ仕様のトーナメント設計が完了します。
              </Text>
              
              <Link href="/guide" passHref legacyBehavior>
                <Button 
                  as="a" 
                  colorScheme="blue" 
                  size="lg"
                  px={8}
                  rightIcon={<ChevronRightIcon />}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                  transition="all 0.2s"
                  mt={4}
                >
                  詳しい使い方ガイド
                </Button>
              </Link>
            </VStack>
          </FadeIn>
        </Container>
      </Box>

      {/* CTAセクション */}
      <Box 
        py={24} 
        bg="linear-gradient(135deg, #1a365d 0%, #2d3748 100%)" 
        color="white"
        position="relative"
        overflow="hidden"
      >
        {/* 装飾的な背景要素 */}
        <Box 
          position="absolute" 
          top={0} 
          left={0} 
          right={0} 
          bottom={0} 
          opacity={0.1} 
          bgImage={`url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1.5"/%3E%3Ccircle cx="13" cy="13" r="1.5"/%3E%3C/g%3E%3C/svg%3E')`} 
        />
        
        <Container maxW="container.md" position="relative" textAlign="center">
          <FadeIn style={{ animationDelay: '0.2s' }}>
            <VStack spacing={8}>
              <Badge colorScheme="yellow" fontSize="md" px={3} py={1} mb={2} borderRadius="full">
                無料で始める
              </Badge>
              <Heading 
                as="h2" 
                fontSize={["3xl", "4xl", "5xl"]} 
                fontWeight="bold"
                lineHeight="1.2"
              >
                今すぐトーナメントを<br />プロフェッショナルに
              </Heading>
              <Text fontSize={["lg", "xl"]} maxW="2xl" opacity={0.9}>
                インストール不要で、ブラウザからすぐに使えます。<br />
                ポーカーの魅力を最大限に引き出す、スマートなトーナメント運営を体験してください。
              </Text>
              <Link href="/timer" passHref legacyBehavior>
                <Button 
                  as="a" 
                  colorScheme="yellow" 
                  size="lg" 
                  px={10}
                  py={8}
                  fontSize="xl"
                  rightIcon={<ChevronRightIcon boxSize={6} />}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                >
                  今すぐタイマーを使う
                </Button>
              </Link>
            </VStack>
          </FadeIn>
        </Container>
      </Box>

      {/* フッター */}
      <Box bg="gray.900" color="gray.400" py={16}>
        <Container maxW="container.xl">
          <Grid 
            templateColumns={["1fr", "1fr", "2fr 1fr 1fr"]} 
            gap={[10, 10, 20]}
          >
            <GridItem>
              <VStack align={["center", "center", "flex-start"]} spacing={4} textAlign={["center", "center", "left"]}>
                <Heading as="h3" size="lg" color="white" fontWeight="bold">
                  Poker Blind Timer EX
                </Heading>
                <Text maxW="md">
                  直感的で使いやすいポーカートーナメント管理ツール。
                  ブラインド構造の設定からプレイヤー管理、賞金計算まで、
                  トーナメント運営に必要な全ての機能を提供します。
                </Text>
              </VStack>
            </GridItem>
            
            <GridItem>
              <VStack align={["center", "center", "flex-start"]} spacing={4}>
                <Heading as="h4" size="md" color="white" mb={2}>
                  クイックリンク
                </Heading>
                <Link href="/timer" passHref legacyBehavior>
                  <Text as="a" fontSize="md" _hover={{ color: "white" }}>タイマーを使う</Text>
                </Link>
                <Link href="/guide" passHref legacyBehavior>
                  <Text as="a" fontSize="md" _hover={{ color: "white" }}>使い方ガイド</Text>
                </Link>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack align={["center", "center", "flex-start"]} spacing={4}>
                <Heading as="h4" size="md" color="white" mb={2}>
                  サイト情報
                </Heading>
                <Link href="/terms" passHref legacyBehavior>
                  <Text as="a" fontSize="md" _hover={{ color: "white" }}>利用規約</Text>
                </Link>
                <Link href="/privacy" passHref legacyBehavior>
                  <Text as="a" fontSize="md" _hover={{ color: "white" }}>プライバシーポリシー</Text>
                </Link>
                <Link href="https://velmel.co.jp/" passHref legacyBehavior>
                  <Text as="a" fontSize="md" _hover={{ color: "white" }}>運営元情報</Text>
                </Link>
                <Link href="/contact" passHref legacyBehavior>
                  <Text as="a" fontSize="md" _hover={{ color: "white" }}>お問い合わせ</Text>
                </Link>
                <Link href="/advertise" passHref legacyBehavior>
                  <Text as="a" fontSize="md" _hover={{ color: "white" }}>広告掲載について</Text>
                </Link>
              </VStack>
            </GridItem>
          </Grid>
          
          <Divider my={10} borderColor="gray.800" />
          
          <Flex 
            direction={["column", "row"]} 
            justify="space-between" 
            align="center"
            textAlign={["center", "left"]}
          >
            <Text fontSize="sm">
              © {new Date().getFullYear()} Poker Blind Timer EX All rights reserved.
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

// 機能カードコンポーネント
interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCard = ({ icon, title, description, delay = '0s' }: FeatureCardProps) => {
  return (
    <FadeIn style={{ animationDelay: delay }}>
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="md"
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
        height="100%"
        border="1px solid"
        borderColor="gray.100"
      >
        <Flex direction="column" height="100%">
          <Box
            bg="blue.50"
            p={3}
            borderRadius="lg"
            width="fit-content"
            mb={5}
          >
            <Icon as={icon} boxSize={6} color="blue.600" />
          </Box>

          <Heading as="h3" size="md" mb={4} color="gray.800">
            {title}
          </Heading>

          <Text color="black" flex="1" fontWeight="medium">
            {description}
          </Text>
        </Flex>
      </Box>
    </FadeIn>
  );
};

// 機能ポイントコンポーネント
interface FeaturePointProps {
  text: string;
}

const FeaturePoint = ({ text }: FeaturePointProps) => {
  return (
    <HStack align="center">
      <Box
        minWidth="32px"
        height="32px"
        borderRadius="full"
        bg="green.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={CheckIcon} color="green.500" boxSize={4} />
      </Box>
      <Text fontSize="lg" color="black" fontWeight="medium">{text}</Text>
    </HStack>
  );
};

// 統計コンポーネント
interface StatProps {
  icon: IconType;
  label: string;
  value: string;
  color: string;
}

const Stat = ({ icon, label, value, color }: StatProps) => {
  return (
    <VStack spacing={2} align={["center", "center", "center", "flex-start"]} textAlign={["center", "center", "center", "left"]}>
      <Icon as={icon} boxSize={5} color={color} />
      <Text fontSize="sm" textTransform="uppercase" fontWeight="medium" opacity={0.8}>{label}</Text>
      <Text fontSize={["lg", "xl"]} fontWeight="bold" letterSpacing="tight">{value}</Text>
    </VStack>
  );
}; 