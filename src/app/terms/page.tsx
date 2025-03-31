'use client'

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Link from 'next/link';

// メタデータは別ファイルに移動するか、ここでは削除して動作確認を優先します

export default function TermsPage() {
  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="flex-start">
          <Link href="/" passHref legacyBehavior>
            <Button as="a" leftIcon={<ArrowBackIcon />} colorScheme="blue" variant="outline">
              ホームに戻る
            </Button>
          </Link>
          
          <Heading as="h1" size="xl" color="black">利用規約</Heading>
          
          <VStack spacing={4} align="flex-start" width="100%">
            <Text color="black">
              このポーカーブラインドタイマー（以下、「本サービス」）をご利用いただく前に、以下の利用規約をよくお読みください。本サービスを利用することで、これらの規約に同意したものとみなされます。
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">第1条（適用範囲）</Heading>
            <Text color="black">
              1. 本規約は、本サービスの利用に関する条件を定めるものであり、利用者は本規約に従って本サービスを利用するものとします。<br/>
              2. 本サービスの提供者（以下、「運営者」）は、必要に応じて本規約を変更することができるものとします。変更後の規約は、本サービス上で告知した時点から効力を生じるものとします。
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">第2条（サービスの内容）</Heading>
            <Text color="black">
              1. 本サービスは、ポーカートーナメントの運営を支援するためのタイマーおよび関連機能を提供するものです。<br/>
              2. 運営者は、利用者に事前に通知することなく、本サービスの内容を変更、追加、削除することができるものとします。
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">第3条（利用条件）</Heading>
            <Text color="black">
              1. 本サービスは無料で利用できます。<br/>
              2. 本サービスの利用にあたっては、利用者自身のインターネット環境、通信機器などが必要になります。これらの環境整備にかかる費用は利用者が負担するものとします。<br/>
              3. 本サービスは、ギャンブルやマネーゲームを推奨するものではありません。実際のお金を賭けたギャンブルに本サービスを使用する場合は、各国・地域の法律に従い、利用者自身の責任で行ってください。
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">第4条（禁止事項）</Heading>
            <Text color="black">
              利用者は、本サービスの利用にあたり、以下の行為を行ってはならないものとします：<br/>
              1. 法令に違反する行為<br/>
              2. 公序良俗に反する行為<br/>
              3. 他者の権利を侵害する行為<br/>
              4. 本サービスの運営を妨害する行為<br/>
              5. 本サービスの信用を毀損する行為<br/>
              6. 本サービスを商用目的で無断複製・再配布する行為<br/>
              7. その他、運営者が不適切と判断する行為
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">第5条（免責事項）</Heading>
            <Text color="black">
              1. 運営者は、本サービスの内容の正確性、完全性、有用性などについて、いかなる保証も行いません。<br/>
              2. 本サービスの利用によって利用者に生じたいかなる損害についても、運営者は一切の責任を負いません。<br/>
              3. 本サービスのデータ保存は、ブラウザのローカルストレージを使用しています。ブラウザのデータを削除した場合や、異なるブラウザやデバイスで利用した場合、データが引き継がれないことがあります。データのバックアップは利用者自身の責任で行ってください。
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">第6条（サービスの中断・終了）</Heading>
            <Text color="black">
              運営者は、以下の理由により、利用者に事前に通知することなく、一時的または永続的に本サービスの提供を中断または終了することができるものとします：<br/>
              1. システムの保守点検または更新を行う場合<br/>
              2. 地震、落雷、火災、停電、天災などの不可抗力により、本サービスの提供が困難となった場合<br/>
              3. その他、運営者が本サービスの提供が困難と判断した場合
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">第7条（著作権）</Heading>
            <Text color="black">
              本サービスに関連するすべてのコンテンツ（テキスト、画像、プログラムコード等）の著作権は運営者または正当な権利者に帰属します。無断での複製、転載、改変、再配布等を禁止します。
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">第8条（準拠法と管轄裁判所）</Heading>
            <Text color="black">
              1. 本規約の解釈にあたっては、日本法を準拠法とします。<br/>
              2. 本サービスに関する紛争については、運営者の所在地を管轄する裁判所を専属的合意管轄裁判所とします。
            </Text>

            <Text mt={6} fontWeight="bold" color="black">
              最終更新日：2025年4月1日
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
} 