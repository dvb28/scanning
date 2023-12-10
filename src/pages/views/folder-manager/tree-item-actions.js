import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CustomDialog from '@/components/custom-dialog';
import { Box, ListItemText, TextField } from '@mui/material';
import CustomTextArea from '@/components/custom-text-area';
import React from 'react';
import { fetcherPost } from '@/utils/fetcher';
import { getCookie } from '@/utils/cookie';
import Toasts from '@/utils/toasts';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { useRouter } from 'next/navigation';

export default function TreeItemActions({
  data = null,
  actions,
  nodeHandle,
  parentAction,
  parentData,
  setAnchorEl,
  anchorEl,
}) {
  // useRoute
  const route = useRouter();

  // Change Route
  const changeRoute = (path) => route.push(path);

  //   Handle Close Menu
  const handleClose = () => setAnchorEl(null);

  //   Folder Desc string
  const [addFDes, setAddFDes] = React.useState('');

  //   Folder Name string
  const [addFName, setAddFName] = React.useState('');

  // Is loading
  const [loading, setLoading] = React.useState(false);

  //   Folder Desc string
  const [editFDes, setEditFDes] = React.useState(data.desc);

  //   Folder Name string
  const [editFName, setEditFName] = React.useState(data.name);

  //   Handle Set Folder Add Desc
  const handleSetAddDes = (val) => setAddFDes(val);

  //   Handle Set Folder Add Desc
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

  // Add Folder
  const handleAddFolder = async () => {
    // Enable loading
    handleSetLoading(true);

    // Close Model
    handleClose();

    // Check Empty
    if (addFName !== '') {
      // Promise
      await Toasts.promise({
        promiseState: {
          pending: 'Đang thêm folder',
          success: 'Thêm folder thành công 👌',
          error: 'Thêm folder thất bại 🤯',
        },
        validate: async () => {
          // Get User Id from cookie
          const userId = getCookie('userData')?.userId;

          // Send request add folder
          const res = await fetcherPost(
            '/folders/create',
            {
              userId,
              parentId: data.id,
              name: addFName,
              desc: addFDes,
              parentPath: data.path,
            },
            changeRoute
          );

          // Get Response Status and check success
          const scResStatus = res.status === 200;

          // Return validate boolean
          return scResStatus ? { rData: res.data, pData: data } : false;
        },
        success: async (data) => {
          // Check Data Not False
          if (data) {
            // Child Folder Count
            const childFoldersCount = data.pData.childFoldersCount + 1;

            // Run Action
            actions &&
              (await actions((prev) => ({
                ...prev,
                childFoldersCount,
                subs: prev?.subs ? [...prev.subs, data.rData] : [data.rData],
              })));

            // Temp
            let temp = { ...data.pData, childFoldersCount };

            // Call Node Handle
            nodeHandle(temp);

            // Disable Loading
            handleSetLoading(false);

            // Clear Input
            setAddFDes('');

            setAddFName('');
          }
        },
      });
    } else {
      // Disable Loading
      handleSetLoading(false);
    }
  };

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
              path: data.path,
              parentId: data.parentId,
            },
            changeRoute
          );

          // Get Response Status and check success
          const scResStatus = res.status === 200;

          // Return validate boolean
          return scResStatus ? res.data : false;
        },
        success: async () => {
          // Check Data Not False
          actions && (await actions(null));

          // Check Parent Data
          if (parentData) {
            // Calculate Temp
            let temp = { ...parentData, childFoldersCount: parentData.childFoldersCount - 1 };

            // Set Parent Action
            parentAction(temp);

            // Call Node Handle
            nodeHandle(temp);
          }

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
    setAnchorEl(false);

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
              changeRoute
            );

            // Get Response Status and check success
            const scResStatus = res.status === 200;

            // Return validate boolean
            return scResStatus ? res.data : false;
          },
          success: async (data) => {
            // Check Data Not False
            if (data) {
              // Run Action
              actions &&
                (await actions((prev) => {
                  // New Data
                  const newData = { ...prev, name: editFName, desc: editFDes };

                  // Call Node Handle
                  nodeHandle(newData);

                  // Return
                  return newData;
                }));

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
    setAnchorEl(false);

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
            changeRoute
          );

          // Get Response Status and check success
          const scResStatus = res.status === 200;

          // Return validate boolean
          return scResStatus ? res.data : false;
        },
        success: async (data) => {
          // Check Data Not False
          actions && (await actions((prev) => ({ ...prev, isLock })));

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
      onClose={handleClose}
    >
      {data?.type === 'folder' && (
        <CustomDialog
          smbtnText="Thêm"
          button={
            <MenuItem disabled={loading}>
              <AddIcon fontSize="small" />
              <ListItemText sx={{ marginLeft: '10px' }}>Thêm</ListItemText>
            </MenuItem>
          }
          openValidate={{
            status: data.isLock == 1 ? false : true,
            error: 'Tệp tin này đã bị khoá, không thể thao tác.',
          }}
          title="Tạo thư mục mới"
          handle={handleAddFolder}
        >
          <TextField
            autoFocus
            margin="normal"
            id="folder-name-add"
            label="Tên"
            type="text"
            required
            fullWidth
            onChange={(e) => setAddFName(e.target.value)}
            value={addFName}
          />
          <CustomTextArea desc="Mô tả" value={addFDes} onChange={handleSetAddDes} />
        </CustomDialog>
      )}
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
    </Menu>
  );
}
