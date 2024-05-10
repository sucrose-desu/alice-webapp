import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

import { apiTryCatch } from '@/services/catch'

const prismaService = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const genres = await prismaService.genre.findMany()
    return Response.json(genres)
  } catch (error) {
    return apiTryCatch(error)
  }
}
