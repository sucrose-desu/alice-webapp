'use client'

import cls from 'classnames'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useLoader } from '@/hooks'
import { AuthService } from '@/services'
import type { FormSignIn } from '@/types/form'

import { InputComponent as Input } from '../../input'

type Props = {
  className?: string
  onCallback?: (to?: string) => void
}

export function FormSignInComponent({ className, onCallback }: Props) {
  // __STATE's
  const searchParams = useSearchParams()
  const loader = useLoader()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSignIn>({
    defaultValues: {
      email: 'app.ts@alice.live',
      password: '',
      keepLoggedIn: true
    }
  })

  // __FUNCTION's
  const onSubmit = handleSubmit(async (data) => {
    loader.on()

    const response = await AuthService.signIn(data)
    if (response) {
      await AuthService.profile()

      if (onCallback) {
        const fallbackTo = searchParams.get('fallback')
        if (fallbackTo) onCallback(fallbackTo)
      }
    }

    loader.off()
  })

  // __RENDER
  return (
    <form className={cls('ui--form signin', className)} onSubmit={onSubmit}>
      <div className='grid gap-4'>
        <Input key='.email' icon='person' label='Email Address' error={errors.email} isRequired>
          <input type='email' {...register('email', { required: true })} />
        </Input>

        <Input
          key='.password'
          icon='lock'
          type='password'
          label='Password'
          error={errors.password}
          isRequired>
          <input type='password' {...register('password', { required: true, minLength: 4 })} />
        </Input>
      </div>

      <div className='mt-6 grid'>
        <button className='btn btn-primary h-12' type='submit' disabled={loader.isLoading}>
          <span className='text-base font-bold capitalize'>sign-in</span>
        </button>
      </div>
    </form>
  )
}
