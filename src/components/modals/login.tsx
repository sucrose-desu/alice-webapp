'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import cls from 'classnames'

import { useMounted } from '@/hooks'
import { AuthService } from '@/services'
import type { FormLogin } from '@/types/form'

import { InputComponent as Input } from '../input/main'

type Props = {
  className?: string
}

export function LoginComponent({ className }: Props) {
  // __STATE's
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormLogin>({
    defaultValues: {
      email: 'app.ts@alice.live',
      password: '',
      keepLoggedIn: true
    }
  })

  // __FUNCTION's
  const onSubmit = handleSubmit(async (data) => {
    const response = await AuthService.signIn(data)
    if (response) {
      await AuthService.profile()

      // const fallbackTo = searchParams.get('fallback')
      // if (fallbackTo) {
      //   router.push(fallbackTo)
      // }
    }
  })

  // __EFFECT's
  useMounted(() => {
    AuthService.signOut()
  })

  // __RENDER
  return (
    <div className={cls('ui--login-modal relative', className)}>
      <div className='ui--login-header'>
        <h2 className='capitalize leading-6'>system sign-in</h2>
        <p className='desc text-xs italic text-neutral-400'>Generate Lorem Ipsum placeholder text.</p>
      </div>

      <form className='ui--login-form mx-auto my-8' onSubmit={onSubmit}>
        <div className='grid gap-4'>
          <Input
            key='.email'
            type='text'
            name='email'
            label='Email Address'
            register={register}
            errors={errors.email}
            rules={{ required: true }}
          />

          <Input
            key='.password'
            type='password'
            name='password'
            label='Password'
            register={register}
            errors={errors.password}
            rules={{ required: true }}
          />
        </div>

        <div className='mt-6 grid'>
          <button className='btn btn-primary h-12' type='submit'>
            <span className='text-base font-bold capitalize'>sign-in</span>
          </button>
        </div>
      </form>

      <div className='ui--login-footer border-0 border-t border-solid border-neutral-900 pt-4 text-center'>
        <p className='italic text-neutral-400'>or Sign-In with</p>

        <div className='mb-6 mt-4 grid grid-flow-col justify-center gap-4'>
          <button className='btn btn-addon'>
            <span className='icon bi bi-github text-xl' />
          </button>

          <button className='btn btn-addon'>
            <span className='icon bi bi-discord text-xl' />
          </button>

          <button className='btn btn-addon'>
            <span className='icon bi bi-twitter-x text-lg' />
          </button>
        </div>

        <i className='block text-center capitalize text-neutral-500'>close [ESC]</i>
      </div>
    </div>
  )
}
