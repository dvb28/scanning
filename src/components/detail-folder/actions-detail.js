import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CustomDialog from '@/components/custom-dialog';
import { ListItemText, TextField } from '@mui/material';
import CustomTextArea from '@/components/custom-text-area';
import React, { memo } from 'react';
import { fetcherPost } from '@/utils/fetcher';
import { getCookie } from '@/utils/cookie';
import Toasts from '@/utils/toasts';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { useRouter } from 'next/navigation';
import { ScanningContext } from '@/context/scanning-context';
import { binarySearch } from '@/utils/search';
import ViewDetail from './view-detail';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Link from '../customs/Link';

function FolderDetailActions({ data = null, setAnchorEl, anchorEl, setDatas, datas, setChange }) {
  // useRoute
  const route = useRouter();

  // Change Route
  const routing = (path) => route.push(path);

  // Changed Context
  const folderChangedCtx = React.useContext(ScanningContext).folderChanged;

  // Handle Close Menu
  const handleClose = () => setAnchorEl(null);

  // Is loading
  const [loading, setLoading] = React.useState(false);

  // Folder Desc string
  const [editFDes, setEditFDes] = React.useState(data.desc);

  // Folder Name string
  const [editFName, setEditFName] = React.useState(data.name);

  // Handle Set Folder Add Desc
  const handleSetEditDes = (val) => setEditFDes(val);

  //   Handle set loading
  const handleSetLoading = (val) => {
    // settimeout
    setTimeout(() => {
      // Disable Loading
      setLoading(val);
    }, 300);
  };

  // Is open
  const open = Boolean(anchorEl);

  // Delete Folder
  const handleDelete = async () => {
    // Enable loading
    setLoading(true);

    // Close Model
    handleClose();

    // Check folder has locking
    if (data.isLock == 0) {
      // Promise
      Toasts.promise({
        promiseState: {
          pending: 'Đang xoá folder',
          success: 'Xoá folder thành công 👌',
          error: 'Xoá folder thất bại 🤯',
        },
        validate: async () => {
          // Get User Id from cookie
          const userId = getCookie('userData')?.userId;

          // Send request delete folder
          const res = await fetcherPost(
            '/folders/soft-delete',
            {
              userId,
              id: data.id,
              name: data.name,
              type: 'folder',
              userDeletedName: data.userCreatedName,
            },
            routing
          );

          // Get Response Status and check success
          const scResStatus = res.status === 200;

          // Return validate boolean
          return scResStatus ? res.data : false;
        },
        success: async () => {
          // New Data
          let newData = datas;

          // Run Action
          folderChangedCtx.set({ id: data.id, isDeleted: true });

          // Find
          const index = await binarySearch(datas, data.id);

          // New Data
          newData.splice(index, 1);

          // Set new data
          setDatas(newData);

          // Change
          setChange(true);

          // Disable Loading
          handleSetLoading(false);

          // Close Model
          handleClose();
        },
      });
    } else {
      // Disable Loading
      handleSetLoading(false);

      // Error Toasing
      Toasts.error('Tệp tin này đã bị khoá, không thể thao tác.');
    }
  };

  //   Update Folder
  const handleUpdate = async () => {
    // Enable loading
    handleSetLoading(true);

    // Close handle dialog
    handleClose();

    // Check lock
    if (data.isLock == 0) {
      // Check Empty
      if (editFName !== '') {
        // Promise
        await Toasts.promise({
          promiseState: {
            pending: 'Đang cập nhật',
            success: 'Cập nhật thành công 👌',
            error: 'Cập nhật thất bại 🤯',
          },
          validate: async () => {
            // Get User Id from cookie
            const userId = getCookie('userData')?.userId;

            // Send request add folder
            const res = await fetcherPost(
              '/folders/update',
              {
                userId,
                id: data.id,
                name: editFName,
                desc: editFDes,
              },
              routing
            );

            // Get Response Status and check success
            const scResStatus = res.status === 200;

            // Return validate boolean
            return scResStatus ? res.data : false;
          },
          success: async (dataRes) => {
            // Check Data Not False
            if (dataRes) {
              // Run Action
              folderChangedCtx.set({ ...data, name: editFName, desc: editFDes });

              // Find
              const index = await binarySearch(datas, data.id);

              // New Data
              let newData = datas;

              // New Data
              newData[index] = { ...data, name: editFName, desc: editFDes };

              // Set new data
              setDatas(newData);

              // Change
              setChange(true);

              // Disable Loading
              handleSetLoading(false);

              // Clear Desc Input
              setAddFDes('');

              // Clear Add Input
              setAddFName('');
            }
          },
          error: () => {
            // Disable Loading
            handleSetLoading(false);
          },
        });
      }
    } else {
      // Disable Loading
      handleSetLoading(false);

      // Error Toasing
      Toasts.error('Tệp tin này đã bị khoá, không thể thao tác.');
    }

    // Disable loading
    handleSetLoading(false);
  };

  //   Lock folder
  const handleLock = async (isLock) => {
    // Enable Loading
    handleSetLoading(true);

    // Set Anchor
    handleClose();

    // Check
    if (isLock === data.isLock && isLock === 1) {
      // Disable Loading
      handleSetLoading(false);

      // Error Toasing
      Toasts.error('Tệp tin này đã bị khoá, không thể khoá lại.');
    } else if (isLock === data.isLock && isLock === 0) {
      // Disable Loading
      handleSetLoading(false);

      // Error Toasing
      Toasts.error('Thư mục này đã được mở khoá, không thể mở khoá lại.');
    } else {
      // Lock alert
      const lockAlert = isLock == 1 ? 'Khoá' : 'Mở khoá';

      // Promise
      Toasts.promise({
        promiseState: {
          pending: `${lockAlert} folder`,
          success: `${lockAlert} folder thành công 👌`,
          error: `${lockAlert} folder thất bại 🤯`,
        },
        validate: async () => {
          // Get User Id from cookie
          const userId = getCookie('userData')?.userId;

          // Send request delete folder
          const res = await fetcherPost(
            '/folders/lock',
            { userId, folderId: data.id, isLock },
            routing
          );

          // Get Response Status and check success
          const scResStatus = res.status === 200;

          // Return validate boolean
          return scResStatus ? res.data : false;
        },
        success: async () => {
          // Change lock
          folderChangedCtx.set({ ...data, isLock });

          // Find
          const index = await binarySearch(datas, data.id);

          // New Data
          let newData = datas;

          // New Data
          newData[index] = { ...data, isLock };

          // Set new data
          setDatas(newData);

          // Change
          setChange(true);

          // Disable Loading
          setLoading(false);

          // Close Model
          handleClose();
        },
        error: async (err) => {
          // Disable Loading
          setLoading(false);

          // Loging Toast
          Toasts.error(`Chỉ có chủ sở hữu mới có thể khoá, mở khoá tệp này.`);
        },
      });
    }
  };

  // View Detail
  const viewDetail = async () => {};

  // Return
  return (
    <Menu
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      anchorEl={anchorEl}
      open={open}
      disablePortal
      onClose={handleClose}
      onContextMenu={handleClose}
    >
      <MenuItem onClick={handleDelete} disabled={loading}>
        <DeleteOutlinedIcon fontSize="small" />
        <ListItemText sx={{ marginLeft: '10px' }}>Xoá</ListItemText>
      </MenuItem>
      <CustomDialog
        smbtnText="Cập nhật"
        button={
          <MenuItem disabled={loading}>
            <ModeOutlinedIcon fontSize="small" />
            <ListItemText sx={{ marginLeft: '10px' }}>Sửa</ListItemText>
          </MenuItem>
        }
        openValidate={{
          status: data.isLock == 1 ? false : true,
          error: 'Tệp tin này đã bị khoá, không thể thao tác.',
        }}
        title={`Sửa thông tin ${data.type === 'folder' ? 'thư mục' : 'tài liệu'}`}
        handle={handleUpdate}
      >
        <TextField
          autoFocus
          margin="normal"
          id="folder-name-update"
          label={`Tên ${data.type === 'folder' ? 'thư mục' : 'tài liệu'}`}
          type="text"
          fullWidth
          defaultValue={editFName}
          onChange={(e) => setEditFName(e.target.value)}
        />
        <CustomTextArea value={editFDes} desc="Mô tả" onChange={handleSetEditDes} />
      </CustomDialog>
      <MenuItem onClick={() => handleLock(1)}>
        <LockPersonOutlinedIcon fontSize="small" />
        <ListItemText sx={{ marginLeft: '10px' }}>Khoá</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleLock(0)}>
        <LockOpenOutlinedIcon fontSize="small" />
        <ListItemText sx={{ marginLeft: '10px' }}>Mở khoá</ListItemText>
      </MenuItem>
      <CustomDialog
        button={
          <MenuItem onClick={() => viewDetail()}>
            <InfoOutlinedIcon fontSize="small" />
            <ListItemText sx={{ marginLeft: '10px' }}>Chi tiết</ListItemText>
          </MenuItem>
        }
        title={`Thông tin chi tiết ${data.type === 'folder' ? 'thư mục' : 'tài liệu'}`}
      >
        <ViewDetail data={data} />
      </CustomDialog>
      <Link
        target="_blank"
        href={`http://localhost:2820/folders/download-folder?folderPath=${data.path}&folderName=${data.name}`}
        sx={{
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <MenuItem>
          <FileDownloadOutlinedIcon fontSize="small" />
          <ListItemText sx={{ marginLeft: '10px' }}>Tải xuống</ListItemText>
        </MenuItem>
      </Link>
    </Menu>
  );
}

export default memo(FolderDetailActions);
