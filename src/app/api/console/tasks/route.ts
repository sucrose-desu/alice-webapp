import { type NextRequest } from 'next/server'
import path from 'path'
import fs from 'fs'
import mime from 'mime'

import { ApiResponse } from '@/services/server'
import { getFileFormat } from '@/libs/ffmpeg'
import { queryString } from '@/utils/qs'

import { queryValidator } from './validator.zod'

export async function GET(request: NextRequest) {
  const searchParams = queryString.toJSON(request.nextUrl.search)

  try {
    const qs = await queryValidator.parseAsync(searchParams)
    const dir = path.resolve('', qs.path)
    // const poster = path.resolve('', qs.poster)

    const dirents = fs.readdirSync(dir, { withFileTypes: true })
    const files = dirents.filter((dirent) => dirent.isFile())

    const results: any[] = []
    for await (const file of files) {
      let pathName = path.join(dir, file.name)
      let stat = await getFileFormat(pathName)

      results.push({
        fileName: file.name.split('.')[0],
        fileType: mime.getType(file.name),
        filePath: pathName,
        fileSize: stat.size!,
        duration: stat.duration!,
        chunkSize: +((stat.size! / stat.duration!) * 10).toFixed(5)
      })
    }

    return ApiResponse.json(results)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
