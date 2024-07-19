import React, { memo } from 'react';
import { Card, CardContent, Grid, Tooltip, Box, Typography } from '@mui/material';
import FolderIcon from '@/components/icons/folder-icon';
import Viewers from '@/components/viewers';
import { ScanningContext } from '@/context/scanning-context';

function ViewDetail({ data }) {
  // Tree treeData
  const [treeData, setTreeData] = React.useState(data);

  // Folder Changed Context
  const folderChangedCtx = React.useContext(ScanningContext).folderChanged;

  // Use Effect
  React.useEffect(() => {
    // Check
    if(Boolean(folderChangedCtx.get)) {
      // Set Data
      folderChangedCtx.set(null);
      
    } else if (folderChangedCtx.get?.id === treeData?.id) {
      // Calling
      setTreeData(folderChangedCtx.get);

      // Set Data
      folderChangedCtx.set(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderChangedCtx.get]);

  // Return
  return (
    <Box
      sx={{
        display: { sm: 'none', md: 'flex' },
        position: 'relative',
        transition: 'all 0.3s ease',
        maxHeight: '330px',
        minHeight: '330px',
      }}
    >
      <Tooltip title="Đóng, mở xem thông tin tệp"></Tooltip>
      <Card
        sx={{
          width: '100%',
          maxHeight: '87vh',
          overflow: 'auto',
          transition: 'all 0.5s ease 10s',
          p: 0,
          boxShadow: 'none',
        }}
        className="hidden-scrollbar"
      >
        <CardContent sx={{ scrollbarWidth: 0, p: '3px' }}>
          {true ? (
            <Grid container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  display: { sm: 'flex', md: 'block' },
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Thông tin, thông số thư mục
                  </Typography>
                  <Tooltip title={treeData ? treeData.name : 'Kho dữ liệu'}>
                    <Typography noWrap variant="h5" component="div">
                      {treeData ? treeData.name : 'Kho dữ liệu'}
                    </Typography>
                  </Tooltip>
                  <FolderIcon width={100} height={100} />
                </Box>
                <Box sx={{ ml: { md: '0', xs: '20px' } }}>
                  <Typography sx={{ fontSize: 13, mb: 0.7 }} color="text.secondary">
                    Thư mục con:
                    {` ${treeData ? treeData.childFoldersCount : 0} thư mục`}
                  </Typography>
                  <Typography sx={{ fontSize: 13, mb: 0.7 }} color="text.secondary">
                    Tổng số file: {`${treeData ? treeData.childFilesCount : 0} file`}
                  </Typography>
                  <Typography sx={{ fontSize: 13, mb: 0.7 }} color="text.secondary">
                    Tạo: {treeData ? treeData.createdAt : 'Không rõ'}
                  </Typography>
                  <Typography sx={{ fontSize: 13, mb: 0.7 }} color="text.secondary">
                    Người tạo:
                    {treeData?.userCreatedName ? ` ${treeData.userCreatedName}` : 'Không rõ'}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={7}
                sx={{
                  pl: { xs: 0, md: 3 },
                  mt: 2,
                  borderLeft: { xs: '0', md: '0.5px solid #c0c0c0' },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Mô tả của thư mục:
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 13.3 }}>
                  {treeData && treeData.desc !== ''
                    ? treeData.desc
                    : 'Thư mục này hiện không có mô tả nào!'}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            crFiletreeData && <Viewers fileUrl={crFiletreeData} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
export default memo(ViewDetail);
