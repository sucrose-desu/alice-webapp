export type { Dialog, DialogContent, DialogOptions, DialogResults } from './dialog'
export type { Modal, ModalContent, ModalOptions } from './modal'
export type { Notice, NoticeContent, NoticeOptions, NoticeTypes } from './notice'

export interface IMedia {
  url: string
  isImage?: boolean
  isVideo?: boolean
  isAudio?: boolean
}
