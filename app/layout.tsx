import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Якутск: сквозь века',
  description: 'Интерактивное путешествие по истории Якутска от Ленского острога до современной IT-среды.',
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preload" href="/images/intro-compressed.mp4" as="video" type="video/mp4" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
