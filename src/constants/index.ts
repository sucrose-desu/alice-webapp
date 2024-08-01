export * as configs from './configs'
export { Fruit } from './fruit'

export enum Theme {
  DEFAULT = 'default',
  LIGHT = 'light',
  DARK = 'dark'
}

export enum Locales {
  CN = 'zh-CN',
  JP = 'ja-JP',
  KR = 'ko-KR',
  TH = 'th-TH',
  US = 'en-US',
  UK = 'en-UK'
}

export enum AccountRole {
  ROOT = 'ROOT',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  USER = 'USER',
  GUEST = 'GUEST'
}

export enum AccountProvider {
  DISCORD = 'DISCORD',
  EMAIL = 'EMAIL',
  GITHUB = 'GITHUB',
  GOOGLE = 'GOOGLE',
  TWITTER = 'TWITTER'
}

export enum GenreGroup {
  CLASSIFIED = 0,
  GENERAL = 1
}

export enum AlbumCategory {
  ANIME = 'ANIME',
  CINEMA = 'CINEMA',
  MOVIE = 'MOVIE',
  UNKNOWN = 'UNKNOWN'
}

export enum AlbumDubbed {
  CHINESE = 'CHINESE',
  ENGLISH = 'ENGLISH',
  JAPAN = 'JAPAN',
  KOREA = 'KOREA',
  THAI = 'THAI'
}

export enum AlbumSource {
  GAME = 'GAME',
  MANGA = 'MANGA',
  NOVEL = 'LIGHT-NOVEL',
  ORIGINAL = 'ORIGINAL',
  OTHER = 'OTHER',
  WEBMANGA = 'WEB-MANGA'
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
