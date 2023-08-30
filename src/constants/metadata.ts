import type { Metadata } from 'next'
import { APP_WEB_TITLE } from './configs'

export const metadata: Metadata = {
  title: APP_WEB_TITLE,
  description:
    'Generate Lorem Ipsum placeholder text. Select the number of characters, words, sentences or paragraphs, and hit generate!',
  viewport: { width: 'device-width', initialScale: 1 },
  robots: { index: false, follow: false },
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' }
  ],
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/static/apple-touch-icon.png' }
  ],
  manifest: '/manifest.webmanifest'
}
