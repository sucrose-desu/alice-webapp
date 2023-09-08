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
    <div className='ui--login-modal'>
      <div className='ui--login-header'>
        <h2 className='title'>system login</h2>
        <p className='desc'>Generate Lorem Ipsum placeholder text.</p>
      </div>

      <form className='ui--login-form' onSubmit={onSubmit}>
        <div className='rows'>
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

        <div className='rows'>
          <button className='btn btn-primary btn-login' type='submit'>
            <span className='text'>login</span>
          </button>
        </div>
      </form>

      <div className='ui--login-footer'>
        <p className='desc'>or Login with,</p>

        <div className='list'>
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

        <i className='escape'>close [ESC]</i>
      </div>
    </div>
  )
}
