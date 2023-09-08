import { dialog, modal, notice } from './addon'

export class xs {
  static readonly alert = dialog
  static readonly modal = modal
  static readonly notice = notice
}

export function isIE() {
  return new RegExp('MSIE|Trident').test(navigator.userAgent)
}

export function generateId(radix: number = 16) {
  return Math.random().toString(radix).slice(2)
}

export function scrollOff(input: boolean = true) {
  document.body.style.overflowY = input ? 'hidden' : 'auto'
}
