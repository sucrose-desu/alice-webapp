import fs from 'fs'
import path from 'path'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { takeScreenshots } from '@/libs/ffmpeg'
import { ApiResponse } from '@/services/server'
import { queryString } from '@/utils/qs'

const paramValidator = z.object({ path: z.string() })

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: NextParams) {
  const searchParams = queryString.toJSON(request.nextUrl.search)

  try {
    const qs = await paramValidator.parseAsync(searchParams)
    const pathName = path.resolve('', qs.path)

    const thumbnail = await takeScreenshots(pathName)
    const screenshotPath = path.resolve('', thumbnail)

    const fileStat = fs.statSync(screenshotPath)
    const stream = fs.createReadStream(screenshotPath)
    const readableStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(chunk))
        stream.on('end', () => controller.close())
        stream.on('error', (error) => controller.error(error))
      }
    })

    const headers = new Headers()
    headers.append('Content-Type', 'image/png')
    headers.append('Content-Length', fileStat.size.toString())

    return new NextResponse(readableStream, { headers })
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
