'use client'

import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const toast = useToast();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // メール送信用のデータを準備
      const formData = {
        name,
        email,
        subject: subject ? document.querySelector(`option[value="${subject}"]`)?.textContent : '',
        message
      };
      
      // メール本文を作成
      const mailBody = `
お名前: ${formData.name}
メールアドレス: ${formData.email}
お問い合わせ種別: ${formData.subject}

お問い合わせ内容:
${formData.message}
      `.trim();
      
      // メール送信用のURLを作成（mailto:リンク）
      const mailtoUrl = `mailto:velmel.inc@gmail.com?subject=【お問い合わせ】${encodeURIComponent(formData.subject || '')}&body=${encodeURIComponent(mailBody)}`;
      
      // ユーザーのデフォルトメールクライアントを開く
      window.open(mailtoUrl, '_blank');
      
      toast({
        title: 'お問い合わせ準備完了',
        description: 'メールクライアントが開きます。内容を確認して送信してください。',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // フォームリセット
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description: '再度お試しいただくか、直接メールでお問い合わせください。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="container.md">
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
            <BreadcrumbLink>お問い合わせ</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <VStack spacing={8} align="flex-start">
          <Box>
            <Heading as="h1" size="xl" mb={4} color="gray.800">
              お問い合わせ
            </Heading>
            <Text fontSize="lg" color="gray.700">
              Poker Blind Timer EXに関するご質問、ご意見、ご要望などがございましたら、
              下記フォームよりお気軽にお問い合わせください。
            </Text>
          </Box>
          
          <Box 
            as="form" 
            onSubmit={handleSubmit} 
            width="100%" 
            bg="white" 
            p={8} 
            borderRadius="lg" 
            boxShadow="md"
          >
            <VStack spacing={6} align="flex-start">
              <FormControl isRequired>
                <FormLabel htmlFor="name" color="gray.800">お名前</FormLabel>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="山田 太郎"
                  _placeholder={{ color: 'gray.500' }}
                  color="gray.800"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel htmlFor="email" color="gray.800">メールアドレス</FormLabel>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="example@example.com"
                  _placeholder={{ color: 'gray.500' }}
                  color="gray.800"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel htmlFor="subject" color="gray.800">お問い合わせ種別</FormLabel>
                <Select 
                  id="subject" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="種別を選択してください"
                  _placeholder={{ color: 'gray.500' }}
                  color="gray.800"
                >
                  <option value="general">一般的なご質問</option>
                  <option value="feature">機能に関するご要望</option>
                  <option value="bug">不具合のご報告</option>
                  <option value="business">ビジネスに関するお問い合わせ</option>
                  <option value="other">その他</option>
                </Select>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel htmlFor="message" color="gray.800">お問い合わせ内容</FormLabel>
                <Textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="お問い合わせ内容を詳しく入力してください"
                  _placeholder={{ color: 'gray.500' }}
                  minH="150px"
                  color="gray.800"
                />
              </FormControl>
              
              <Text fontSize="sm" color="gray.600">
                ご入力いただいた個人情報は、お問い合わせへの対応と、それに関連する目的にのみ使用し、
                当社プライバシーポリシーに従って適切に管理いたします。
              </Text>
              
              <Flex width="100%" justify="center" pt={4}>
                <Button 
                  colorScheme="blue" 
                  size="lg" 
                  type="submit" 
                  isLoading={isSubmitting}
                  loadingText="送信中"
                  width={["100%", "auto"]}
                  px={12}
                >
                  送信する
                </Button>
              </Flex>
            </VStack>
          </Box>
          
          <Box mt={8} p={6} bg="blue.50" borderRadius="md" width="100%">
            <Heading as="h2" size="md" mb={4} color="blue.700">
              お問い合わせ先情報
            </Heading>
            <VStack align="flex-start" spacing={3}>
              <Text fontSize="md" color="gray.800">
                <strong>運営会社:</strong> 株式会社VELMEL
              </Text>
              <Text fontSize="md" color="gray.800">
                <strong>メールアドレス:</strong> velmel.inc@gmail.com
              </Text>
              <Text fontSize="md" color="gray.800">
                <strong>Webサイト:</strong>{' '}
                <Link href="https://velmel.co.jp/" passHref legacyBehavior>
                  <Text as="a" color="blue.600" textDecoration="underline">
                    https://velmel.co.jp/
                  </Text>
                </Link>
              </Text>
              <Text fontSize="md" color="gray.800">
                <strong>対応時間:</strong> 平日10:00〜18:00 （土日祝日および年末年始を除く）
              </Text>
              <Text fontSize="md" color="gray.800">
                ※お問い合わせ内容によっては、返信までにお時間をいただく場合がございます。
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 