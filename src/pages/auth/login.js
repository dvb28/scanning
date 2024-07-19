import React, { useEffect, useState } from 'react';
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
import { fetcherPost } from '@/utils/fetcher';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { validateEmail, validatePassword } from '@/utils/validate';
import { getCookie, setCookie } from '@/utils/cookie';
import { isTokenExpired } from '@/utils/token';

// Default Theme
const defaultTheme = createTheme();

export default function Login() {
  // useRoute
  const route = useRouter();

  // Email Input
  const [emailInp, setEmailInp] = useState('admin@gmail.com');

  // Password Input
  const [passwordInp, setPasswordInp] = useState('Dvb_2002');

  // Show Password
  const [showPassword, setShowPassword] = useState(false);

  // Email Error Helper
  const [emailError, setEmailError] = useState('');

  // Password Error Helper
  const [passwordError, setPasswordError] = useState('');

  // Handle Change Email
  const handleChangeEmail = (val) => {
    // Set Email Input
    setEmailInp(val);
    // Validate Email
    validateEmail(val, setEmailError);
  };

  // Handle Change Email
  const handleChangePassword = (val) => {
    // Set Password Input
    setPasswordInp(val);
    // Validate Password
    validatePassword(val, setPasswordError);
  };

  // handleClickShowPassword
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // handleMouseDownPassword
  const handleMouseDownPassword = (event) => event.preventDefault();
  
  // Sự kiện đăng nhập
  const handleLogin = (e) => {
    // Prevented
    e.preventDefault();

    // Promising Login
    Toasts.promise({
      promiseState: {
        pending: 'Đang đăng nhập',
        success: 'Đăng nhập thành công 👌',
        error: 'Đăng nhập thất bại 🤯',
      },
      validate: async () => {
        // Send login request and get response
        const res = await fetcherPost('/auth/login', {
          reqEmail: emailInp,
          reqPassword: passwordInp,
        }, () => route.push(path));

        // Get Response Status and check success
        const scResStatus = res.status === 200;

        // Check Status Code
        if (!scResStatus) {
          // Toast Error
          Toasts.error(res.data.detail);

          // Set Email Error
          setEmailError('Sai thông tin đăng nhập');

          // Set Email Error
          setPasswordError('Sai thông tin đăng nhập');
        }

        // Return validate boolean
        return scResStatus ? res.data : false;
      },
      success: async (data) => {
        // Exception
        try {
          // // Get Token
          const { expiredTime, ...token } = data.token;

          // Get User Data
          const userData = data.userData;

          // Save token to cookie
          await setCookie('token', token, 300);

          // Save user data to cookie
          await setCookie('userData', userData, 300);

          // Push Main layout
          await route.push('/views/dashboard');

        } catch (error) {
          throw new Error(error);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  // Use Effect
  useEffect(() => {
    // Handle Check Is Login
    const handleCheckLogin = async () => {
      // Get Token
      const token = getCookie('token');

      // Variable Is Not Permisson
      const acIsExpired = token ? await isTokenExpired(token.accessToken) : true;

      // Check Token
      !acIsExpired && await route.push('/views/dashboard');
      
    }
    // Call
    handleCheckLogin();
  }, [route]);

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
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Địa chỉ Email"
              name="email"
              onChange={(e) => handleChangeEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              value={emailInp}
              error={Boolean(emailError)}
              helperText={emailError}
            />
            <TextField
              required
              autoFocus
              fullWidth
              margin="normal"
              id="password"
              value={passwordInp}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Mật khẩu"
              autoComplete="current-password"
              onChange={(e) => handleChangePassword(e.target.value)}
              error={Boolean(passwordError)}
              helperText={passwordError}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lưu tài khoản"
            />
            <Button
              disabled={
                passwordInp === '' || emailInp === '' || emailError !== '' || passwordError !== ''
              }
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Quên mật khẩu
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/register" variant="body2">
                  Chưa có tài khoản? Đăng ký!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
