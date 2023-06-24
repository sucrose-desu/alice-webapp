import { addSeconds } from 'date-fns'
import { dispatch } from '@/store'
import { setNotice } from '@/store/app.store'
import type { Notice, NoticeContent, NoticeOptions } from '@/types'

export class notice {
  static on(option: Notice) {
    const name = option.name || Math.random().toString(16).slice(2)
    const title = option.title || "Notification's"
    const duration = option.duration !== 0 ? +addSeconds(Date.now(), option.duration || 3) : undefined

    dispatch(
      setNotice({
        ...option,
        visible: true,
        name,
        title,
        duration
      })
    )

    return name
  }

  static info(content: NoticeContent, option?: NoticeOptions) {
    return this.on({
      type: 'info',
      title: '',
      content,
      ...option
    })
  }

  static success(content: NoticeContent, option?: NoticeOptions) {
    return this.on({
      type: 'success',
      title: '',
      content,
      ...option
    })
  }

  static warn(content: NoticeContent, option?: NoticeOptions) {
    return this.on({
      type: 'warn',
      title: '',
      content,
      ...option
    })
  }

  static error(content: NoticeContent, option?: NoticeOptions) {
    return this.on({
      type: 'error',
      title: '',
      content,
      ...option
    })
  }

  static close(name: string) {
    const payload = setNotice({
      name: `rm:${name}`,
      type: 'info',
      title: '',
      content: null,
      visible: false
    })

    dispatch(payload)
  }

  static clear() {}
}
