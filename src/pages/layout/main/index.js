import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@/components/customs/Link';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useRouter } from 'next/router';
import Avatars from '@/components/avatars';
import { Stack } from '@mui/material';
import { useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import BasicSpeedDial from '@/components/ basic-speed-dial';

// Drawer Width
const drawerWidth = 240;

// Open Mixin
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// Close Mixin
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Drawer UI Header
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

// Sidebar Data
const sidebarData = [
  {
    text: 'Thống kê',
    link: '/views/dashboard',
    icon: <InsertChartOutlinedTwoToneIcon />,
  },
  {
    text: 'Quét tài liệu',
    link: '/views/scan',
    icon: <DocumentScannerOutlinedIcon />,
  },
  {
    text: 'Thư mục cá nhân',
    link: '/views/folder-manager',
    icon: <FolderOpenOutlinedIcon />,
  },
  {
    text: 'Thư mục chia sẻ',
    link: '/views/folder-shared',
    icon: <FolderOpenOutlinedIcon />,
  },
  {
    text: 'Báo cáo công việc',
    link: '/views/report',
    icon: <AssignmentOutlinedIcon />,
  },
];

export default function Main({ title = 'Nội dung', children, backgroundColor = 'white'}) {
  const theme = useTheme();

  const route = useRouter();

  const [open, setOpen] = useState(true);

  // Enable Drawer
  const handleDrawerOpen = () => setOpen(true)

  // Disable Drawer
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex', height: '100%', backgroundColor}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
          </Stack>
          <Avatars />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ width: '100%', marginLeft: '10px' }}
          >
            Scanner
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarData.map((item) => {
            // Check route active
            const isActive = route.pathname === item.link;

            // Render
            return (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: 'block', position: 'relative' }}
              >
                <Link href={item.link} sx={{ textDecoration: 'none', color: '#000' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      backgroundColor: isActive ? 'rgb(230, 247, 255)' : 'white',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: isActive ? '#1976d2' : '#000',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        opacity: open ? 1 : 0,
                        color: isActive ? '#1976d2' : '#000',
                      }}
                    />
                  </ListItemButton>
                </Link>
                {isActive && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      backgroundColor: 'rgb(24, 144, 255)',
                      width: '2px',
                      zIndex: 2,
                    }}
                  />
                )}
              </ListItem>
            );
          })}
        </List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <Link href="/views/bin" sx={{ textDecoration: 'none', color: '#000' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor:
                  route.pathname === '/views/bin' ? 'rgb(230, 247, 255)' : 'white',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: route.pathname === '/views/bin' ? '#1976d2' : '#000',
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Thùng rác"
                sx={{
                  opacity: open ? 1 : 0,
                  color: route.pathname === '/views/bin' ? '#1976d2' : '#000',
                }}
              />
            </ListItemButton>
          </Link>
          {route.pathname === '/views/bin' && (
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: 'rgb(24, 144, 255)',
                width: '2px',
                zIndex: 2,
              }}
            />
          )}
        </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', height: 'max-content', overflow: 'auto' }}>
        <DrawerHeader />
        {children}
      </Box>
      <BasicSpeedDial/>
    </Box>
  );
}
