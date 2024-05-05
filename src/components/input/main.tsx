'use client'

import { useState, useMemo, useCallback } from 'react'
import { errorMessage, InputAttrs } from './utils'
import cls from 'classnames'

interface Props extends InputAttrs {
  type?: 'text' | 'number' | 'search' | 'email' | 'password' | 'date'
  value?: string | number
  autoFocus?: boolean
  autoComplete?: string
  maxLength?: number
}

export function InputComponent({ name, value, register, rules, errors, ...props }: Props) {
  // __STATE's
  const vid = useMemo(() => `ui--form-model-${name}`, [name])
  const defaultValue = useMemo(() => value, [value])

  const [required, isPassword] = useMemo(() => [rules?.required, props.type === 'password'], [])
  const [type, setType] = useState(props.type || 'text')

  // __FUNCTION's
  const handleSwitchType = useCallback(() => {
    if (isPassword) setType((prev) => (prev === 'text' ? 'password' : 'text'))
  }, [])

  // __RENDER
  return (
    <div className='ui--input-provider'>
      <label className={cls('ui--input-label', { required })} htmlFor={vid}>
        {props?.icon && <span className={`icon bi bi-${props.icon}`}></span>}
        <span className='text'>{props.label}</span>
      </label>

      {props?.children && <div className='ui--input-desc'>{props.children}</div>}

      <div className='ui--input-field'>
        <input
          type={type}
          id={vid}
          defaultValue={defaultValue}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          disabled={props.disabled}
          {...register(name, rules)}
        />

        {isPassword && (
          <a className={cls('icon', { 'is-text': type === 'text' })} onClick={handleSwitchType}>
            <svg width={20} height={20} fill='currentColor' viewBox='0 0 16 16'>
              <path d='M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z' />
            </svg>
          </a>
        )}
      </div>

      <span className='ui--input-errors'>{errorMessage(errors)}</span>
    </div>
  )
}
