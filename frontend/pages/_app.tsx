import '../styles/globals.css';
import '../public/styles.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import GlobalStore from '../redux/globalStore';
import { Worker } from '@react-pdf-viewer/core';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={GlobalStore}>
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js'>
        <div className='font-poppins'>
          <Component {...pageProps} />
        </div>
      </Worker>
    </Provider>
  );
}

export default MyApp;
