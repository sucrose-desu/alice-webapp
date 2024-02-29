import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

import { supabaseAuth } from '@/helpers/supabase'
import { createUserValidator, type CreateUser } from '@/helpers/validator.zod'
import { apiTryCatch } from '@/services/catch'

const db = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateUser
    await createUserValidator.parseAsync(body)

    const { data, error } = await supabaseAuth.signUp({
      email: body.email,
      password: body.password
    })

    if (error) return apiTryCatch(error, error.status)
    if (data.user) {
      const createdUserProfile = await db.profile.create({
        data: {
          uid: data.user.id,
          role: body.role
        }
      })

      return Response.json(
        { statusCode: 201, message: 'The record has been successfully created.', profile: createdUserProfile },
        { status: 201 }
      )
    }

    return Response.json({ statusCode: 422, message: 'Unknown an error occurred.' })
  } catch (error) {
    return apiTryCatch(error)
  }
}
