import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Poker Blind Timer EX',
  description: 'Poker Blind Timer EXのプライバシーポリシーです。個人情報の取り扱いや利用目的について定めています。',
};

export default function Privacy() {
  return (
    <Box bg="gray.900" minH="100vh" py={8} color="gray.100">
      <Container maxW="container.md">
        <VStack spacing={6} align="stretch">
          <Box>
            <Button
              as={Link}
              href="/"
              variant="ghost"
              alignSelf="flex-start"
              mb={4}
              color="gray.100"
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              ← 戻る
            </Button>
          </Box>

          <Heading as="h1" size="xl" mb={6}>
            プライバシーポリシー
          </Heading>

          <Text>
            Poker Timer EX（以下、「本サービス」といいます。）は、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
          </Text>

          <VStack spacing={4} align="stretch">
            <Box>
              <Heading as="h2" size="md" mb={2}>
                第1条（個人情報の収集）
              </Heading>
              <Text>
                本サービスでは、ユーザーの個人情報を収集しません。ただし、本サービスの利用に関する情報（利用状況、トラフィックデータ等）を自動的に収集する場合があります。
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                第2条（個人情報を収集・利用する目的）
              </Heading>
              <Text>
                本サービスが個人情報を収集・利用する目的は、以下のとおりです。
              </Text>
              <VStack spacing={2} align="stretch" pl={4} mt={2}>
                <Text>1. サービスの提供・運営のため</Text>
                <Text>2. 利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</Text>
                <Text>3. ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため</Text>
                <Text>4. 上記の利用目的に付随する目的</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                第3条（利用状況の収集）
              </Heading>
              <Text>
                本サービスは、サービスの利用状況を把握するために、Googleアナリティクス等のアクセス解析ツールを使用する場合があります。
                これらのツールは、Cookie等を使用して、個人を特定できない形式で利用状況を収集します。
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                第4条（個人情報の第三者提供）
              </Heading>
              <Text>
                本サービスは、次に掲げる場合を除いて、収集した情報を第三者に提供することはありません。
              </Text>
              <VStack spacing={2} align="stretch" pl={4} mt={2}>
                <Text>1. ユーザーの同意がある場合</Text>
                <Text>2. 法令に基づく場合</Text>
                <Text>3. 人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</Text>
                <Text>4. 公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                第5条（プライバシーポリシーの変更）
              </Heading>
              <Text>
                本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
                変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
              </Text>
            </Box>

            <Box pt={4}>
              <Text>2024年3月20日 制定</Text>
            </Box>

            <Box pt={4}>
              <Text>
                お問い合わせ: <ChakraLink href="mailto:velmel.inc@gmail.com" color="blue.500">velmel.inc@gmail.com</ChakraLink>
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
} 