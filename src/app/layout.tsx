import type { ReactNode } from 'react'

import { AppProvider } from '@/components/provider'
import '@/styles/fonts.scss'
import '@/styles/main.scss'

type Props = { children: ReactNode }

export { metadata, viewport } from '@/constants/metadata'

export default function RootLayout({ children }: Props) {
  // __RENDER
  return (
    <html lang='en-US' style={{ colorScheme: 'dark' }}>
      <body
        className='overflow-x-hidden text-sm'
        style={{ backgroundColor: '#000', textRendering: 'optimizeLegibility' }}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
