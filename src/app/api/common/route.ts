import { type NextRequest } from 'next/server'
import { ApiResponse } from '@/services/catch'
import { queryString } from '@/utils'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const result = queryString.toJSON(request.nextUrl.searchParams)
    return ApiResponse.json(result)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
