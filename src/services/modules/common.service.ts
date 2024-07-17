import axios from '../axios'
import { tryCatch } from '../catch'

export class CommonService {
  static async getAll() {
    try {
      // TODO:
    } catch (error) {
      tryCatch('`CommonService.getAll`', error)
    }
  }
}
