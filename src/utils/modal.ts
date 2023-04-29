import { dispatch } from '@/store'
import { setModal } from '@/store/app.store'
import { generateId } from '@/utils'
import type { ModalContent, ModalOptions } from '@/types'

export class modal {
  /**
   * Open modal
   *
   * @param {ModalContent} content
   * @param {ModalOptions} options
   */
  static on(content: ModalContent, options?: ModalOptions) {
    const vid = options?.className || generateId()
    const action = setModal({
      vid,
      content,
      visible: true,
      className: options?.className,
      allowEscape: options?.allowEscape || true
    })

    dispatch(action)
  }

  /**
   * Close modal by vid
   *
   * @param {string} vid
   */
  static off(vid: string) {
    const action = setModal({
      vid,
      visible: false,
      content: null
    })

    dispatch(action)
  }
}
