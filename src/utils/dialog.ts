import { dispatch } from '@/store'
import { setDialog } from '@/store/app.store'
import type { DialogContent, DialogOptions, DialogResults } from '@/types'

/**
 * Alert box.
 *
 * @param {DialogOptions | string} options
 */
export async function dialog(content: DialogContent, options?: DialogOptions): Promise<DialogResults> {
  return new Promise((resolve) => {
    const action = setDialog({
      visible: true,
      content,
      resolve,
      ...options
    })

    dispatch(action)
  })
}
