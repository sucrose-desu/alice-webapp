import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { genSaltSync, hashSync } from 'bcrypt'
import { Prisma } from '@prisma/client'

import { queryValidator } from '@/constants/validator.zod'
import { ApiResponse, prismaService } from '@/services/server'
import { useAuthGuard } from '@/services/server/auth'
import { createPaginate, generateUid, omit, queryString } from '@/utils'
import { usePrismaExcludeFields } from '@/utils/prisma'

import { createAccountValidator } from './validator.zod'

export async function GET(request: NextRequest) {
  const searchParams = queryString.toJSON(request.nextUrl.searchParams)

  try {
    const auth = useAuthGuard(headers())
    const { page, limit, ...qs } = await queryValidator.parseAsync(searchParams)

    const queryBuilder: Prisma.AccountFindManyArgs = {
      select: usePrismaExcludeFields('Account', ['password']),
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' }
    }

    if (qs?.search) {
      Object.assign(queryBuilder, {
        where: {
          OR: [
            { uid: { contains: qs.search } },
            { email: { contains: qs.search } },
            { displayName: { contains: qs.search } }
          ]
        } as Prisma.AccountWhereInput
      })
    }

    const [result, total] = await prismaService.$transaction([
      prismaService.account.findMany(queryBuilder),
      prismaService.account.count({ where: queryBuilder.where })
    ])

    const resultWithPagination = createPaginate(result, total, page, limit)

    return ApiResponse.json(resultWithPagination)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await createAccountValidator.parseAsync(await request.json())

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
