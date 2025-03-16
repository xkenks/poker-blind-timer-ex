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
  title: '利用規約 | Poker Blind Timer EX',
  description: 'Poker Blind Timer EXの利用規約です。本サービスの利用条件や禁止事項、免責事項などについて定めています。',
};

export default function Terms() {
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
            利用規約
          </Heading>

          <Text>
            この利用規約（以下、「本規約」といいます。）は、Poker Blind Timer EX（以下、「本サービス」といいます。）の利用条件を定めるものです。
          </Text>

          <VStack spacing={4} align="stretch">
            <Box>
              <Heading as="h2" size="md" mb={2}>
                第1条（適用）
              </Heading>
              <Text>
                本規約は、ユーザーと本サービスの利用に関わる一切の関係に適用されるものとします。
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                第2条（利用登録）
              </Heading>
              <Text>
                本サービスは登録不要で利用できます。
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                第3条（禁止事項）
              </Heading>
              <Text>
                ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
              </Text>
              <VStack spacing={2} align="stretch" pl={4} mt={2}>
                <Text>1. 法令または公序良俗に違反する行為</Text>
                <Text>2. 犯罪行為に関連する行為</Text>
                <Text>3. 本サービスのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</Text>
                <Text>4. 本サービスの運営を妨害するおそれのある行為</Text>
                <Text>5. 他のユーザーに関する個人情報等を収集または蓄積する行為</Text>
                <Text>6. 他のユーザーに成りすます行為</Text>
                <Text>7. 本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</Text>
                <Text>8. その他、当社が不適切と判断する行為</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                第4条（本サービスの提供の停止等）
              </Heading>
              <Text>
                当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              </Text>
              <VStack spacing={2} align="stretch" pl={4} mt={2}>
                <Text>1. 本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</Text>
                <Text>2. 地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</Text>
                <Text>3. コンピュータまたは通信回線等が事故により停止した場合</Text>
                <Text>4. その他、当社が本サービスの提供が困難と判断した場合</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                第5条（免責事項）
              </Heading>
              <Text>
                当社の債務不履行責任は、当社の故意または重過失によらない場合には免責されるものとします。
                当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                第6条（サービス内容の変更等）
              </Heading>
              <Text>
                当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                第7条（利用規約の変更）
              </Heading>
              <Text>
                当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
                変更後の利用規約は、当社が別途定める場合を除いて、本ウェブサイトに表示した時点より効力を生じるものとします。
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                第8条（準拠法・裁判管轄）
              </Heading>
              <Text>
                本規約の解釈にあたっては、日本法を準拠法とします。
                本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
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