import type { FieldError } from 'react-hook-form'

export function getErrorMessage(error: FieldError) {
  switch (error.type) {
    case 'required':
      return error?.message || 'This field is required.'

    case 'min':
      return error?.message || 'Unexpected minimum.'

    case 'max':
      return error?.message || 'Unexpected maximum.'

    case 'minLength':
      return error?.message || 'Unexpected characters minimum length.'

    case 'maxLength':
      return error?.message || 'Unexpected characters maximum length.'

    default:
      return error?.message || 'Message undefined.'
  }
}
