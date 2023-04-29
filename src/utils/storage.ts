import JSCookies, { CookieAttributes } from 'js-cookie'

/**
 * Cookies Manager.
 */
export class cookie {
  static get<R = any>(keyName: string, json?: 0 | 1): R | void {
    const results = JSCookies.get(keyName)
    return json && results ? JSON.parse(results) : results
  }

  static set(keyName: string, value: string | object, options?: CookieAttributes) {
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }

    return JSCookies.set(keyName, value, this.attrs(options))
  }

  static remove(keyName: string, options?: CookieAttributes) {
    return JSCookies.remove(keyName, this.attrs(options))
  }

  static attrs(options?: CookieAttributes): CookieAttributes {
    return {
      domain: location.hostname,
      sameSite: 'strict',
      secure: true,
      ...options
    }
  }
}

/**
 * Local Storege Manager.
 */
export class storage {
  static get<R = any>(keyName: string, json?: 0 | 1): R | null | void {
    const results = localStorage.getItem(keyName)
    return json && results ? JSON.parse(results) : results
  }

  static set(keyName: string, value: string | object) {
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }

    localStorage.setItem(keyName, value)
  }

  static remove(keyName: string) {
    localStorage.removeItem(keyName)
  }
}

/**
 * Session Storege Manager.
 */
export class session {
  static get<R = any>(keyName: string, json?: 0 | 1): R | null | void {
    const results = sessionStorage.getItem(keyName)
    return json && results ? JSON.parse(results) : results
  }

  static set(keyName: string, value: string | object) {
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }

    sessionStorage.setItem(keyName, value)
  }

  static remove(keyName: string) {
    sessionStorage.removeItem(keyName)
  }
}
