'use client'

import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import ReduxStore from '@/store'

type ProviderProps = { children: ReactNode }

export function ReduxProvider({ children }: ProviderProps) {
  // __RENDER
  return <Provider store={ReduxStore}>{children}</Provider>
}
