import { notice } from '@/components/addons'

export function tryCatch(message: string, error: any) {
  console.error(message, error)

  if (error?.response?.data) {
    let { status: statusCode, statusText } = error.response
    let content = error.response.data?.message || 'Unknown an error occurred.'

    if (content instanceof Array) {
      content = content.map((r) => `<p>- ${r}</p>`).join('')
    }

    notice.error(content, { title: `${statusCode}: ${statusText}`, duration: 6 })
  } else {
    notice.error(error.message, { title: error.code, duration: 6 })
  }
}
