import { genSaltSync, hashSync } from 'bcrypt'
import { type NextRequest } from 'next/server'

import { prismaService } from '@/libs/prisma'
import { ApiResponse } from '@/services/server'
import { generateUid, omit } from '@/utils'

import { signUpValidator } from '../validator.zod'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await signUpValidator.parseAsync(await request.json())

    const count = await prismaService.account.count({ where: { email: body.email } })
    if (count) {
      return ApiResponse.message('This email address is already registered.', 422)
    }

    const uid = generateUid()
    const hash = hashSync(body.password, genSaltSync(16))
    const created = await prismaService.account.create({
      data: {
        ...body,
        uid,
        password: hash
      }
    })

    return ApiResponse.json(
      {
        statusCode: 201,
        message: 'The record has been successfully created.',
        data: omit(created, ['password'])
      },
      201
    )
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
