/* eslint-disable jsx-a11y/role-supports-aria-props */
import { ScanningContext } from '@/context/scanning-context';
import React from 'react';
import FolderDetailActions from './actions-detail';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

function RowDetail({
  data,
  rows,
  labelId,
  setRows,
  selected,
  setSelected,
  setDataChange,
  isItemSelected,
}) {
  // Changed Context
  const folderChangedCtx = React.useContext(ScanningContext).folderChanged;

  // Row
  const [row, setRow] = React.useState(data);

  // Folder context
  const folderContext = React.useContext(ScanningContext).folders;

  // Anchor
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      console.log(newSelected);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  // Handle Double Click
  const handleDoubleClick = (e, row) => {
    // Set Anchor
    e.preventDefault();

    // Set Folder
    folderContext.set(row);
  };

  const handleRightClick = (e, rowId) => {
    // Set Anchor
    e.preventDefault();

    // Set Anchor
    setAnchorEl((prev) => ({ ...prev, [`${rowId}`]: e.target.offsetParent }));
  };

  // Use Effect
  React.useEffect(() => {
    // Check
    if (folderChangedCtx.get?.id === data?.id) {
      // Calling
      setRow(folderChangedCtx.get);

      // Set Data
      folderChangedCtx.set(null);
    } 
  }, [data?.id, folderChangedCtx, folderChangedCtx.get]);

  // Return
  return (
    <React.Fragment>
      <TableRow
        hover={!row?.isLock}
        key={row.id}
        role="checkbox"
        aria-checked={isItemSelected}
        selected={isItemSelected}
        {...{
          onClick: (e) => !row?.isLock && handleClick(e, row.id),
          onDoubleClick: (e) => !row?.isLock && handleDoubleClick(e, row),
          onContextMenu: (e) => !row?.isLock && handleRightClick(e, row.id),
        }}
        sx={{
          cursor: `${!row?.isLock ? 'pointer' : 'not-allowed'}`,
          boxShadow: 'none!important',
          background: row?.isLock ? '#fefce8' : 'transparent',
        }}
        id={row.id}
        aria-controls={Boolean(anchorEl?.[row.id]) ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl?.[row.id]) ? 'true' : undefined}
      >
        <TableCell padding="checkbox">
          {!row?.isLock ? (
            <React.Fragment>
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
                sx={{
                  borderWidth: '0.5px',
                }}
              />
              <FolderDetailActions
                datas={rows}
                setDatas={setRows}
                data={row}
                anchorEl={anchorEl?.[row.id]}
                setAnchorEl={setAnchorEl}
                setChange={setDataChange}
              />
            </React.Fragment>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LockPersonOutlinedIcon color="action" sx={{ fontSize: '20px' }} />
            </Box>
          )}
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.size}</TableCell>
        <TableCell align="right">{row.createdAt}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Exprort
export default React.memo(RowDetail);
