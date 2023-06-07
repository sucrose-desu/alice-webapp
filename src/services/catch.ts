import { notice } from '@/utils'

export function tryCatch(message: string, error: any) {
  console.error(message, error)

  if (error?.response?.data) {
    let { statusCode, error: title, message: content } = error.response.data

    if (content instanceof Array) {
      content = content.map((r) => `<p>- ${r}</p>`).join('')
    } else {
      content = `<p>- ${content}</p>`
    }

    notice.error({ title: `${statusCode}: ${title}`, content, duration: 6e3 })
  } else {
    notice.error({ title: error.code, content: error.message, duration: 6e3 })
  }
}
