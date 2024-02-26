import { type NextRequest } from 'next/server'
import { ZodError } from 'zod'
import { apiTryCatch } from '@/services/catch'
import { queryString } from '@/utils'

import { db } from '@/database'
import Songs from '@/database/schema/song'

export async function GET(request: NextRequest) {
  try {
    return Response.json([])
  } catch (error) {
    return apiTryCatch(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parse = Songs.validator.parse(body)

    // const res = await db.insert(Songs.table).values({
    //   title: parse.title,
    //   artist: parse.artist,
    //   album: parse.album,
    //   duration: parse.duration,
    // })

    return Response.json({ statusCode: 200, message: 'The record has been successfully created.', parse })
  } catch (error) {
    return apiTryCatch(error)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    return Response.json({ statusCode: 200, message: 'The record has been successfully updated.' })
  } catch (error) {
    return apiTryCatch(error)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    return Response.json({ statusCode: 200, message: 'The record has been successfully deleted.' })
  } catch (error) {
    return apiTryCatch(error)
  }
}
