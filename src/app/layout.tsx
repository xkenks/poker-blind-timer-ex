import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'
import Script from 'next/script'
import React from 'react'

export const metadata: Metadata = {
  metadataBase: new URL('https://poker-blind-timer-ex.com'),
  title: 'Poker Blind Timer EX | 本格的トーナメント用タイマー',
  description: 'ポーカートーナメント運営に最適な高機能タイマー。ブラインド管理、プレイヤー管理も可能。',
  keywords: 'ポーカー,トーナメント,タイマー,ブラインド,poker,tournament,timer',
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/images/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Poker Blind Timer EX | 本格的トーナメント用タイマー',
    description: 'ポーカートーナメント運営に最適な高機能タイマー。ブラインド管理、プレイヤー管理も可能。',
    url: 'https://poker-blind-timer-ex.com',
    siteName: 'Poker Blind Timer EX',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://poker-blind-timer-ex.com/images/screenshot.png',
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
    images: ['https://poker-blind-timer-ex.com/images/screenshot.png'],
  },
  other: {
    'google-adsense-account': 'ca-pub-4037508705654510',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'PokerTimer',
    'theme-color': '#3182CE',
    'application-name': 'Poker Blind Timer EX',
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="PokerTimer" />
        <meta name="theme-color" content="#3182CE" />
        <meta name="application-name" content="Poker Blind Timer EX" />
        
        {/* Favicon - 明示的に追加（Googleなどの検索エンジン対応） */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.ico" sizes="16x16" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Twitter Card 明示的なタグ */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Poker Blind Timer EX | 本格的トーナメント用タイマー" />
        <meta name="twitter:description" content="ポーカートーナメント運営に最適な高機能タイマー。ブラインド管理、プレイヤー管理も可能。" />
        <meta name="twitter:image" content="https://poker-blind-timer-ex.com/images/screenshot.png" />
        
        {/* iPhoneX, iPhone XS */}
        <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="/images/apple-splash-1125x2436.jpg" />
        {/* iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus */}
        <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="/images/apple-splash-1242x2208.jpg" />
        {/* iPhone 8, 7, 6s, 6 */}
        <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="/images/apple-splash-750x1334.jpg" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
        <Script
          strategy="afterInteractive"
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','G-L357LPKMGF');
            
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L357LPKMGF');
          `}
        </Script>
        <Script id="service-worker" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  console.log('ServiceWorker登録成功: ', registration.scope);
                }, function(err) {
                  console.log('ServiceWorker登録失敗: ', err);
                });
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
