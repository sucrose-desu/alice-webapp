import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

export default class CustomDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await Document.getInitialProps(context)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en-US'>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta
            name='description'
            content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem at sed quis dignissim quam turpis ac fames sit. In dolor sit eu turpis id integer pulvinar eu. Consectetur'
          />
          <meta name='theme-color' content='#6366F1' />
          <link rel='icon' type='image/x-icon' href='/favicon.ico' />
          <link rel='icon' type='image/png' href='/static/apple-touch-icon.png' />
          <link rel='apple-touch-icon' href='/static/apple-touch-icon.png' />
          <link rel='manifest' href='/manifest.webmanifest' crossOrigin='' />
        </Head>

        <body style={{ backgroundColor: '#000' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
