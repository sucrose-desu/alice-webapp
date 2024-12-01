'use client'

import cls from 'classnames'
import { useCallback, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'

import { getErrorMessage } from '@/libs/form/message'

type Props = {
  key: string
  label: string
  type?: string
  icon?: string
  description?: string
  children?: ReactNode
  error?: FieldError
  isRequired?: boolean
}

export function InputComponent({ label, children, ...rest }: Props) {
  // __STATE's
  const nodeRef = useRef<HTMLDivElement>(null)

  const [currentType, setCurrentType] = useState(rest.type || 'text')
  const [isText, isPassword] = useMemo(
    () => [currentType === 'text', rest.type === 'password'],
    [currentType]
  )

  // __FUNCTION's
  const handleSwitchType = useCallback(() => {
    if (isPassword) {
      const type = currentType === 'text' ? 'password' : 'text'
      setCurrentType(type)

      const inputElm = nodeRef.current?.querySelector('input')
      if (inputElm) {
        inputElm.type = type
      }
    }
  }, [nodeRef, currentType])

  // __RENDER
  return (
    <div className='ui--input-provider' ref={nodeRef}>
      <label className={cls('ui--input-label', { required: rest?.isRequired })}>
        {rest?.icon && <span className={`icon bi bi-${rest.icon}`} />}
        <span className='text-sm text-neutral-300'>{label}</span>
      </label>

      {rest?.description && (
        <div className='ui--input-desc my-2 text-xs text-neutral-400'>{rest.description}</div>
      )}

      <div className={cls('ui--input-field', { 'is-pssword': isPassword })}>
        {children}

        {isPassword && (
          <button
            className={cls('btn btn-password', isText ? 'text-white' : 'text-white/60')}
            type='button'
            onClick={handleSwitchType}>
            <span className='bi bi-upc text-xl' />
          </button>
        )}
      </div>

      {rest?.error && (
        <p className='ui--input-error text-xs font-normal leading-5 text-red-500'>
          {getErrorMessage(rest.error)}
        </p>
      )}
    </div>
  )
}
