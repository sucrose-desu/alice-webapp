import { NextRequest } from 'next/server'

import { paramValidator, queryValidator } from '@/constants/validator.zod'
import { ApiResponse } from '@/services/server'
import { queryString } from '@/utils/qs'

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// Force dynamic rendering, which will result in routes being rendered for each user at request time.
export const dynamic = 'force-dynamic'

// Next.js will invalidate the cache when a request comes in, at most once every 30 seconds.
// export const revalidate = 30

export async function GET(request: NextRequest) {
  const searchParams = queryString.toJSON(request.nextUrl.search)

  try {
    const qs = await queryValidator.parseAsync(searchParams)
    return ApiResponse.json(qs)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const formData = await request.formData()
    // TODO:

    return ApiResponse.message('The record has been successfully created.', 201)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function PATCH(request: NextRequest, { params }: NextParams) {
  try {
    const { id } = await paramValidator.parseAsync(params)
    const body = await request.json()
    const formData = await request.formData()
    // TODO:

    return ApiResponse.message('The record has been successfully updated.')
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function DELETE(request: NextRequest, { params }: NextParams) {
  try {
    const { id } = await paramValidator.parseAsync(params)
    // TODO:

    return ApiResponse.message('The record has been successfully deleted.')
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
