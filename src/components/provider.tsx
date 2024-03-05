'use client'

import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import ReduxStore from '@/store'

import Bootstrap from './addon/bootstrap'
import Loader from './addon/loader'
import Modal from './addon/modal'
import Notice from './addon/notice'
import { LayoutContainer } from './layout'

type ProviderProps = { children: ReactNode }

export function AppProvider({ children }: ProviderProps) {
  // __RENDER
  return (
    <Provider store={ReduxStore}>
      <Bootstrap />

      <LayoutContainer node={children} />

      <Loader />
      <Modal />
      <Notice />
    </Provider>
  )
}
