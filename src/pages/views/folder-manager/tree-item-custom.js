import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import getChildFolders from '@/handlers/getChildFolders';
import AddIcon from '@mui/icons-material/Add';
import TreeItem from './tree-item';
import CustomDialog from '@/components/custom-dialog';
import CustomTextArea from '@/components/custom-text-area';
import Toasts from '@/utils/toasts';
import { getCookie } from '@/utils/cookie';
import { fetcherPost } from '@/utils/fetcher';
import { useRouter } from 'next/navigation';

export default function TreeItemCustom({ nodeHandle = null }) {
  // Route
  const route = useRouter();

  // Change Route
  const changeRoute = (path) => route.push(path);

  //   Folder Desc string
  const [addFDes, setAddFDes] = useState('');

  //   Folder Name string
  const [addFName, setAddFName] = useState('');

  // Tree Child State
  const [treeData, setTreeData] = useState([]);

  //   Handle Set Folder Add Desc
  const handleSetAddDes = (val) => setAddFDes(val);

  //   Add Folder
  const handleAddFolder = async () => {
    // Check Empty
    if (addFName !== '') {
      // Promise
      Toasts.promise({
        promiseState: {
          pending: 'Đang thêm folder vào kho',
          success: 'Thêm folder thành công 👌',
          error: 'Thêm folder thất bại 🤯',
        },
        validate: async () => {
          // Get User Id from cookie
          const userId = getCookie('userData')?.userId;

          // Send request add folder
          const res = await fetcherPost('/folders/create', {
            userId,
            parentId: 'root',
            name: addFName,
            desc: addFDes,
            parentPath: '/storage'
          }, changeRoute);

          // Get Response Status and check success
          const scResStatus = res.status === 200;
          

          // Return validate boolean
          return scResStatus ? res.data : false;
        },
        success: async (data) => {
          if (data) {
            // Set Data
            setTreeData((prev) => ([...prev, data]));

            // Clear Input
            setAddFDes('');

            setAddFName('');
          }
        },
      });
    }
  };

  // Handle Set Folders
  const getChildFolder = React.useCallback(async () => {
    // Get User Root Folder
    const folders = await getChildFolders('root', changeRoute);

    // Set Data
    setTreeData(folders);
  }, []);

  // Use Effect
  useEffect(() => {
    // Call Handle
    getChildFolder();
  }, [getChildFolder]);

  // Return
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 15, marginBottom: 0 }} color="text.secondary" gutterBottom>
          Quản lý thư mục
        </Typography>
        <CustomDialog
          smbtnText="Thêm"
          button={
            <Tooltip title="Thêm thư mục vào kho">
              <IconButton>
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          }
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
      </Box>
      {treeData.length > 0 ? (
        <TransitionGroup>
          <TreeItem nodeHandle={nodeHandle} treeData={treeData} />
        </TransitionGroup>
      ) : (
        <Box sx={{ p: '10px', textAlign: 'center', fontSize: '14px' }}>Không có thư mục nào</Box>
      )}
    </Box>
  );
}
