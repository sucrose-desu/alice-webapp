import { UserRole } from '@/constants'

export type { Dialog, DialogContent, DialogOptions, DialogResults } from './dialog'
export type { Modal, ModalContent, ModalOptions } from './modal'
export type { Notice, NoticeContent, NoticeOptions, NoticeTypes } from './notice'

export interface IMedia {
  url: string
  isImage?: boolean
  isVideo?: boolean
  isAudio?: boolean
}

export interface User {
  id: number
  role: UserRole
  displayName: string
  avatar: string
  email: string
  bio?: string
}

export interface FormLogin {
  username: string
  password: string
  keepLoggedIn?: boolean
}
