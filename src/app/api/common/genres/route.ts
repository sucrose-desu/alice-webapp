import { type NextRequest } from 'next/server'

import { prismaService } from '@/services'
import { ApiResponse } from '@/services/catch'

export async function GET(request: NextRequest) {
  try {
    const genres = await prismaService.genre.findMany()
    return ApiResponse.json(genres)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
