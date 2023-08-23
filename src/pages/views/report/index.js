'use client';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Main from '@/pages/layout/main';
import Toasts from '@/utils/toasts';
import { Typography } from '@mui/material';

const columns = [
  { id: 'name', label: 'Tên người dùng', minWidth: 170 },
  { id: 'date', label: 'Ngày làm việc', minWidth: 100 },
  {
    id: 'timeWorkDay',
    label: 'Số giờ làm việc',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'fileScanned',
    label: 'Số file đã làm',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'earnMoney',
    label: 'Số tiền công',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, date, timeWorkDay, fileScanned, earnMoney) {
  return { name, date, timeWorkDay, fileScanned, earnMoney };
}

const rows = [
  createData('Đào Việt Bảo', 'IN', 1324171354, 3287263, 2),
  createData('Đào Việt Bảo', 'CN', 1403500365, 9596961, 2),
  createData('Đào Việt Bảo', 'IT', 60483973, 301340, 2),
  createData('Đào Việt Bảo', 'US', 327167434, 9833520, 2),
  createData('Đào Việt Bảo', 'CA', 37602103, 9984670, 2),
  createData('Đào Việt Bảo', 'AU', 25475400, 7692024, 2),
  createData('Đào Việt Bảo', 'DE', 83019200, 357578, 2),
  createData('Đào Việt Bảo', 'IE', 4857000, 70273, 2),
  createData('Đào Việt Bảo', 'MX', 126577691, 1972550, 2),
  createData('Đào Việt Bảo', 'JP', 126317000, 377973, 2),
  createData('Đào Việt Bảo', 'FR', 67022000, 640679, 2),
  createData('Đào Việt Bảo', 'GB', 67545757, 242495, 2),
  createData('Đào Việt Bảo', 'RU', 146793744, 17098246, 2),
  createData('Đào Việt Bảo', 'NG', 200962417, 923768, 2),
  createData('Đào Việt Bảo', 'BR', 210147125, 8515767, 2),
];

export default function Report() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  // Hàm chức năng xuất báo cáo
  const handleExportReport = (e) => {
    e.preventDefault();
    Toasts.promise({
      pending: 'Đang xuất báo cáo',
      success: 'Xuất báo cáo thành công 👌',
      error: 'Xuất báo cáo thất bại 🤯',
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Main title='Báo cáo công việc'>
      <Typography sx={{color: 'royalblue', marginBottom: '10px'}}>
          Thống kê công việc đã làm
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'auto' }}>
        <TableContainer sx={{ maxHeight: 440}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={`${row.label}-${index}`} hover role="checkbox" tabIndex={-1}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          labelRowsPerPage="Số dòng hiển thị"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Button onClick={handleExportReport} variant="contained" sx={{margin: '20px 0', float: 'right'}}>Xuất báo cáo</Button>
    </Main>
  );
}