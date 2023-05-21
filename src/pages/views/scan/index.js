import React, { useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Main from '@/pages/layout/main';
import Toasts from '@/utils/toasts';
import { Label, Radio} from 'flowbite-react';

export default function Scan() {
  const [handleScanType, setHandleScanType] = useState(false);

  const handleChangeScanType = (value) => {
    setHandleScanType(value);
  }
  // Quét tài liệu
  const scanHandle = (e) => {
    e.preventDefault();
    Toasts.promise({
      pending: 'Đang quét tài liệu',
      success: 'Quét thành công 👌',
      error: 'Quét thất bại 🤯',
    });
  };
  return (
    <Main>
      <div className="grid grid-cols-2 gap-4 h-[100vh]">
        <div className="border overflow-y-auto">
          <Viewer fileUrl="/pdf-test.pdf" />
        </div>
        <div className="m-4">
          <h3 className="text-2xl uppercase mb-5 text-blue-600">Cài đặt máy quét</h3>
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
              <div className="mb-6 grid grid-cols-7 gap-4 flex-nowrap">
                <div className="col-span-5">
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
                <div className="col-span-2">
                  <label
                    htmlFor="scanner-increase"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tăng
                  </label>
                  <input
                    type="number"
                    defaultValue={1}
                    id="scanner-increase"
                    placeholder="1"
                    className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  ></input>
                </div>
              </div>
              <div className="mb-6">
                <fieldset className="flex flex-col gap-4" id="radio">
                  <div className="grid grid-cols-3 gap-2 justify-around">
                    <div className="flex items-center">
                      <Radio
                        className="mr-2"
                        id="united-state"
                        name="countries"
                        value="blackandwhite"
                      />
                      <Label className="text-xs" htmlFor="united-state">
                        Đen trắng
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Radio className="mr-2" id="germany" name="countries" value="gray" />
                      <Label className="text-xs" htmlFor="germany">
                        Màu Xám
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Radio
                        className="mr-2"
                        id="spain"
                        name="countries"
                        value="color"
                        defaultChecked={true}
                      />
                      <Label className="text-xs" htmlFor="spain">
                        Có Màu
                      </Label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="mb-6">
                <fieldset className="flex flex-col gap-4" id="radio">
                  <div className="grid grid-cols-2 gap-2 justify-around">
                    <div className="flex items-center">
                      <Radio
                        className="mr-2"
                        id="single-scan-file"
                        name="page-scan"
                        value="page-single-scan"
                        defaultChecked={true}
                      />
                      <Label className="text-xs" htmlFor="single-scan-file">
                        Quét một trang
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Radio
                        className="mr-2"
                        id="multiple-scan-file"
                        name="page-scan"
                        value="page-multiple-scan"
                      />
                      <Label className="text-xs" htmlFor="multiple-scan-file">
                        Quét nhiều trang
                      </Label>
                    </div>
                  </div>
                </fieldset>
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
                <fieldset className="flex flex-col gap-4" id="radio">
                  <div className="grid grid-cols-2 gap-2 justify-around">
                    <div className="flex items-center">
                      <Radio
                        className="mr-2"
                        id="auto-scanning"
                        name="automatic"
                        value="automatic-auto"
                        onChange={e => handleChangeScanType(true)}
                      />
                      <Label className="text-xs" htmlFor="auto-scanning">
                        Quét tự động
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Radio
                        className="mr-2"
                        id="handle-scanning"
                        name="automatic"
                        value="automatic-hanlde"
                        defaultChecked={true}
                        onChange={e => handleChangeScanType(false)}
                      />
                      <Label className="text-xs" htmlFor="handle-scanning">
                        Quét thủ công
                      </Label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="mb-6">
                <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Cấu hình quét tự động
                </span>
                <div className={`border p-2 rounded ${handleScanType ? 'bg-white' : 'bg-slate-100'}`}>
                  <div className="mb-6">
                    <label
                      htmlFor="base-input"
                      className={`block mb-2 text-sm font-medium ${handleScanType ? 'text-gray-900' : 'text-slate-400'} dark:text-white`}
                    >
                      Base input
                    </label>
                    <input
                      disabled={handleScanType ? false : true}
                      type="text"
                      id="base-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></input>
                  </div>
                  <div className="mb-6">
                    <fieldset className="flex flex-col gap-4" id="radio">
                      <div className="grid grid-cols-2 gap-2 justify-around">
                        <div className="flex items-center">
                          <Radio
                            className={`mr-2 ${handleScanType ? '' : 'text-slate-400'}`}
                            id="one-pages-scan"
                            name="page-scan"
                            value="page-single-scan"
                            defaultChecked={true}
                            disabled={handleScanType ? false : true}
                          />
                          <Label className={`text-xs ${handleScanType ? '' : 'text-slate-400'}`} htmlFor="one-pages-scan">
                            Quét một mặt
                          </Label>
                        </div>
                        <div className="flex items-center">
                          <Radio
                            className={`mr-2 ${handleScanType ? '' : 'text-slate-400'}`}
                            id="two-pages-scan"
                            name="page-scan"
                            value="page-multiple-scan"
                            disabled={handleScanType ? false : true}
                          />
                          <Label className={`text-xs ${handleScanType ? '' : 'text-slate-400'}`} htmlFor="two-pages-scan">
                            Quét hai mặt
                          </Label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}
