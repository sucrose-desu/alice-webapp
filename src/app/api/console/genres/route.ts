import { Prisma } from '@prisma/client'
import { headers } from 'next/headers'
import { type NextRequest } from 'next/server'

import { queryValidator } from '@/constants/validator.zod'
import { prismaService } from '@/libs/prisma'
import { ApiResponse } from '@/services/server'
import { useAuthGuard } from '@/services/server/auth'
import { createPaginate } from '@/utils'
import { queryString } from '@/utils/qs'

import { createGenreValidator } from './validator.zod'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = queryString.toJSON(request.nextUrl.search)

  try {
    const auth = useAuthGuard(headers())
    const { page, limit, ...qs } = await queryValidator.parseAsync(searchParams)

    const queryBuilder: Prisma.GenreFindManyArgs = {
      take: limit,
      skip: (page - 1) * limit
    }

    if (qs?.search) {
      Object.assign(queryBuilder, {
        where: {
          text: { contains: qs.search }
        } as Prisma.GenreWhereInput
      })
    }

    const [result, total] = await prismaService.$transaction([
      prismaService.genre.findMany(queryBuilder),
      prismaService.genre.count({ where: queryBuilder.where })
    ])

    const resultWithPagination = createPaginate(result, total, page, limit)

    return ApiResponse.json(resultWithPagination)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = useAuthGuard(headers())
    const body = await createGenreValidator.parseAsync(await request.json())

    const created = await prismaService.genre.create({ data: body })

    return ApiResponse.json(
      {
        statusCode: 201,
        message: 'The record has been successfully created.',
        data: created
      },
      201
    )
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
