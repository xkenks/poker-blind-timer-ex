'use client'

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
  ListIcon,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image,
  Flex,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon, ChevronRightIcon, InfoIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function Advertise() {
  const bgColor = useColorModeValue("blue.50", "blue.900");
  const borderColor = useColorModeValue("blue.200", "blue.700");
  
  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="container.lg">
        <Breadcrumb 
          spacing="8px" 
          separator={<ChevronRightIcon color="gray.500" />}
          mb={8}
          color="gray.600"
        >
          <BreadcrumbItem>
            <Link href="/" passHref legacyBehavior>
              <BreadcrumbLink>ホーム</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>広告掲載について</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <VStack spacing={10} align="flex-start">
          <Box>
            <Heading as="h1" size="xl" mb={4} color="gray.800">
              広告掲載について
            </Heading>
            <Text fontSize="lg" color="gray.700" maxW="3xl">
              Poker Blind Timer EXへの広告掲載をご検討いただき、ありがとうございます。
              当サービスはポーカープレイヤーやトーナメント主催者を対象としており、
              関連製品・サービスの効果的なプロモーションの場として最適です。
            </Text>
          </Box>
          
          <Box 
            width="100%" 
            bg="white" 
            p={8} 
            borderRadius="lg" 
            boxShadow="md"
          >
            <Heading as="h2" size="lg" mb={6} color="gray.800">
              広告掲載のメリット
            </Heading>
            
            <VStack spacing={6} align="flex-start">
              <HStack spacing={4} align="flex-start">
                <Badge colorScheme="green" fontSize="md" p={2} borderRadius="md">
                  MERIT 1
                </Badge>
                <Box>
                  <Text fontWeight="bold" fontSize="lg" color="gray.800">ターゲット特化型プロモーション</Text>
                  <Text color="gray.800">ポーカー関連製品・サービスに興味のあるユーザーに直接アプローチできます。</Text>
                </Box>
              </HStack>
              
              <HStack spacing={4} align="flex-start">
                <Badge colorScheme="green" fontSize="md" p={2} borderRadius="md">
                  MERIT 2
                </Badge>
                <Box>
                  <Text fontWeight="bold" fontSize="lg" color="gray.800">高い視認性</Text>
                  <Text color="gray.800">タイマー使用中はユーザーが画面を頻繁に確認するため、広告の視認性が高くなります。</Text>
                </Box>
              </HStack>
              
              <HStack spacing={4} align="flex-start">
                <Badge colorScheme="green" fontSize="md" p={2} borderRadius="md">
                  MERIT 3
                </Badge>
                <Box>
                  <Text fontWeight="bold" fontSize="lg" color="gray.800">長時間の露出</Text>
                  <Text color="gray.800">ポーカートーナメントは長時間開催されるため、広告への接触時間が長くなります。</Text>
                </Box>
              </HStack>
            </VStack>
          </Box>
          
          <Box 
            width="100%" 
            bg="blue.100" 
            p={8} 
            borderRadius="lg" 
            boxShadow="md"
            color="black"
          >
            <Heading as="h2" size="lg" mb={6} color="gray.800">
              広告掲載のお問い合わせ
            </Heading>
            
            <Text fontSize="lg" mb={6} color="gray.800">
              広告掲載に関するご質問や、お見積もりのご依頼は下記よりお問い合わせください。
              担当者より詳細をご案内いたします。
            </Text>
            
            <Flex direction={["column", "row"]} gap={4}>
              <Link href="/contact" passHref legacyBehavior>
                <Button 
                  as="a" 
                  colorScheme="yellow" 
                  size="lg" 
                  rightIcon={<ChevronRightIcon />}
                  width={["100%", "auto"]}
                >
                  お問い合わせフォームへ
                </Button>
              </Link>
              
              <Text fontSize="md" alignSelf="center" color="gray.800">
                メール: velmel.inc@gmail.com (広告担当)
              </Text>
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 