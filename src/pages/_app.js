import '@/styles/globals.css';
import '@/styles/error.css';
import '@/styles/filemanager.css';
import { ToastContainer } from 'react-toastify';
import { Worker } from '@react-pdf-viewer/core';
import 'pdfjs-dist/web/pdf_viewer.css';
import ScanningProvider from '@/context/provider';
import PageLoading from '@/components/page-loading';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <ScanningProvider>
            <PageLoading/>
            <Component {...pageProps} />
            <ToastContainer autoClose={700} />
          </ScanningProvider>
      </Worker>
    </>
  );
}

