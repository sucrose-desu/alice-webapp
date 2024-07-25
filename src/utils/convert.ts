export class base16 {
  static toHex(str: string) {
    return Buffer.from(str, 'utf8').toString('hex')
  }

  static toString(str: string) {
    return Buffer.from(str, 'hex').toString('utf8')
  }
}
