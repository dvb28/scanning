'use client';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { Worker } from '@react-pdf-viewer/core';
import 'pdfjs-dist/web/pdf_viewer.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Component {...pageProps} />
        <ToastContainer autoClose={2000} />
      </Worker>
    </>
  );
}

