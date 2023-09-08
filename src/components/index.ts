import dynamic from 'next/dynamic'

export class AddonProvider {
  static readonly Bootstrap = dynamic(() => import('./addon/bootstrap'), { ssr: false })
  // static readonly Dialog = dynamic(() => import('./addon/dialog'), { ssr: false })
  static readonly Loader = dynamic(() => import('./addon/loader'), { ssr: false })
  static readonly Modal = dynamic(() => import('./addon/modal'), { ssr: false })
  // static readonly Notice = dynamic(() => import('./addon/notice'), { ssr: false })
}

export { ReduxProvider } from './redux-provider'
export { LayoutContainer } from './layout'
