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

export enum GenreGroup {
  GENERAL = 1
}

export enum AlbumCategory {
  ANIME = 'ANIME',
  CINEMA = 'CINEMA',
  MOVIE = 'MOVIE',
  UNKNOWN = 'UNKNOWN'
}

export enum AlbumSource {
  GAME = 'GAME',
  MANGA = 'MANGA',
  NOVEL = 'LIGHT_NOVEL',
  ORIGINAL = 'ORIGINAL',
  OTHER = 'OTHER',
  WEB_MANGA = 'WEB_MANGA'
}

export enum AlbumStatus {
  AIRING = 'AIRING',
  AWAIT = 'AWAITING',
  FINISHED = 'FINISHED'
}

export enum WatchStatus {
  NEW = 'NEW'
}

export enum ThrowErrs {
  AUTH_FAILED = 'ERR:AUTH_IS_INCORRECT',
  ACCOUNT_404 = 'ERR:ACCOUNT_NOT_FOUND',
  SUSPENDED = 'ERR:ACCOUNT_SUSPENDED'
}
