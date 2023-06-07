import dynamic from 'next/dynamic'

export class AppProvider {
  static readonly Authorizer = dynamic(() => import('./authorizer'), { ssr: false })
  static readonly Dialog = dynamic(() => import('./base/dialog'), { ssr: false })
  static readonly Loader = dynamic(() => import('./base/loader'), { ssr: false })
  static readonly Modal = dynamic(() => import('./base/modal'), { ssr: false })
  static readonly Notice = dynamic(() => import('./base/notice'), { ssr: false })
}

export { Link } from './link'
export { LayoutContainer } from './layout'
export { InputComponent as Input } from './base/input/main'
