import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://poker-blind-timer-ex.com'),
  title: 'Poker Blind Timer EX | 本格的トーナメント用タイマー',
  description: 'ポーカートーナメント運営に最適な高機能タイマー。ブラインド管理、プレイヤー管理も可能。',
  keywords: 'ポーカー,トーナメント,タイマー,ブラインド,poker,tournament,timer',
  openGraph: {
    title: 'Poker Blind Timer EX | 本格的トーナメント用タイマー',
    description: 'ポーカートーナメント運営に最適な高機能タイマー。ブラインド管理、プレイヤー管理も可能。',
    url: 'https://poker-blind-timer-ex.com',
    siteName: 'Poker Blind Timer EX',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/images/screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Poker Blind Timer EX - 本格的トーナメント用タイマー',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poker Blind Timer EX | 本格的トーナメント用タイマー',
    description: 'ポーカートーナメント運営に最適な高機能タイマー。ブラインド管理、プレイヤー管理も可能。',
    images: ['/images/screenshot.png'],
  },
  other: {
    'google-adsense-account': 'ca-pub-4037508705654510',
  },
}
    
interface RootLayoutProps {
  children: React.ReactNode
}   

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4037508705654510" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L357LPKMGF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L357LPKMGF');
          `}
        </Script>
      </body>
    </html>
  )
}
