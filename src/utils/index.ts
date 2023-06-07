import { dialog } from './dialog'
import { modal } from './modal'
import { notice } from './notice'

export { cookie, session, storage } from './storage'

export class utils {
  static readonly alert = dialog
  static readonly modal = modal
  static readonly notice = notice
}

export function isIE(): boolean {
  return new RegExp('MSIE|Trident').test(navigator.userAgent)
}

export function generateId(radix: number = 16) {
  return Math.random().toString(radix).slice(2)
}

/**
 * Hidden overflow scroll.
 *
 * @param boolean - input
 */
export function scrollOff(input: boolean = true) {
  document.body.style.overflowY = input ? 'hidden' : 'auto'
}
