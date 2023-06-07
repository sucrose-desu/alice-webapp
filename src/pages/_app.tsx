import HTMLHead from 'next/head'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider as ReduxProvider } from 'react-redux'
import { AppProvider, LayoutContainer } from '@/components'
import { configs } from '@/constants'
import { useLoader, useMounted } from '@/hooks'
import { Store } from '@/store'
import '@/styles/fonts.scss'
import '@/styles/main.scss'

export default function Application({ Component, pageProps }: AppProps) {
  // __STATE <Rect.Hooks>
  const router = useRouter()
  const loader = useLoader()

  // __EFFECT'S
  useMounted(() => {
    router.events.on('routeChangeStart', loader.on)
    router.events.on('routeChangeComplete', loader.off)
    router.events.on('routeChangeError', loader.off)
  })

  // __RENDER
  return (
    <>
      <HTMLHead>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{configs.APP_WEB_TITLE}</title>
      </HTMLHead>

      <ReduxProvider store={Store}>
        <AppProvider.Authorizer />
        <AppProvider.Loader />

        <LayoutContainer>
          <Component {...pageProps} />
        </LayoutContainer>

        <AppProvider.Dialog />
        <AppProvider.Modal />
        <AppProvider.Notice />
      </ReduxProvider>
    </>
  )
}
