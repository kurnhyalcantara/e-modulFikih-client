import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
  useTheme,
  Container,
  Grid,
  Box,
} from '@mui/material';
import { ReactComponent as LoginBanner } from '../../../assets/login-banner.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useStyle } from './styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  AdornmentInputPassword,
  BootstrapedInput,
} from '../../../components/Input/BootstrapedInput';

const Login = () => {
  const classes = useStyle();
  const theme = useTheme();

  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [labelSubmit, setLabelSubmit] = useState('Masuk');
  const [submitDisable, setSubmitDisable] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitDisable(!submitDisable);
    setLabelSubmit('Loading');
    try {
      await axios
        .post(
          'https://fikih-mtsbontouse-backend.herokuapp.com/api/student/login',
          {
            nis: nis,
            password: password,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            const { data } = res;
            window.location.href = '/student_dashboard';
            localStorage.setItem('AUTH', JSON.stringify(data));
          }
        });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="root-container">
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid
            item
            md={7}
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: { xs: 'center', md: 'flex-start' },
              maxHeight: { xs: '234px', md: 'auto' },
            }}
          >
            <LoginBanner className="banner-auth" />
          </Grid>
          <Grid item md={5} xs={12}>
            <Box
              sx={{
                maxWidth: '28rem',
                margin: '0 auto',
                padding: {
                  xs: '0',
                  md: '2.5rem',
                },
                border: {
                  xs: 'none',
                  md: '1px solid #e6e6e6',
                },
                borderRadius: '0.5rem',
                background: '#fff',
              }}
            >
              <form id="login-submit">
                <Typography
                  variant="h4"
                  fontWeight="700"
                  color={theme.palette.text.primary}
                  sx={{ textAlign: 'center' }}
                >
                  Halo!
                </Typography>
                <Typography
                  color={theme.palette.text.secondary}
                  sx={{ textAlign: 'center', marginBottom: '28px !important' }}
                >
                  Masuk untuk belajar sekarang
                </Typography>
                <FormControl fullWidth variant="standard">
                  <InputLabel
                    shrink
                    htmlFor="nis-login-input"
                    sx={{ fontWeight: '700' }}
                  >
                    NIS
                  </InputLabel>
                  <BootstrapedInput
                    id="nis-login-input"
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                      setNis(e.target.value);
                    }}
                    value={nis}
                  />
                </FormControl>
                <FormControl fullWidth variant="standard">
                  <InputLabel
                    shrink
                    htmlFor="password-input"
                    sx={{ fontWeight: '700' }}
                  >
                    Password
                  </InputLabel>
                  <div className="container-input-adornment">
                    <AdornmentInputPassword
                      fullWidth
                      id="outlined-basic"
                      variant="outlined"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                      type={!showPassword ? 'password' : 'text'}
                    />
                    <Box>
                      <IconButton
                        aria-label="Tampilkan Password"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {!showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </Box>
                  </div>
                </FormControl>

                <Button
                  color="primary"
                  className="bootstraped-button"
                  sx={{ margin: '1rem 0' }}
                  fullWidth
                  disabled={submitDisable}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  {labelSubmit}
                </Button>
                <Typography
                  color={theme.palette.text.secondary}
                  sx={{ textAlign: 'center' }}
                >
                  Belum punya akun?{' '}
                  <Link className={classes.link} to="/registration">
                    Daftar
                  </Link>
                </Typography>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
