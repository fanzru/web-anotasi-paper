import '../styles/globals.css'
import '../public/styles.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="font-poppins">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
