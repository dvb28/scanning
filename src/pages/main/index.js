import React from 'react';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import 'react-toastify/dist/ReactToastify.css';

import {toast} from 'react-toastify';

export default function Main() {
  // Quét tài liệu
  const scanHandle = (e) => {
    e.preventDefault();
    const resolveAfter3Sec = new Promise((resolve, rejected) => setTimeout(rejected, 2500));
    toast.promise(resolveAfter3Sec, {
      pending: 'Đang đăng ký tài khoản',
      success: 'Đăng ký thành công 👌',
      error: 'Đăng ký thất bại 🤯',
    });
  }
  return (
    <div className="grid grid-cols-2 gap-4 h-[100vh]">
      <div className="border overflow-y-auto">
        <Viewer fileUrl="/pdf-test.pdf" />
      </div>
      <div className="m-4">
        <h3 className="text-2xl uppercase mb-5 text-blue-600">Cài đặt quét</h3>
        <div className="grid grid-cols-2 gap-9 justify-between">
          <div>
            <div className="mb-6">
              <label
                htmlFor="scanner-machine"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lựa chọn máy quét
              </label>
              <select
                id="scanner-machine"
                defaultValue="choose-scan"
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="choose-scan">Chọn máy quét</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="scanner-dpi"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Độ phân giải (DPI)
              </label>
              <select
                id="scanner-dpi"
                defaultValue="300"
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="300">300</option>
                <option value="200">200</option>
                <option value="150">150</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="mb-6 grid grid-cols-5 gap-4 flex-nowrap">
              <div className="col-span-4">
                <label
                  htmlFor="scanner-prefix-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cấu hình tên file (Prefix)
                </label>
                <input
                  type="text"
                  id="scanner-prefix-name"
                  placeholder="H26.20.21.22.X"
                  className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                ></input>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="scanner-increase"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tăng
                </label>
                <input
                  type="number"
                  id="scanner-increase"
                  placeholder='1'
                  className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                ></input>
              </div>
            </div>
            <button
              onClick={scanHandle}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Quét tài liệu
            </button>
          </div>
          <div>
            <div className="mb-6">
              <label
                htmlFor="scanner-machine"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lựa chọn máy quét
              </label>
              <select
                id="scanner-machine"
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Chọn máy quét</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="scanner-dpi"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Độ phân giải (DPI)
              </label>
              <select
                id="scanner-dpi"
                className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="300">300</option>
                <option value="200">200</option>
                <option value="150">150</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="scanner-prefix-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cấu hình tên file (Prefix)
              </label>
              <input
                type="text"
                id="scanner-prefix-name"
                placeholder="H26.20.21.22.X"
                className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              ></input>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Quét tài liệu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
