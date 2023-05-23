

'use client';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Toasts from '@/utils/toasts';
import { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@/components/customs/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const route = useRouter();

  const [emailInp, setEmailInp] = useState('');

  const [passwordInp, setPasswordInp] = useState('');
  // Sự kiện đăng nhập
  const loginHandle = (e) => {
    e.preventDefault();
    Toasts.promise(
      {
        pending: 'Đang đăng nhập',
        success: 'Đăng nhập thành công 👌',
        error: 'Đăng nhập thất bại 🤯',
      },
      async () => {
        window.localStorage.setItem(
          'user-data-obj',
          JSON.stringify({
            userEmail: 'daovietbao2002@gmail.com',
            userPassword: '123456',
          })
        );
        setTimeout(() => {
          route.push('/views/scan');
        }, 2000);
      },
      async () => {
        return emailInp === 'daovietbao2002@gmail.com' && passwordInp === '123456';
      }
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <Box component="form" onSubmit={loginHandle} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Địa chỉ Email"
              name="email"
              focused
              onChange={(e) => setEmailInp(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              focused
              label="Mật khẩu"
              type="password"
              onChange={(e) => setPasswordInp(e.target.value)}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lưu tài khoản"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Quên mật khẩu
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {'Bạn chưa có tài khoản? Đăng nhập'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
