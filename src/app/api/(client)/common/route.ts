import { type NextRequest } from 'next/server'

import { ApiResponse } from '@/services/server'
import { queryString } from '@/utils/qs'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = queryString.toJSON(request.nextUrl.search)

  try {
    return ApiResponse.json(searchParams)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
