import { type NextRequest } from 'next/server'
import { queryString } from '@/utils'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const result = queryString.toJSON(request.nextUrl.searchParams)
  return Response.json(result)
}

export async function POST(request: NextRequest) {
  return Response.json({ statusCode: 200, message: 'The record has been successfully created.' })
}

export async function PATCH(request: NextRequest) {
  return Response.json({ statusCode: 200, message: 'The record has been successfully updated.' })
}

export async function DELETE(request: NextRequest) {
  return Response.json({ statusCode: 200, message: 'The record has been successfully deleted.' })
}
