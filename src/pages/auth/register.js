import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toasts from '@/utils/toasts';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { fetcherPost } from '@/utils/fetcher';
import { useRouter } from 'next/router';
import { validateEmail, validatePassword } from '@/utils/validate';
import { getCookie } from '@/utils/cookie';

const defaultTheme = createTheme();

export default function Register() {
  // useRoute
  const route = useRouter();
  
  // Change Route
  const routing = (path) => route.push(path);

  // Fullname Input
  const [fullnameInp, setFullnameInp] = useState('');

  // Email Input
  const [emailInp, setEmailInp] = useState('');

  // Password Input
  const [passwordInp, setPasswordInp] = useState('');

  // Show Password
  const [showPassword, setShowPassword] = useState(false);

  // Email Error Helper
  const [fullnameError, setFullnameError] = useState('');

  // Email Error Helper
  const [emailError, setEmailError] = useState('');

  // Password Error Helper
  const [passwordError, setPasswordError] = useState('');

  // handleClickShowPassword
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // handleMouseDownPassword
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Handle Change Email
  const handleChangeEmail = (val) => {
    // Set Email Input
    setEmailInp(val)
    // Validate Email
    validateEmail(val, setEmailError)
  }

  // Handle Change Email
  const handleChangePassword = (val) => {
    // Set Password Input
    setPasswordInp(val);

    // Validate Password
    validatePassword(val, setPasswordError)
  }

  // Handle Change Fullname
  const handleChangeFullname = (val) => {
    // Set Fullname Input
    setFullnameInp(val);

    // Clear
    fullnameError !== '' && setFullnameError('');
  }

  // Hàm logic đăng ký
  const registerHandle = (e) => {
    // Prevented
    e.preventDefault();

    // Promise Handle
    Toasts.promise({
        promiseState: {
          pending: 'Đang đăng ký',
          success: 'Đăng ký thành công 👌',
          error: 'Đăng ký thất bại 🤯',
        },
        validate: async () => {
          // Send login request and get response
          const response = await fetcherPost('/auth/register', {
            userEmail: emailInp,
            userPassword: passwordInp,
            userFullname: fullnameInp,
          }, () => route.push(path));

          // Check Status Code
          if (response.status !== 200) {
            Toasts.error(response.data.detail);

            // Set Fullname Error
            setFullnameError('Sai thông tin đăng nhập');

            // Set Email Error
            setEmailError('Sai thông tin đăng nhập');

            // Set Email Error
            setPasswordError('Sai thông tin đăng nhập');
          };

          // Return validate boolean
          return response.status === 200;
        },
        success: async () => {
          await route.push('/auth/login');
        }
      }
    );
  }

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
            Đăng ký
          </Typography>
          <Box component="form" noValidate onSubmit={registerHandle} sx={{ mt: 3 }}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  label="Tên người dùng"
                  name="fullname"
                  onChange={(e) => handleChangeFullname(e.target.value)}
                  autoComplete="fullname"
                  autoFocus
                  value={fullnameInp}
                  error={Boolean(fullnameError)}
                  helperText={fullnameError}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
              <TextField
                required
                autoFocus
                fullWidth
                margin='normal'
                id="password"
                value={passwordInp}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility 1"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                }}
                label="Mật khẩu"
                autoComplete="current-password"
                onChange={(e) => handleChangePassword(e.target.value)}
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Đồng ý với các Điều Khoản và Chính sách"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                passwordInp === '' || emailInp === '' || fullnameInp === '' ||
                emailError !== '' || passwordError !== '' || fullnameError !== ''
              }
            >
               Đăng ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  Đã có tài khoản? Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}