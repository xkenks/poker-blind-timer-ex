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

export default function PrivacyPage() {
  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="flex-start">
          <Link href="/" passHref legacyBehavior>
            <Button as="a" leftIcon={<ArrowBackIcon />} colorScheme="blue" variant="outline">
              ホームに戻る
            </Button>
          </Link>
          
          <Heading as="h1" size="xl" color="black">プライバシーポリシー</Heading>
          
          <VStack spacing={4} align="flex-start" width="100%">
            <Text color="black">
              このプライバシーポリシーは、ポーカーブラインドタイマー（以下、「本サービス」）の利用に関する個人情報の取り扱いについて定めるものです。利用者は、本サービスを利用することで、このプライバシーポリシーに同意したものとみなされます。
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">1. 収集する情報</Heading>
            <Text color="black">
              本サービスでは、基本的に個人を特定できる情報は収集していません。ただし、以下の情報を取得・保存することがあります：<br/>
              - 利用状況に関する統計情報（アクセス解析ツールによる情報）<br/>
              - ブラウザのローカルストレージに保存されるデータ（設定情報、タイマー状態など）
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">2. 情報の利用目的</Heading>
            <Text color="black">
              収集した情報は、以下の目的で利用します：<br/>
              - サービスの改善・開発<br/>
              - システムの安定運用<br/>
              - ユーザー体験の向上<br/>
              - 不正アクセスやシステム濫用の検知・防止
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">3. ローカルストレージの使用</Heading>
            <Text color="black">
              本サービスでは、タイマー設定やプレイヤー情報などのデータをブラウザのローカルストレージに保存します。これらのデータはユーザーのデバイス内に保存され、サーバーに送信されることはありません。<br/><br/>
              ローカルストレージに保存される主な情報：<br/>
              - タイマー設定（ブラインド構造、時間設定など）<br/>
              - プレイヤー情報（人数、平均スタックなど）<br/>
              - 賞金計算情報<br/>
              - 表示設定（背景色、文字色など）
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">4. アクセス解析ツールの使用</Heading>
            <Text color="black">
              本サービスでは、Googleアナリティクスなどのアクセス解析ツールを使用して、利用状況の分析を行っています。これらのツールは、Cookieを使用して匿名の利用データを収集します。これらのデータは、サービス改善のためにのみ使用されます。<br/><br/>
              
              アクセス解析ツールによって収集される主な情報：<br/>
              - アクセス日時<br/>
              - デバイス情報（種類、画面サイズなど）<br/>
              - ブラウザ情報<br/>
              - 地域情報（国や地域レベル）<br/>
              - リファラー情報
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">5. 第三者への情報提供</Heading>
            <Text color="black">
              以下の場合を除き、収集した情報を第三者に提供することはありません：<br/>
              - 法令に基づく場合<br/>
              - 人の生命、身体または財産の保護のために必要がある場合<br/>
              - 公衆衛生の向上または児童の健全な育成の推進のために必要がある場合<br/>
              - 国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">6. 情報の管理</Heading>
            <Text color="black">
              収集した情報は、適切な安全管理措置を講じて保護します。ただし、インターネット上のデータ送信は完全に安全であるとは保証できません。利用者ご自身の責任においてサービスをご利用ください。
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">7. 利用者の権利</Heading>
            <Text color="black">
              利用者は以下の権利を有します：<br/>
              - ブラウザの設定によりCookieの使用を制限する権利<br/>
              - ローカルストレージに保存されたデータを削除する権利
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">8. ポリシーの変更</Heading>
            <Text color="black">
              本プライバシーポリシーは、必要に応じて変更されることがあります。重要な変更がある場合は、本サービス上で通知します。
            </Text>

            <Heading as="h2" size="lg" mt={4} color="black">9. お問い合わせ</Heading>
            <Text color="black">
              本プライバシーポリシーに関するお問い合わせは、サービス運営者までご連絡ください。
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