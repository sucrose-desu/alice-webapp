import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'

import { ApiResponse } from '@/services/server'
import { useAuthGuard } from '@/services/server/auth'
import { queryString } from '@/utils'

export async function GET(request: NextRequest) {
  const searchParams = queryString.toJSON(request.nextUrl.searchParams)

  try {
    const auth = useAuthGuard(headers())

    return ApiResponse.json(searchParams)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (file) console.log(file)

    return ApiResponse.json({
      statusCode: 200,
      message: 'The record has been successfully created.'
    })
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
