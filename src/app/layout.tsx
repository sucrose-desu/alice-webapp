import { type ReactNode } from 'react'

import { AppProvider } from '@/components/provider'
import { Locales } from '@/constants'

import '@/styles/main.scss'

type Props = { children: ReactNode }

export { metadata, viewport } from '@/constants/metadata'

export default function RootLayout({ children }: Props) {
  // __RENDER
  return (
    <html lang={Locales.US} style={{ colorScheme: 'dark' }}>
      <head>
        <link
          href='/static/fonts/google-fonts.min.css'
          type='text/css'
          rel='stylesheet'
          crossOrigin='use-credentials'
        />

        <link
          href='/static/fonts/bootstrap-icons.min.css'
          type='text/css'
          rel='stylesheet'
          crossOrigin='use-credentials'
        />
      </head>

      <body
        className='overflow-x-hidden text-sm'
        style={{ backgroundColor: '#040404', textRendering: 'optimizeLegibility' }}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
