import qs, { type IParseOptions } from 'qs'

export class queryString {
  static toJSON(searchParams: string, options?: IParseOptions) {
    return qs.parse(searchParams, {
      ...options,
      allowDots: true,
      comma: true,
      ignoreQueryPrefix: true
    })
  }
}
