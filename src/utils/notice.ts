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
      ...option,
      type: 'info',
      title: '',
      content
    })
  }

  static success(content: NoticeContent, option?: NoticeOptions) {
    return this.on({
      ...option,
      type: 'success',
      title: '',
      content
    })
  }

  static warn(content: NoticeContent, option?: NoticeOptions) {
    return this.on({
      ...option,
      type: 'warn',
      title: '',
      content
    })
  }

  static error(content: NoticeContent, option?: NoticeOptions) {
    return this.on({
      ...option,
      type: 'error',
      title: '',
      content
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
