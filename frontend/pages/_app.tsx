import '../styles/globals.css';
import '../public/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import GlobalStore from '../redux/globalStore';
import { Worker } from '@react-pdf-viewer/core';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={GlobalStore}>
      <ToastContainer pauseOnFocusLoss={false} />
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js'>
        <div className='font-poppins'>
          <Component {...pageProps} />
        </div>
      </Worker>
    </Provider>
  );
}

export default MyApp;
