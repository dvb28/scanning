import React from 'react';
import Main from '@/pages/layout/main';
import { IconButton, Card, CardContent, Grid, Typography, Tooltip, Box, Tab } from '@mui/material';
import Viewers from '@/components/viewers';
import TreeItemCustom from './tree-item-custom';
import FolderIcon from '@/components/icons/folder-icon';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { fetcherGet } from '@/utils/fetcher';
import SearchForm from '@/components/search-form';
import Toasts from '@/utils/toasts';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useRouter } from 'next/router';

export default function FolderManager() {
  const [crSlType, setCrSlType] = React.useState('folder');

  const [crFileData, setCrFileData] = React.useState(null);

  const [crFolderData, setCrFolderData] = React.useState(null);

  const [ifBoxShow, setIfBoxShow] = React.useState(true);

  const [searchStr, setSearchStr] = React.useState('');

  const [searchData, setSearchData] = React.useState([]);

  const [tabs, setTab] = React.useState('manager');

  const route = useRouter();

  const changeRoute = (path) => route.push(path);

  const handleChangeTabs = (e, newValue) => setTab(newValue);

  const handleSetSearchStr = (val) => setSearchStr(val);

  // Handle Item Click
  const handleNodeClick = React.useCallback((nodes) => {
    if (nodes.type === 'folder') {
      setCrSlType('folder');
      setCrFolderData(nodes);
    } else {
      setCrSlType('pdf');
      setCrFileData('/pdf-test.pdf');
    }
  }, []);

  // Handle Search
  const handleSearch = async (e) => {
    // Prevent
    e.preventDefault();

    // Change Tab
    tabs === 'manager' && setTab('search');

    // Response
    const response = await fetcherGet('/search/search-by-name', { searchStr }, changeRoute);

    // Get Response Status and check success
    const scResStatus = response.status === 200;

    // Check
    scResStatus === false && Toasts.error('Tìm kiếm thất bại, có lỗi từ server');

    // Data
    setSearchData(response.data);
  };

  return (
    <Main title="Quản lý thư mục" sx={{overflowX: 'hidden'}}>
      <Grid container spacing={2} gap={1} sx={{flexWrap: {xs: 'wrap', lg: 'nowrap'}}}>
        <Grid item xs={12} lg={ifBoxShow ? 5.5 : 12} sx={{ transition: 'all 0.3s ease-in-out' }}>
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              marginBottom: 2,
              border: '0.5px solid rgba(128, 128, 128, 0.5)',
              boxShadow: 'none',
            }}
            onSubmit={handleSearch}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '15px' }}
              placeholder="Tìm kiếm tệp tin"
              inputProps={{ 'aria-label': 'search google maps' }}
              value={searchStr}
              onChange={(e) => handleSetSearchStr(e.target.value)}
            />
            <Tooltip title="Tìm kiếm nâng cao">
              <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type='submit' color="primary" sx={{ p: '10px' }} aria-label="directions">
              <DirectionsIcon />
            </IconButton>
          </Paper>
          <TabContext value={tabs}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTabs} aria-label="lab API tabs example">
                <Tab label="Quản lý thư mục" value="manager" />
                <Tab label="Kết quả tìm kiếm" value="search" />
              </TabList>
            </Box>
            <TabPanel value="manager" sx={{ px: 0 }}>
              <Card
                sx={{
                  minWidth: 275,
                  width: '100%',
                  border: '0.5px solid rgba(128, 128, 128, 0.5)',
                  boxShadow: 'none',
                }}
              >
                <CardContent sx={{ pt: '5px', pb: '10px!important', maxHeight: '500px'}}>
                  <TreeItemCustom nodeHandle={handleNodeClick} />
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel value="search" sx={{ px: 0 }}>
              <Card
                sx={{
                  minWidth: 275,
                  width: '100%',
                  border: '0.5px solid rgba(128, 128, 128, 0.5)',
                  boxShadow: 'none',
                }}
              >
                <CardContent sx={{ pt: '5px', pb: '10px!important' }}>
                  <SearchForm data={searchData} nodeHandle={handleNodeClick} />
                </CardContent>
              </Card>
            </TabPanel>
          </TabContext>
        </Grid>
        {/* <Grid
          item
          xs={0}
          sm={12}
          lg={ifBoxShow ? 6.5 : 0.1}
          sx={{display: {sm: 'none', md: 'flex'}, position: 'relative', transition: 'all 0.3s ease', maxHeight: '330px', minHeight: '330px'}}
        >
          <Tooltip title="Đóng, mở xem thông tin tệp">
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(128, 128, 128, 0.2)',
              }}
              onClick={() => setIfBoxShow((prev) => !prev)}
            >
              {ifBoxShow ? <ArrowRightIcon color="white" /> : <ArrowLeftIcon color="white" />}
            </IconButton>
          </Tooltip>
          <Card
            sx={{
              width: '100%',
              maxHeight: '87vh',
              overflow: 'auto',
              display: ifBoxShow ? 'block' : 'none',
              transition: 'all 0.5s ease 10s',
              border: '0.5px solid rgba(128, 128, 128, 0.5)',
              boxShadow: 'none',
            }}
            className="hidden-scrollbar"
          >
            <CardContent sx={{ scrollbarWidth: 0 }}>
              {crSlType === 'folder' ? (
                <Grid
                  container
                  sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }}}
                >
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
                    <Box sx={{borderRight: {md: '0', xs: '0.5px solid #c0c0c0'}, flex: 1}}>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Thông tin, thông số thư mục
                      </Typography>
                      <Tooltip title={crFolderData ? crFolderData.name : 'Kho dữ liệu'}>
                        <Typography noWrap variant="h5" component="div">
                          {crFolderData ? crFolderData.name : 'Kho dữ liệu'}
                        </Typography>
                      </Tooltip>
                      <FolderIcon width={100} height={100} />
                    </Box>
                    <Box sx={{ml: {md: '0', xs: '20px'}}}>
                      <Typography sx={{ fontSize: 13, mb: 0.7 }} color="text.secondary">
                        Thư mục con:
                        {` ${crFolderData ? crFolderData.childFoldersCount : 0} thư mục`}
                      </Typography>
                      <Typography sx={{ fontSize: 13, mb: 0.7 }} color="text.secondary">
                        Tổng số file: {`${crFolderData ? crFolderData.childFilesCount : 0} file`}
                      </Typography>
                      <Typography sx={{ fontSize: 13, mb: 0.7 }} color="text.secondary">
                        Tạo: {crFolderData ? crFolderData.createdAt : 'Không rõ'}
                      </Typography>
                      <Typography sx={{ fontSize: 13, mb: 0.7 }} color="text.secondary">
                        Người tạo:
                        {crFolderData?.userCreatedName ? ` ${crFolderData.userCreatedName}` : 'Không rõ'}
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
                      {crFolderData && crFolderData.desc !== ''
                        ? crFolderData.desc
                        : 'Thư mục này hiện không có mô tả nào!'}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                crFileData && <Viewers fileUrl={crFileData} />
              )}
            </CardContent>
          </Card>
        </Grid> */}
        <Grid
          item
          xs={0}
          sm={12}
          lg={ifBoxShow ? 6.5 : 0.1}
          sx={{display: {sm: 'none', md: 'flex'}, position: 'relative', transition: 'all 0.3s ease', maxHeight: '330px', minHeight: '330px'}}
        >
        </Grid>
      </Grid>
    </Main>
  );
}
