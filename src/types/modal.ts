import type { ReactNode } from 'react'
import { ModalName } from '@/constants'

export type ModalContent = ReactNode | ModalName

export interface Modal {
  vid: string
  visible: boolean
  className?: string
  allowEscape?: boolean
  content: ModalContent | null
}

export interface ModalOptions extends Pick<Modal, 'className' | 'allowEscape'> {}
