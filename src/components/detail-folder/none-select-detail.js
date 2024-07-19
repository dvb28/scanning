import React from 'react';
import Box from '@mui/material/Box';
import FolderIcon from '@mui/icons-material/Folder';

export default function NoneSelect() {
  return (
    <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <FolderIcon  sx={{fontSize: "100px", color: 'rgb(247, 190, 79)' }} />
      Không có thư mục nào được chọn
    </Box>
  );
}
