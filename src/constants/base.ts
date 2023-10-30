export class BaseConstant<E extends Record<number, string>, T extends Record<keyof E | number | string, string>> {
  public readonly ENUM: E
  public readonly TEXT: T

  constructor(_enum: E, _text: T) {
    this.ENUM = _enum
    this.TEXT = _text
  }

  public getOne(key: keyof T): string | undefined {
    return this.TEXT[key]
  }

  public getAll(...keys: (keyof T)[]): (string | undefined)[] {
    return keys.map((key) => this.getOne(key))
  }

  public getList() {
    return Object.keys(this.TEXT).map((key) => ({
      label: this.TEXT[key],
      value: Number(key)
    }))
  }
}
