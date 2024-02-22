export class Hexadecimal {
  /**
   * @param payload String
   * @returns Base16
   */
  static encode(payload: string) {
    let hex = ''

    for (let i = 0; i < payload.length; i++) {
      const charCode = payload.charCodeAt(i)
      const hexValue = charCode.toString(16)

      // Pad with zeros to ensure two-digit representation
      hex += hexValue.padStart(2, '0')
    }

    return hex
  }

  /**
   * @param payload Base16
   * @returns String
   */
  static decode(payload: string) {
    let str = ''

    for (let i = 0; i < payload.length; i += 2) {
      const hexValue = payload.substring(i, 2)
      const decimalValue = parseInt(hexValue, 16)

      str += String.fromCharCode(decimalValue)
    }

    return str
  }
}
