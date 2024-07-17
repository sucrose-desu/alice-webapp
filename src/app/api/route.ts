import { type NextRequest } from 'next/server'

import { paramValidator, queryValidator } from '@/constants/validator.zod'
import { ApiResponse } from '@/services/server'
import { queryString } from '@/utils'

export async function GET(request: NextRequest) {
  const searchParams = queryString.toJSON(request.nextUrl.searchParams)

  try {
    const qs = await queryValidator.parseAsync(searchParams)
    return ApiResponse.json(qs)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    // TODO:
    return ApiResponse.message('The record has been successfully created.', 201)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function PATCH(request: NextRequest, { params }: NextParams) {
  try {
    const { id } = await paramValidator.parseAsync(params)
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
