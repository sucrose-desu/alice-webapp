export class Arrs {
  /**
   * Create array by length.
   *
   * @param {array} payload
   * @param {number} length
   * @param {boolean} shuffle default: true
   */
  static from<P extends Record<string, any>>(payload: P[], length: number, shuffle: boolean = true): P[] {
    let result: P[] = []
    let index = 0

    for (let i = 0; i < length; i++) {
      result = [...result, payload[index]]
      index += 1

      if (index >= payload.length) index = 0
    }

    if (shuffle) {
      return this.shuffle(result)
    }

    return result
  }

  /**
   * Shuffle randomly array.
   *
   * @param {array} payload
   */
  static shuffle<P extends Record<string, any>>(payload: P[]): P[] {
    return payload.sort(() => 0.5 - Math.random())
  }

  static chunk<T>(arr: T[], chunkSize: number): T[][] {
    const result: T[][] = []
    chunkSize = Math.min(arr.length, chunkSize)

    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize))
    }

    return result
  }

  static findOne<P extends Record<string, any>>(payload: P[], prop: keyof P, value: any) {
    return payload.find((record) => record[prop] === value)
  }

  static findAll<P extends Record<string, any>>(payload: P[], prop: keyof P, value: any) {
    return payload.filter((record) => record[prop] === value)
  }

  static remove<P extends Record<string, any>>(payload: P[], prop: keyof P, value: any) {
    return payload.filter((record) => record[prop] !== value)
  }

  static removeDuplicates<P extends Record<string, any>>(payload: P[]): P[] {
    return payload.filter((record, index) => payload.indexOf(record) === index)
  }

  static groupBy<P extends Record<string, any>>(payload: P[], prop: keyof P) {
    return payload.reduce((previousValue: any, currentValue) => {
      previousValue[currentValue[prop]] = [...(previousValue[currentValue[prop]] || []), currentValue]

      return previousValue
    }, {})
  }

  static orderBy<P extends Record<string, any>>(payload: P[], prop: keyof P, type: 'asc' | 'desc' = 'asc') {
    return payload.sort((a, b) => {
      const propA = typeof a[prop] === 'string' ? a[prop].toUpperCase() : a[prop]
      const propB = typeof b[prop] === 'string' ? b[prop].toUpperCase() : b[prop]

      if (propA === propB) {
        return 0
      }

      if (type === 'asc') {
        return propA < propB ? -1 : 1
      } else {
        return propA > propB ? -1 : 1
      }
    })
  }
}
