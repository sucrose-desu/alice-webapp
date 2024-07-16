'use client'

import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import ReduxStore from '@/store'

import Bootstrap from './addon/bootstrap'
import { DialogObserver } from './addon/dialog'
import { LoaderObserver } from './addon/loader'
import { NoticeObserver } from './addon/notice'
import { LayoutContainer } from './layout'

type ProviderProps = { children: ReactNode }

export function AppProvider({ children }: ProviderProps) {
  // __RENDER
  return (
    <Provider store={ReduxStore}>
      <Bootstrap />
      <LoaderObserver />

      <LayoutContainer>{children}</LayoutContainer>

      <DialogObserver />
      <NoticeObserver />
    </Provider>
  )
}
