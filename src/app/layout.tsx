import type { Metadata, Viewport } from 'next'
import { Providers } from './components/providers'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://poker-blind-timer-ex.com'),
  title: 'Poker Blind Timer EX | 本格的トーナメント用タイマー',
  description: 'ポーカートーナメント運営に最適な高機能タイマー。ブラインド管理、プレイヤー管理、賞金管理など、トーナメントの運営に必要な機能を全て搭載。',
  keywords: 'ポーカー,トーナメント,タイマー,ブラインド,poker,tournament,timer',
  openGraph: {
    title: 'Poker Blind Timer EX | 本格的トーナメント用タイマー',
    description: 'ポーカートーナメント運営に最適な高機能タイマー。ブラインド管理、プレイヤー管理、賞金管理など、トーナメントの運営に必要な機能を全て搭載。',
    url: 'https://poker-blind-timer-ex.com',
    siteName: 'Poker Blind Timer EX',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poker Blind Timer EX | 本格的トーナメント用タイマー',
    description: 'ポーカートーナメント運営に最適な高機能タイマー。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://poker-blind-timer-ex.com',
    languages: {
      'ja-JP': 'https://poker-blind-timer-ex.com',
      'en-US': 'https://poker-blind-timer-ex.com',
    },
  },
  other: {
    'google-site-verification': '', // Googleサーチコンソールの認証コードを追加する場合はここに
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 