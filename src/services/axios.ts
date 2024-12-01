import axios, { AxiosHeaders, AxiosInstance } from 'axios'

import { configs, headers } from '@/constants'
import { cookie } from '@/utils/storage'

/**
 * Create axios instance.
 */
const Axios: AxiosInstance = axios.create({
  baseURL: `${configs.isBrowser ? location.origin : configs.API_GATEWAY}/services`,
  headers: {
    ...(headers as AxiosHeaders),
    'X-Secret-Auth': configs.API_SECRET_KEY,
    'Access-Control-Allow-Origin': configs.isBrowser ? location.origin : '*'
  }
})

/**
 * Axios also provides a request interceptor, allows changes to the request data before it is sent to the server
 * This is only applicable for request methods 'POST', 'PATCH' and 'DELETE'
 * The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
 * FormData or Stream
 * You may modify the headers object.
 */
Axios.interceptors.request.use((reqConfig) => {
  if (reqConfig.headers) {
    const accessToken = cookie.get(configs.APP_AUTH_ACCESS)
    if (accessToken) {
      reqConfig.headers.set('Authorization', `Bearer ${accessToken}`)
    }

    const language = cookie.get(configs.APP_LANG)
    if (language) {
      reqConfig.headers.set(configs.CONTENT_LANG, language)
    }
  }

  return reqConfig
})

export default Axios
export const { CancelToken } = axios
