'use client'

import type { ReactNode } from 'react'
import { Provider } from 'react-redux'

import ReduxStore from '@/store'

import { DialogObserver, LoaderObserver, NoticeObserver, ToastObserver } from './addons'
import { Bootstrap } from './bootstrap'

type ProviderProps = { children: ReactNode }

export function AppProvider({ children }: ProviderProps) {
  // __RENDER
  return (
    <Provider store={ReduxStore}>
      <Bootstrap />

      {children}

      <LoaderObserver />
      <DialogObserver />
      <NoticeObserver />
      <ToastObserver />
    </Provider>
  )
}
