import { NoticeName } from '@/constants'
import type { Notice } from '@/types'

export function getCurrentContant({ content }: Notice) {
  switch (content) {
    default:
      if (typeof content === 'string')
        return <div className='_dangerously' dangerouslySetInnerHTML={{ __html: content }}></div>
      else return content
  }
}
