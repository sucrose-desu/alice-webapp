import { notice } from '@/utils/addon'

export function tryCatch(message: string, error: any) {
  console.error(message, error)

  if (error?.response?.data) {
    let { status: statusCode, statusText } = error.response
    let content = error.response.data.message

    if (content instanceof Array) {
      content = content.map((r) => `<p>- ${r}</p>`).join('')
    } else {
      content = `<p>- ${content}</p>`
    }

    notice.error(content, { title: `${statusCode}: ${statusText}`, duration: 600 })
  } else {
    notice.error(error.message, { title: error.code, duration: 6 })
  }
}
