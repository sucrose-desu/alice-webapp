import { type NextRequest } from 'next/server'
import { apiTryCatch } from '@/services/catch'
import { queryString } from '@/utils'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const result = queryString.toJSON(request.nextUrl.searchParams)
    return Response.json(result)
  } catch (error) {
    return apiTryCatch(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (file) console.log(file)

    return Response.json({
      statusCode: 200,
      message: 'The record has been successfully created.'
    })
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
