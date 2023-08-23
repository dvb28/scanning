import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function Avatars() {
  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt="Đào Việt Bảo" src="https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/299912867_1459665087788589_8559740749495363037_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=FHxdJ8Uyc94AX9_BwL_&_nc_ht=scontent.fhan5-2.fna&oh=00_AfCoXlzgizmAZKWV8qv1uKPztKHudziBoK-iYVZn2twiuQ&oe=64EA4662" />
      </StyledBadge>
    </Stack>
  );
}