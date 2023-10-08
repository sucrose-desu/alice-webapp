import Bootstrap from './addon/bootstrap'
import Loader from './addon/loader'
import Modal from './addon/modal'

export class AddonProvider {
  static readonly Bootstrap = Bootstrap
  static readonly Loader = Loader
  static readonly Modal = Modal
}

export { ReduxProvider } from './redux-provider'
export { LayoutContainer } from './layout'
