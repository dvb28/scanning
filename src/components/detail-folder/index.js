import React, { memo } from 'react';
import Breadcrums from '../breadcrums';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import FolderIcon from '@mui/icons-material/Folder';
import getChildFolders from '@/handlers/getChildFolders';
import { useRouter } from 'next/navigation';
import { ScanningContext } from '@/context/scanning-context';
import RowDetail from '@/components/detail-folder/row-detail';
import NoneSelect from './none-select-detail';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate } from '@/utils/date';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// Header
const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Tên thư mục',
    },
    {
        id: 'size',
        numeric: true,
        disablePadding: false,
        label: 'Kích thước',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Ngày tạo',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead sx={{ backgroundColor: '#e5e7eb' }}>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{ fontWeight: '600!important' }}
                        >
                            {headCell.id === 'name' && (
                                <FolderIcon
                                    fontSize="small"
                                    sx={{ marginRight: 1, color: 'rgb(247, 190, 79)' }}
                                />
                            )}
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

// Create
const createData = (
    id,
    name,
    size,
    type,
    createdAt,
    parentId,
    desc,
    childFoldersCount,
    path,
    isLock,
    childFilesCount,
    userCreatedName
) => ({
    id,
    name,
    size,
    type,
    createdAt: formatDate(createdAt),
    parentId,
    desc,
    childFoldersCount,
    path,
    isLock,
    childFilesCount,
    userCreatedName,
});

function FolderDetail() {
    const folderContext = React.useContext(ScanningContext).folders;
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const [dataChange, setDataChange] = React.useState(false);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Is Selected
    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // Visible Row
    const visibleRows = React.useMemo(() => {
        // Check
        dataChange && setDataChange(false);

        // Return
        return stableSort(rows, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
    }, [dataChange, rows, order, orderBy, page, rowsPerPage]);

    // Handle Delete Multiple Rows
    const handeDeleteMultipleRows = () => {
        // Set
        console.log(selected)
    }

    // Router
    const route = useRouter();

    // Change Route
    const routing = React.useCallback((path) => route.push(path), [route]);

    // Use Effect
    React.useEffect(() => {
        const getChildFolder = async () => {
            if (folderContext.get?.id) {
                // Get User Root Folder
                const folders = await getChildFolders(folderContext.get?.id, routing);

                // Check
                if (folders.length > 0) {
                    // Data
                    const data = folders.map((item) => {
                        return createData(
                            item.id,
                            item.name,
                            item.size,
                            item.type,
                            item.createdAt,
                            item.parentId,
                            item.desc,
                            item.childFoldersCount,
                            item.path,
                            item.isLock,
                            item.childFilesCount,
                            item.userCreatedName
                        );
                    });

                    // Set data
                    setRows(data);
                } else {
                    // Set Empty Rows
                    setRows([]);
                }
            } else {
                // Set Empty Rows
                setRows([]);
            }

            // Reset
            setSelected([]);
        };

        // Calling
        getChildFolder();
    }, [folderContext.get, routing]);

    // Return
    return (
        <Box sx={{ height: '100%' }}>
            {Boolean(folderContext.get) ? (
                <React.Fragment>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            px: 2,
                        }}
                    >
                        <Breadcrums />
                        <Box>
                            {selected.length > 0 && (
                                <Button onClick={handeDeleteMultipleRows} variant="contained" color="error" size="small">
                                    <DeleteIcon
                                        fontSize="small"
                                        sx={{ marginRight: 1 }}
                                    />
                                    Xoá {selected.length} tệp
                                </Button>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', boxShadow: 'none' }}>
                        <Paper sx={{ width: '100%', mb: 2, border: '0', boxShadow: 'none' }}>
                            <TableContainer sx={{ boxShadow: 'none!important' }}>
                                <Table
                                    aria-labelledby="tableTitle"
                                    size={'small'}
                                    sx={{ boxShadow: 'none!important' }}
                                >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    <TableBody sx={{ boxShadow: 'none!important' }}>
                                        {visibleRows.map((row) => {
                                            // Row
                                            const isItemSelected = isSelected(row.id);

                                            // Label ID
                                            const labelId = `enhanced-table-checkbox-${row.id}`;

                                            // Return
                                            return (
                                                // eslint-disable-next-line jsx-a11y/role-supports-aria-props
                                                <RowDetail
                                                    setRows={setRows}
                                                    rows={rows}
                                                    labelId={labelId}
                                                    data={row}
                                                    key={row.id}
                                                    setSelected={setSelected}
                                                    setDataChange={setDataChange}
                                                    selected={selected}
                                                    isItemSelected={isItemSelected}
                                                />
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: 33 * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                        {rows.length === 0 && (
                                            <TableRow
                                                style={{
                                                    height: 33 * emptyRows,
                                                }}
                                            >
                                                <TableCell
                                                    colSpan={12}
                                                    sx={{ textAlign: 'center' }}
                                                >
                                                    Không có tệp tin nào
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                labelDisplayedRows={({ from, to, count }) => `Trang ${from}/${to}`}
                                labelRowsPerPage="Số hàng mỗi trang"
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </React.Fragment>
            ) : (
                <NoneSelect />
            )}
        </Box>
    );
}

export default memo(FolderDetail);
