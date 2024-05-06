import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

import { createUserValidator, type CreateUser } from '@/helpers/validator.zod'
import { apiTryCatch } from '@/services/catch'

const prismaService = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    return Response.json({})
  } catch (error) {
    return apiTryCatch(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateUser
    await createUserValidator.parseAsync(body)

    // if (error) return apiTryCatch(error, error.status)
    if (1) {
      // const createdUserProfile = await prismaService.profile.create({
      //   data: {
      //     uid: 'data.user.id',
      //     role: body.role
      //   }
      // })

      return Response.json({ statusCode: 201, message: 'The record has been successfully created.' }, { status: 201 })
    }

    return Response.json({ statusCode: 422, message: 'Unknown an error occurred.' })
  } catch (error) {
    return apiTryCatch(error)
  }
}
