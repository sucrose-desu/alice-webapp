import { type NextRequest } from 'next/server'
import { z } from 'zod'

import { ApiResponse } from '@/services/server'
import { base16 } from '@/utils/convert'
import { queryString } from '@/utils/qs'

const paramValidator = z.object({ path: z.string() })

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = queryString.toJSON(request.nextUrl.search)

  try {
    const qs = await paramValidator.parseAsync(searchParams)
    const hex = base16.toHex(qs.path)

    return ApiResponse.json({
      originPath: qs.path,
      hexPath: hex,
      timestamp: Date.now()
    })
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
