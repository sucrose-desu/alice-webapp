export * as configs from './configs'
export { Fruit } from './fruit'

export enum Theme {
  DEFAULT = 'default',
  LIGHT = 'light',
  DARK = 'dark'
}

export enum AccountRole {
  ROOT = 'ROOT',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  USER = 'USER',
  GUEST = 'GUEST'
}

export enum AccountProvider {
  EMAIL = 'EMAIL'
}

export enum AlbumCategory {
  ANIME = 'ANIME',
  CINEMA = 'CINEMA',
  MOVIE = 'MOVIE',
  UNKNOWN = 'UNKNOWN'
}

export enum WatchStatus {
  NEW = 'NEW'
}

export enum ThrowErrs {
  AUTH_FAILED = 'ERR:AUTH_IS_INCORRECT',
  ACCOUNT_404 = 'ERR:ACCOUNT_NOT_FOUND',
  SUSPENDED = 'ERR:ACCOUNT_SUSPENDED'
}
