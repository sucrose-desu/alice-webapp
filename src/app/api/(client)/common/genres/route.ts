import { type NextRequest } from 'next/server'

import { prismaService } from '@/libs/prisma'
import { ApiResponse } from '@/services/server'

export const revalidate = 60

export async function GET(request: NextRequest) {
  try {
    const genres = await prismaService.genre.findMany({
      select: {
        id: true,
        group: true,
        text: true
      }
    })

    return ApiResponse.json(genres)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
