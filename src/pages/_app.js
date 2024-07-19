import '@/styles/globals.css';
import '@/styles/error.css';
import { ToastContainer } from 'react-toastify';
import { Worker } from '@react-pdf-viewer/core';
import 'pdfjs-dist/web/pdf_viewer.css';
import ScanningProvider from '@/context/scanning-context';
import PageLoading from '@/components/page-loading';
import React from 'react';

export default function App({ Component, pageProps }) {
  // Return
  return (
    <React.Fragment>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <ScanningProvider>
            <PageLoading/>
            <Component {...pageProps} />
            <ToastContainer autoClose={700} />
          </ScanningProvider>
      </Worker>
    </React.Fragment>
  );
}

