interface IResponse<D extends Record<string, any>> {
  statusCode: number
  message: string
  data?: D
}

interface IPaginate<D extends Record<string, any>> {
  data: D[]
  total: number
  currentPage: number
  nextPage: number | null
  prevPage: number | null
  lastPage: number
  totalPage: number
}

interface XHRSignIn {
  accessToken: string
  refreshKey: string
  expiresAt: Date | string
}
