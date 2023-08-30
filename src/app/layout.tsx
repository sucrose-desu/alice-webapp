import type { ReactNode } from 'react'

import { ReduxProvider, LayoutContainer } from '@/components'
import '@/styles/fonts.scss'
import '@/styles/main.scss'

type Props = { children: ReactNode }

export { metadata } from '@/constants/metadata'

export default function RootLayout({ children }: Props) {
  // __RENDER
  return (
    <html lang='en-US'>
      <body style={{ backgroundColor: '#000' }}>
        <ReduxProvider>
          <LayoutContainer node={children} />
        </ReduxProvider>
      </body>
    </html>
  )
}
