import { type NextRequest } from 'next/server'

import { createUserValidator } from '@/helpers/validator.zod'
import { prismaService } from '@/services'
import { ApiResponse } from '@/services/catch'

export async function GET(request: NextRequest) {
  try {
    return ApiResponse.json({})
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await createUserValidator.parseAsync(await request.json())

    // if (error) return apiTryCatch(error, error.status)
    if (1) {
      // const createdUserProfile = await prismaService.profile.create({
      //   data: {
      //     uid: 'data.user.id',
      //     role: body.role
      //   }
      // })

      return ApiResponse.message('The record has been successfully created.', 201)
    }

    return ApiResponse.catch(null)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
