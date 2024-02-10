'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { AuthService } from '@/services'
import type { FormLogin } from '@/types/form'

import { InputComponent as Input } from '../input/main'

export function LoginComponent() {
  // __STATE <React.Hooks>
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormLogin>({
    defaultValues: {
      username: 'app.ts@alice.live',
      password: 'password',
      keepLoggedIn: true
    }
  })

  // __FUNCTION's
  const onSubmit = handleSubmit(async (data) => {
    const response = await AuthService.login(data)
    if (response) {
      await AuthService.profile()
      router.push('/browse')
    }
  })

  // __RENDER
  return (
    <div className='ui--login-modal relative w-80 rounded-xl border-4 border-solid border-neutral-900/80 bg-neutral-950/80 px-12 pb-8 pt-12'>
      <div className='ui--login-header'>
        <h2 className='capitalize leading-6'>system login</h2>
        <p className='desc text-xs italic text-neutral-400'>Generate Lorem Ipsum placeholder text.</p>
      </div>

      <form className='ui--login-form mx-auto my-8' onSubmit={onSubmit}>
        <div className='grid gap-4'>
          <Input
            key='.username'
            type='text'
            name='username'
            label='Username'
            register={register}
            errors={errors.username}
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
            <span className='text-base font-bold capitalize'>login</span>
          </button>
        </div>
      </form>

      <div className='ui--login-footer border-0 border-t border-solid border-neutral-900 pt-4 text-center'>
        <p className='italic text-neutral-400'>or Login with,</p>

        <div className='mb-6 mt-4 grid grid-flow-col justify-center gap-4'>
          <button className='btn btn-addon'>
            <Image
              className='icon twitter'
              src='/static/images/icons/twitter.png'
              width={26}
              height={26}
              quality={90}
              alt='Twitter icon'
            />
          </button>

          <button className='btn btn-addon'>
            <Image
              className='icon discord'
              src='/static/images/icons/discord.png'
              width={26}
              height={26}
              quality={90}
              alt='Discord icon'
            />
          </button>

          <button className='btn btn-addon'>
            <Image
              className='icon github'
              src='/static/images/icons/github.png'
              width={26}
              height={26}
              quality={90}
              alt='Github icon'
            />
          </button>
        </div>

        <i className='block text-center capitalize text-neutral-500'>close [ESC]</i>
      </div>
    </div>
  )
}
