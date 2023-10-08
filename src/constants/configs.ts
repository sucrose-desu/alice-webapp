export const APP_MODE = process.env.NODE_ENV
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'project_alice'
export const APP_WEB_TITLE = process.env.NEXT_PUBLIC_WEB_TITLE || 'ALICIZATION'
export const APP_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8443'
export const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY || 'AP1-S3C23T-K3Y'
export const API_GATEWAY = process.env.NEXT_PUBLIC_API_GATEWAY || 'http://localhost:3030'
export const WS_GATEWAY = process.env.WS_GATEWAY || 'ws://127.0.0.1:5050'

export const isBrowser = typeof window !== 'undefined'
export const isProduction = APP_MODE === 'production'
export const isDevelop = APP_MODE === 'development'

// STORAGE KEY-NAME
export const APP_LANG = '__APP.Language.' + APP_NAME
export const APP_THEME = '__APP.Theme.' + APP_NAME
export const APP_AUTH_ACCESS = '__APP.AccessToken.' + APP_NAME
export const APP_AUTH_REFRESH = '__APP.RefreshKey.' + APP_NAME
export const APP_USER_INFO = '__APP.UserInfo.' + APP_NAME

// REQUEST HEADERS
export const AUTHORIZATION = 'Authorization'
export const ACCEPT_RANGES = 'Accept-Ranges'
export const CONTENT_RANGE = 'Content-Range'
export const CONTENT_TYPE = 'Content-Type'
export const CONTENT_LENGTH = 'Content-Length'
export const CONTENT_LANG = 'Content-Language'
