'use client'

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  UnorderedList,
  ListItem,
  Button,
  Image,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useBreakpointValue,
  Flex,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const GuidePage = () => {
  // SEO用の構造化データ
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'ポーカー ブラインドタイマー 使い方ガイド',
    'description': 'ポーカートーナメント運営のためのブラインドタイマーの使い方ガイド。ブラインド設定、プレイヤー管理、賞金計算など、各機能の詳細な説明。',
  };

  useEffect(() => {
    // 構造化データをheadに追加
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box minH="100vh" bg="gray.50">
      {/* ヘッダー */}
      <Box bg="blue.50" color="black" py={4} position="sticky" top={0} zIndex={10}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="lg">ポーカー ブラインドタイマー ガイド</Heading>
            <HStack spacing={4}>
              <Link href="/" passHref legacyBehavior>
                <Button as="a" colorScheme="blue" variant="solid" size="sm">
                  ホームへ戻る
                </Button>
              </Link>
              <Link href="/timer" passHref legacyBehavior>
                <Button as="a" colorScheme="blue" size="sm">
                  タイマーを使う
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, lg: 4 }}>
          {/* サイドナビゲーション (デスクトップ用) */}
          {isDesktop && (
            <Box w="250px" position="sticky" top="90px" alignSelf="flex-start">
              <VStack 
                align="stretch" 
                spacing={2} 
                bg="white" 
                p={4} 
                borderRadius="md" 
                boxShadow="sm" 
                fontSize="sm"
                color="black"
              >
                <Text fontWeight="bold" fontSize="md" mb={2}>目次</Text>
                <ChakraLink href="#intro" color="black">・はじめに</ChakraLink>
                <ChakraLink href="#blind-settings" color="black">・ブラインド設定</ChakraLink>
                <ChakraLink href="#player-management" color="black">・プレイヤー管理</ChakraLink>
                <ChakraLink href="#prize-pool" color="black">・賞金計算</ChakraLink>
                <ChakraLink href="#display-settings" color="black">・表示設定</ChakraLink>
                <ChakraLink href="#tips" color="black">・トーナメント運営のコツ</ChakraLink>
                <ChakraLink href="#faq" color="black">・よくある質問</ChakraLink>
              </VStack>
            </Box>
          )}

          {/* メインコンテンツ */}
          <Box flex="1">
            <VStack spacing={10} align="stretch" color="black">
              {/* イントロセクション */}
              <Box id="intro" bg="white" p={6} borderRadius="md" boxShadow="sm">
                <Heading as="h2" size="xl" mb={4} color="blue.700">
                  ポーカーブラインドタイマーの使い方
                </Heading>
                <Text fontSize="lg" mb={4}>
                  当タイマーは、ポーカートーナメント運営に必要なすべての機能を備えた高機能タイマーです。
                  ブラインド管理、プレイヤー管理、賞金計算など、トーナメントの運営に必要な機能を全て搭載しています。
                </Text>
                <Text fontSize="md" mb={4}>
                  このガイドでは、各機能の使い方を詳しく解説します。運営者もプレイヤーも快適なトーナメント体験のために、ぜひご活用ください。
                </Text>
                <Box bg="blue.50" p={4} borderRadius="md" mb={4}>
                  <Heading as="h3" size="md" mb={2} color="blue.700">
                    はじめて使う方へ
                  </Heading>
                  <Text mb={2}>
                    初めてポーカーブラインドタイマーをご利用の方は、以下の簡単なステップで始めることができます：
                  </Text>
                  <UnorderedList spacing={1} mb={2}>
                    <ListItem>右上の「タイマーを使う」ボタンをクリックしてタイマー画面に移動します</ListItem>
                    <ListItem>「設定」ボタンから「設定ウィザード」を選択して基本設定を行います</ListItem>
                    <ListItem>参加人数、チップ量、希望するトーナメント時間を入力するだけで準備完了です</ListItem>
                    <ListItem>「タイマースタート」ボタンを押すとトーナメントが開始します</ListItem>
                  </UnorderedList>
                  <Text>
                    より詳細な設定やカスタマイズは、このガイドを参考にしながら少しずつ試してみてください。
                  </Text>
                </Box>
                <Box mb={4}>
                  <Heading as="h3" size="md" mb={2} color="blue.700">
                    主な機能一覧
                  </Heading>
                  <Flex wrap="wrap" gap={4}>
                    <Box bg="gray.50" p={3} borderRadius="md" flex="1" minW="200px">
                      <Text fontWeight="bold" color="blue.700" mb={1}>精密なタイマー</Text>
                      <Text fontSize="sm">ブラインドレベルごとの時間管理と自動レベルアップ</Text>
                    </Box>
                    <Box bg="gray.50" p={3} borderRadius="md" flex="1" minW="200px">
                      <Text fontWeight="bold" color="blue.700" mb={1}>カスタム構造設定</Text>
                      <Text fontSize="sm">オリジナルのブラインド構造やブレイクの設定</Text>
                    </Box>
                    <Box bg="gray.50" p={3} borderRadius="md" flex="1" minW="200px">
                      <Text fontWeight="bold" color="blue.700" mb={1}>プレイヤー管理</Text>
                      <Text fontSize="sm">参加者数、脱落者数、平均スタックのリアルタイム表示</Text>
                    </Box>
                    <Box bg="gray.50" p={3} borderRadius="md" flex="1" minW="200px">
                      <Text fontWeight="bold" color="blue.700" mb={1}>賞金計算</Text>
                      <Text fontSize="sm">バイイン額と参加者数から賞金配分を自動計算</Text>
                    </Box>
                    <Box bg="gray.50" p={3} borderRadius="md" flex="1" minW="200px">
                      <Text fontWeight="bold" color="blue.700" mb={1}>テーブル管理</Text>
                      <Text fontSize="sm">複数テーブルのバランス調整と統合タイミングの管理</Text>
                    </Box>
                    <Box bg="gray.50" p={3} borderRadius="md" flex="1" minW="200px">
                      <Text fontWeight="bold" color="blue.700" mb={1}>カスタマイズ</Text>
                      <Text fontSize="sm">表示色やサイズ、背景画像などの見た目の調整</Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>

              {/* ブラインド設定セクション */}
              <Box id="blind-settings" bg="white" p={6} borderRadius="md" boxShadow="sm">
                <Heading as="h2" size="lg" mb={4} color="blue.700">
                  ブラインド設定
                </Heading>
                <Text mb={4}>
                  ブラインド設定では、トーナメントの進行に合わせてブラインド（強制ベット）の金額とタイミングを設定できます。
                </Text>
                <UnorderedList spacing={2} mb={4}>
                  <ListItem>
                    <Text fontWeight="bold">ブラインドレベルの追加・削除</Text>
                    <Text>設定ボタンからブラインドレベルを簡単に追加・削除できます。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">時間の調整</Text>
                    <Text>各レベルの持続時間を調整できます。一般的には15〜20分がおすすめです。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">ブレイクの設定</Text>
                    <Text>長時間のトーナメントでは定期的なブレイク（休憩）を挟むことができます。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">アンティの設定</Text>
                    <Text>後半戦ではアンティ（全員が出す強制ベット）を設定して、ゲームをよりアクティブにできます。</Text>
                  </ListItem>
                </UnorderedList>
                <Text>
                  適切なブラインド構造は、トーナメントの長さと盛り上がりに大きく影響します。参加人数や希望するトーナメント時間に合わせて調整しましょう。
                </Text>
              </Box>

              {/* プレイヤー管理セクション */}
              <Box id="player-management" bg="white" p={6} borderRadius="md" boxShadow="sm">
                <Heading as="h2" size="lg" mb={4} color="blue.700">
                  プレイヤー管理
                </Heading>
                <Text mb={4}>
                  プレイヤー管理機能では、参加者数、脱落者数、リバイ（再購入）数を管理できます。
                </Text>
                <UnorderedList spacing={2} mb={4}>
                  <ListItem>
                    <Text fontWeight="bold">初期プレイヤー設定</Text>
                    <Text>トーナメント開始時の参加人数と各プレイヤーの初期スタック（チップ数）を設定します。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">リバイとアドオン</Text>
                    <Text>リバイ（再購入）やアドオン（追加購入）の回数を記録できます。これは賞金プールの計算に反映されます。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">プレイヤー脱落管理</Text>
                    <Text>脱落したプレイヤーを記録することで、現在のプレイヤー数と平均スタックを自動計算します。</Text>
                  </ListItem>
                </UnorderedList>
                <Text>
                  正確なプレイヤー情報の管理により、トーナメントの進行状況を一目で把握できます。また、これらのデータは賞金計算にも使用されます。
                </Text>
              </Box>

              {/* 賞金計算セクション */}
              <Box id="prize-pool" bg="white" p={6} borderRadius="md" boxShadow="sm">
                <Heading as="h2" size="lg" mb={4} color="blue.700">
                  賞金計算
                </Heading>
                <Text mb={4}>
                  賞金計算機能では、バイイン金額とプレイヤー数から自動的に賞金プールと配分を計算します。
                </Text>
                <UnorderedList spacing={2} mb={4}>
                  <ListItem>
                    <Text fontWeight="bold">バイイン設定</Text>
                    <Text>トーナメントのバイイン（参加費）を設定します。例：1,000円</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">賞金配分の調整</Text>
                    <Text>デフォルトの賞金配分を変更できます。例えば、上位3名への配分を50%、30%、20%などに設定できます。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">自動計算</Text>
                    <Text>プレイヤー数、リバイ数、バイイン額から総賞金プールが自動計算されます。</Text>
                  </ListItem>
                </UnorderedList>
                <Text>
                  透明性のある賞金計算により、プレイヤーに公平な配分を示すことができます。
                </Text>
              </Box>

              {/* 表示設定セクション */}
              <Box id="display-settings" bg="white" p={6} borderRadius="md" boxShadow="sm">
                <Heading as="h2" size="lg" mb={4} color="blue.700">
                  表示設定
                </Heading>
                <Text mb={4}>
                  表示設定では、タイマーの見た目をカスタマイズして、あなたのトーナメントスタイルに合わせることができます。
                </Text>
                <UnorderedList spacing={2} mb={4}>
                  <ListItem>
                    <Text fontWeight="bold">背景色と文字色</Text>
                    <Text>タイマーの背景色と文字色を変更して、視認性を高めたり、雰囲気を変えたりできます。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">トーナメント名</Text>
                    <Text>トーナメント名を設定して、画面上部に表示させることができます。</Text>
                  </ListItem>
                </UnorderedList>
                <Text>
                  オリジナルの見た目にカスタマイズすることで、プレイヤーへの印象も向上します。特に定期開催のトーナメントでは、独自のブランディングに役立ちます。
                </Text>
              </Box>

              {/* トーナメント運営のコツセクション */}
              <Box id="tips" bg="white" p={6} borderRadius="md" boxShadow="sm">
                <Heading as="h2" size="lg" mb={4} color="blue.700">
                  トーナメント運営のコツ
                </Heading>
                <Text mb={4}>
                  ブラインドタイマーを使いこなすだけでなく、スムーズなトーナメント運営のためのヒントをご紹介します。
                </Text>
                <UnorderedList spacing={2} mb={4}>
                  <ListItem>
                    <Text fontWeight="bold">事前準備</Text>
                    <Text>トーナメント開始前に全ての設定を済ませておくことで、運営に専念できます。特に参加者が多い場合は、受付時間を十分に確保し、スタート時間の15分前には全ての準備を完了させることをおすすめします。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">適切なブラインド構造</Text>
                    <Text>参加人数が多い場合は、ブラインドの上昇を緩やかに設定しましょう。少人数の場合は、比較的速いペースがおすすめです。初期スタックの20〜25倍がレベル1のビッグブラインドの目安となります。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">ブレイクの活用</Text>
                    <Text>2時間以上のトーナメントでは、定期的なブレイク（休憩）を設けることでプレイヤーの集中力維持につながります。通常は2時間ごとに15〜20分のブレイクが理想的です。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">アナウンス</Text>
                    <Text>ブラインドが上がる1分前には声をかけると、プレイヤーが心の準備ができます。また、現在のブラインドレベルと次のレベルの情報も定期的にアナウンスすると親切です。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">テーブルバランス</Text>
                    <Text>複数テーブルでのトーナメントでは、各テーブルのプレイヤー数が均等になるよう調整します。プレイヤーが脱落するたびにテーブルバランスを確認し、必要に応じてプレイヤーの移動を指示しましょう。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">リバイとアドオンの管理</Text>
                    <Text>リバイ（再購入）やアドオン（追加購入）を受け付ける場合は、その期限を明確に設定し、事前にアナウンスしておきましょう。通常はブレイク終了時や特定のブラインドレベルまでと設定します。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">ファイナルテーブルの演出</Text>
                    <Text>最終テーブル（ファイナルテーブル）に残ったプレイヤーが決まったら、テーブルの配置や照明を調整して特別感を演出すると良いでしょう。また、観戦者が見やすいよう大画面表示モードを活用することをおすすめします。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">賞金の準備</Text>
                    <Text>入賞プレイヤーが確定し始めたら、事前に賞金の準備を始めておくと、トーナメント終了後の支払いがスムーズになります。賞金額と受取人の記録も忘れずに行いましょう。</Text>
                  </ListItem>
                  <ListItem>
                    <Text fontWeight="bold">記録の保存</Text>
                    <Text>トーナメント終了後は、参加者数、賞金額、かかった時間などの情報を記録しておくと、次回のトーナメント設計に役立ちます。当アプリでは「トーナメント履歴」機能を使って自動的に記録を保存できます。</Text>
                  </ListItem>
                </UnorderedList>
                <Box bg="yellow.50" p={4} borderRadius="md">
                  <Heading as="h3" size="sm" mb={2} color="orange.600">
                    プロからのアドバイス
                  </Heading>
                  <Text>
                    「成功するトーナメントの鍵は、ブラインド構造とプレイヤー体験のバランスです。速すぎず遅すぎないペース、適切な休憩、そして何より透明性のある運営が大切です。プレイヤーが楽しめる環境作りを最優先に考えましょう。」
                  </Text>
                </Box>
                <Text mt={4}>
                  プレイヤーが快適に過ごせるよう配慮することで、リピーターも増え、トーナメントの質が向上します。
                </Text>
              </Box>

              {/* FAQセクション */}
              <Box id="faq" bg="white" p={6} borderRadius="md" boxShadow="sm">
                <Heading as="h2" size="lg" mb={4} color="blue.700">
                  よくある質問
                </Heading>
                <Accordion allowMultiple>
                  <AccordionItem>
                    <h3>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" fontWeight="medium">
                          タイマーを一時停止できますか？
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4}>
                      はい、タイマー画面の一時停止ボタンを押すことで、いつでもタイマーを一時停止できます。緊急事態やトラブル発生時に便利です。
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h3>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" fontWeight="medium">
                          データは保存されますか？
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4}>
                      はい、設定したデータはブラウザのローカルストレージに自動保存されます。ブラウザを閉じて再度開いても、設定は保持されます。ただし、別のデバイスやブラウザでは設定は共有されません。
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h3>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" fontWeight="medium">
                          モバイルデバイスでも使えますか？
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4}>
                      はい、レスポンシブデザインのため、スマートフォンやタブレットなど、あらゆるデバイスで快適に使用できます。画面サイズに合わせて最適なレイアウトで表示されます。
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h3>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" fontWeight="medium">
                          ブラインド設定のおすすめはありますか？
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4}>
                      一般的には、各レベル15〜20分、ブラインドは前のレベルの1.5〜2倍に設定することをおすすめします。参加人数が多い場合はより緩やかに、少人数の場合はやや急な上昇カーブがゲームを活性化させます。
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h3>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" fontWeight="medium">
                          音声アラートはありますか？
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4}>
                      はい、ブラインドレベルが変わる際や残り時間が少なくなった時に音声アラートが鳴ります。設定メニューから音量調整や無効化も可能です。
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h3>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" fontWeight="medium">
                          初めて使う場合のおすすめ設定は？
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4}>
                      初めての方には「設定ウィザード」機能の利用をおすすめします。参加人数、希望するトーナメント時間、チップ量などの基本情報を入力するだけで、最適なブラインド構造が自動的に設定されます。その後、必要に応じて細かい調整が可能です。
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h3>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" fontWeight="medium">
                          複数のテーブルを管理できますか？
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4}>
                      はい、複数テーブル管理機能を使えば、各テーブルのプレイヤー数やチップ平均を個別に追跡できます。メインタイマーは共通ですが、テーブルバランスの管理やテーブル統合の判断に役立ちます。テーブル管理タブから設定できます。
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h3>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" fontWeight="medium">
                          アプリをオフラインで使用できますか？
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4}>
                      はい、当アプリはPWA（Progressive Web App）として設計されており、一度読み込むとインターネット接続がなくてもオフラインで使用できます。特に通信環境が安定しない会場でのトーナメント運営に便利です。
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h3>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" fontWeight="medium">
                          大画面表示モードはありますか？
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4}>
                      はい、設定メニューから「大画面表示モード」を選択すると、タイマーと現在のブラインド情報が大きく表示されます。これは外部モニターやプロジェクターに接続して全プレイヤーに見やすく表示する際に最適です。F11キーを押してブラウザをフルスクリーンにすると、さらに見やすくなります。
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>

              {/* CTA セクション */}
              <Box bg="blue.50" color="black" p={6} borderRadius="md" boxShadow="md">
                <VStack spacing={4}>
                  <Heading as="h2" size="lg">
                    さっそくタイマーを使ってみませんか？
                  </Heading>
                  <Text>
                    このガイドを参考に、あなただけのポーカートーナメントを開催しましょう。
                  </Text>
                  <Link href="/timer" passHref legacyBehavior>
                    <Button as="a" size="lg" colorScheme="yellow" rightIcon={<ChevronRightIcon />}>
                      タイマーを起動する
                    </Button>
                  </Link>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default GuidePage; 