import { headers } from 'next/headers'
import { type NextRequest } from 'next/server'

import { paramValidator } from '@/constants/validator.zod'
import { ApiResponse } from '@/services/server'
import { useAuthGuard } from '@/services/server/auth'

import { updateAlbumValidator } from '../validator.zod'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: NextParams) {
  try {
    const auth = useAuthGuard(headers())
    const { id } = await paramValidator.parseAsync(params)
    // TODO:

    return ApiResponse.json({})
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function PATCH(request: NextRequest, { params }: NextParams) {
  try {
    const auth = useAuthGuard(headers())
    const { id } = await paramValidator.parseAsync(params)
    const data = await updateAlbumValidator.parseAsync(await request.json())
    // TODO:

    return ApiResponse.message('The record has been successfully updated.')
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function DELETE(request: NextRequest, { params }: NextParams) {
  try {
    const auth = useAuthGuard(headers())
    const { id } = await paramValidator.parseAsync(params)
    // TODO:

    return ApiResponse.message('The record has been successfully deleted.')
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
