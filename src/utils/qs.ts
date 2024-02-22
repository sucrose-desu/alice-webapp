import qs, { type IParseOptions } from 'qs'

export class queryString {
  static toJSON(searchParams: URLSearchParams | string, options?: IParseOptions) {
    const searchString: string[] = []

    for (const [key, value] of searchParams) {
      searchString.push(`${key}=${value}`)
    }

    return qs.parse(searchString.join('&'), {
      ...options,
      allowDots: true,
      comma: true,
      ignoreQueryPrefix: true
    })
  }
}
