import '../styles/globals.css'
import '../public/styles.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import GlobalStore from '../redux/globalStore';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={GlobalStore}>
      <div className="font-poppins">
      <Component {...pageProps} />
    </div>
    </Provider>
    
  )
}

export default MyApp
