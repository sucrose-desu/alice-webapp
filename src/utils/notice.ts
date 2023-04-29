import { dispatch } from '@/store'
import { setNotice as dispatchNotice } from '@/store/app.store'
import type { Notice, NoticeOptions } from '@/types'

const defaultOptions = { visible: true, duration: 3e3 }

function setNotice(options: Notice) {
  const vid = options.vid || Math.random().toString(16).slice(2)
  dispatch(dispatchNotice({ ...options, vid }))

  return vid
}

export class notice {
  static info(options: NoticeOptions) {
    return setNotice({
      type: 'info',
      ...defaultOptions,
      ...options
    })
  }

  static success(options: NoticeOptions) {
    return setNotice({
      type: 'success',
      ...defaultOptions,
      ...options
    })
  }

  static warn(options: NoticeOptions) {
    return setNotice({
      type: 'warn',
      ...defaultOptions,
      ...options
    })
  }

  static error(options: NoticeOptions) {
    return setNotice({
      type: 'error',
      ...defaultOptions,
      ...options
    })
  }

  static close(vid: string) {
    dispatch(
      dispatchNotice({
        vid: `rm:${vid}`,
        visible: false,
        type: 'success',
        title: '',
        content: null
      })
    )
  }

  static clear() {
    dispatch(dispatchNotice(null))
  }
}
