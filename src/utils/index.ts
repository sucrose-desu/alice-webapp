export { queryString } from './qs'

export function isIE() {
  return new RegExp('MSIE|Trident').test(navigator.userAgent)
}

export function generateId(radix: number = 16) {
  return Math.random().toString(radix).slice(2)
}

export function scrollOff(input: boolean = true) {
  document.body.style.overflowY = input ? 'hidden' : 'auto'
}

export function toCapitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

export function dateToSeconds(date: Date) {
  return (+date - Date.now()) / 1e3
}

/**
 * Provides a way to easily construct a set of key/value pairs representing form fields and their values,
 * which can then be easily sent using the XMLHttpRequest.send() method.
 *
 * @param {object} data FormData
 */
export function createFormData(data: Record<string, any>): [FormData, any] {
  const formData = new FormData()

  for (const name in data) {
    formData.append(name, data[name])
  }

  return [
    formData,
    {
      'Content-Type': 'multipart/form-data'
    }
  ]
}

/**
 * Convert long number into abbreviated string.
 *
 * @param {number} input
 * @param {number} fractionDigits Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
 */
export function abbreviateNumber(input: number, fractionDigits: number = 1) {
  const tier = (Math.log10(Math.abs(input)) / 3) | 0

  if (tier === 0) return input.toLocaleString()

  const suffix = ['', 'k', 'M', 'B', 'T', 'P', 'E'][tier]
  const scale = Math.pow(10, tier * 3)

  return (input / scale).toFixed(fractionDigits) + suffix
}
