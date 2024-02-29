import { type NextRequest } from 'next/server'
import { apiTryCatch } from '@/services/catch'
import { queryString } from '@/utils'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const result = queryString.toJSON(request.nextUrl.searchParams)
    return Response.json(result)
  } catch (error) {
    return apiTryCatch(error)
  }
}
