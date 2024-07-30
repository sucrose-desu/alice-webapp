'use client'

import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import ReduxStore from '@/store'

import { Bootstrap, DialogObserver, LoaderObserver, NoticeObserver, ToastObserver } from './addons'
import { LayoutContainer } from './layout'

type ProviderProps = { children: ReactNode }

export function AppProvider({ children }: ProviderProps) {
  // __RENDER
  return (
    <Provider store={ReduxStore}>
      <Bootstrap />

      <LayoutContainer>{children}</LayoutContainer>

      <LoaderObserver />
      <DialogObserver />
      <NoticeObserver />
      <ToastObserver />
    </Provider>
  )
}
