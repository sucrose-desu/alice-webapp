import { ZodError } from 'zod'
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

export class ApiResponse {
  static json(data: any, statusCode: number = 200) {
    return Response.json(data, { status: statusCode })
  }

  static message(str: string, statusCode: number = 200) {
    return Response.json(
      {
        statusCode,
        message: str
      },
      {
        status: statusCode
      }
    )
  }

  static catch(error: any, statusCode: number = 422) {
    let message: string | string[] = error?.message || error?.statusText || 'Unknown an error occurred.'

    if (error instanceof ZodError && !error.isEmpty) {
      const { errors: err } = error as ZodError
      message = err.map((r) => `This field "${r.path[0]}": ${r.message.toLowerCase()}`)
    } else {
      if (typeof error === 'string') message = error
      if (error?.status) statusCode = error.status
    }

    console.error(error)

    return Response.json(
      {
        statusCode,
        message
      },
      {
        status: statusCode
      }
    )
  }
}
