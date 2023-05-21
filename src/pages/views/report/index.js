import React, { useState } from 'react';
import Main from '@/pages/layout/main';
import { Button, Table } from 'flowbite-react';
import Toasts from '@/utils/toasts';

export default function Report() {
  const [reportData, setReportData] = useState([
    {
      userName: 'Đào Việt Bảo',
      date:"20/05/2020",
      dayWorkTime: ''
    }
  ]);
  // Xuất báo cáo
  const reportHandle = (e) => {
    e.preventDefault();
    Toasts.promise({
      pending: 'Đang xuất báo cáo',
      success: 'Xuất báo cáo thành công 👌',
      error: 'Xuất báo cáo thất bại 🤯',
    })
  }
  return (
    <Main>
      <h3 className="m-6 text-2xl uppercase mb-5 text-blue-600">Báo cáo công việc</h3>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>STT</Table.HeadCell>
          <Table.HeadCell>Tên người dùng</Table.HeadCell>
          <Table.HeadCell>Ngày</Table.HeadCell>
          <Table.HeadCell>Số giờ làm việc</Table.HeadCell>
          <Table.HeadCell>Số file đã quét</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Chi tiết</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>1</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Đào Việt Bảo
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Chi tiết
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>1</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Đào Việt Bảo
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Chi tiết
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>1</Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Đào Việt Bảo
            </Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Chi tiết
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <h3 className="mx-6 my-5 text-xl text-bold uppercase text-blue-600">Tổng kết</h3>
      <div className='mb-6'>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Tên người dùng</Table.HeadCell>
            <Table.HeadCell>Số ngày làm việc trong tháng</Table.HeadCell>
            <Table.HeadCell>Số file đã làm</Table.HeadCell>
            <Table.HeadCell>Số file đã quét</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Chi tiết</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>1</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Đào Việt Bảo
              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
              <Table.Cell>
                <a
                  href="/tables"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Chi tiết
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <Button className='float-right m-4' onClick={reportHandle}>Xuất báo cáo</Button>
    </Main>
  );
}
