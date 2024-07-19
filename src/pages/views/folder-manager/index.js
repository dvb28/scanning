import React from 'react';
import Main from '@/pages/layout/main';
import { IconButton, Card, CardContent, Grid, Tooltip, Box, Tab } from '@mui/material';
import TreeItemCustom from './tree-item-custom';
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
import { ScanningContext } from '@/context/scanning-context';
import DetailFolder from '@/components/detail-folder';

export default function FolderManager() {

  const folderContext = React.useContext(ScanningContext).folders;

  const [ifBoxShow, setIfBoxShow] = React.useState(true);

  const [searchStr, setSearchStr] = React.useState('');

  const [searchData, setSearchData] = React.useState([]);

  const [tabs, setTab] = React.useState('manager');

  const route = useRouter();

  const routing = (path) => route.push(path);

  const handleChangeTabs = (e, newValue) => setTab(newValue);

  const handleSetSearchStr = (val) => setSearchStr(val);

  // Handle Item Click
  const handleNodeClick = React.useCallback((nodes) => {
    // Check
    if (nodes.type === 'folder') {
      folderContext.set(nodes);
    }
  }, [folderContext]);

  // Handle Search
  const handleSearch = async (e) => {
    // Prevent
    e.preventDefault();

    // Change Tab
    tabs === 'manager' && setTab('search');

    // Response
    const response = await fetcherGet('/search/search-by-name', { searchStr }, routing);

    // Get Response Status and check success
    const scResStatus = response.status === 200;

    // Check
    scResStatus === false && Toasts.error('Tìm kiếm thất bại, có lỗi từ server');

    // Data
    setSearchData(response.data);
  };

  return (
    <Main title="Quản lý thư mục" sx={{ overflowX: 'hidden' }}>
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
          <IconButton type="submit" color="primary" sx={{ p: '10px' }} aria-label="directions">
            <DirectionsIcon />
          </IconButton>
        </Paper>
        <Grid container spacing={2} gap={1} sx={{ flexWrap: { xs: 'wrap', lg: 'nowrap' } }}>
          <Grid item xs={12} lg={ifBoxShow ? 4.5 : 12} sx={{ transition: 'all 0.3s ease-in-out' }}>
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
                  <CardContent sx={{ pt: '5px', pb: '10px!important', maxHeight: '500px' }}>
                    <TreeItemCustom nodeHandle={handleNodeClick}/>
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
          <Grid
            item
            xs={0}
            sm={12}
            lg={ifBoxShow ? 7.5 : 0.1}
            sx={{
              display: { sm: 'none', md: 'flex' },
              position: 'relative',
              transition: 'all 0.3s ease',
              maxHeight: '330px',
              minHeight: '330px',
            }}
          >
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
              <CardContent sx={{ scrollbarWidth: 0, p: 0, height: '100%'}}>
                <DetailFolder data={folderContext?.get} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </Main>
  );
}
