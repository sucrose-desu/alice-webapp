import { dispatch } from '@/store'
import { setGenres } from '@/store/common.store'
import type { Genre } from '@/types/common'

import axios from '../axios'
import { tryCatch } from '../catch'

export class CommonService {
  static async getAll() {
    try {
      // TODO:
    } catch (error) {
      tryCatch('`CommonService.pull`', error)
    }
  }

  static async getGenres() {
    try {
      const response = await axios.get<Genre[]>('/common/genres')
      if (response.data) {
        dispatch(setGenres(response.data))
      }
    } catch (error) {
      tryCatch('`CommonService.getGenres`', error)
    }
  }
}
