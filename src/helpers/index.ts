import { decodeJwt } from 'jose'

export async function getAuthorize(headers: Headers) {
  const authorization = headers.get('Authorization')

  if (authorization) {
    const accessToken = authorization.replace('Bearer', '').trim()
    const payload = decodeJwt(accessToken)

    return {
      uid: payload.sub!,
      email: payload.email
    }
  }

  return void 0
}
