import Avatar from '@mui/material/Avatar';
import { deleteCookie, getCookie } from '@/utils/cookie';
import { Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';
import React from 'react';
import Toasts from '@/utils/toasts';
import { fetcherDelete } from '@/utils/fetcher';
import { useRouter } from 'next/navigation';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function Avatars() {
  // Fullname State
  const [fullname, setFullname] = React.useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const route = useRouter();

  // Handle Click
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Đăng xuát
  const logoutHandle = (e) => {
    // Prevent Default
    e.preventDefault();

    // Promising Logout
    Toasts.promise({
      promiseState: {
        pending: 'Đang đăng xuất',
        success: 'Đăng xuất thành công 👌',
        error: 'Đăng xuất thất bại 🤯',
      },
      validate: async () => {
        // Get user id from cookie
        const userId = getCookie('userData')?.userId;

        // Send login request and get response
        const res = await fetcherDelete('/auth/logout', { userId }, () => route.push(path));

        // // Get Response Status and check success
        const scResStatus = res.status === 200;

        // Check Status Code
        if (!scResStatus) {
          // Toast Error
          Toasts.error(res.data.detail);
        }

        // Return validate boolean
        return scResStatus ? res.data : false;
      },
      success: async (data) => {
        // Exception
        try {
          // Delete token to cookie
          deleteCookie('token');

          // Delete user data to cookie
          deleteCookie('userData');

          // Push Main layout
          await route.push('/auth/login');
        } catch (error) {
          throw new Error(error);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  // useEffect
  React.useEffect(() => {
    const getFullname = async () => {
      // Get userName from cookie
      const userFullname = getCookie('userData')?.userFullname;

      // Set Fullname
      setFullname(userFullname);
    };
    // Call getFullname
    getFullname();
  }, []);

  return (
    <Box>
      <Tooltip title="Tài khoản">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar alt={fullname} src="#" sx={{ width: 32, height: 32 }}></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Thông tin
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        <MenuItem onClick={logoutHandle}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </Box>
  );
}
