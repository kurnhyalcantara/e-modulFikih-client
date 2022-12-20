import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from '@mui/material';
import { ReactComponent as SignUpBanner } from '../../../assets/signup-banner.svg';
import { Link } from 'react-router-dom';
import { useStyle } from './styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  AdornmentInputPassword,
  AdornmentInputPhone,
  BootstrapedInput,
  SelectInputStyled,
} from '../../../components/Input/BootstrapedInput';

const Registration = () => {
  const classes = useStyle();
  const theme = useTheme();

  const [namaLengkap, setNamaLengkap] = useState('');
  const [nis, setNis] = useState('');
  const [kelas, setKelas] = useState('tujuh');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [labelSubmit, setLabelSubmit] = useState('Buat Akun');
  const [submitDisable, setSubmitDisable] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitDisable(!submitDisable);
    setLabelSubmit('Loading');
    try {
      await axios
        .post('http://localhost:4000/api/student/register', {
          namaLengkap: namaLengkap,
          nis: nis,
          kelas: kelas,
          mobile: mobile,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            const { data } = res;
            window.location.href = '/student_dashboard';
            localStorage.setItem('AUTH', JSON.stringify(data));
            toast.success('Pendaftaran Berhasil');
          }
        });
    } catch (error) {
      toast.error(error.response.data.msg);
      setSubmitDisable(false);
      setLabelSubmit('Buat Akun');
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid
            item
            md={7}
            xs={12}
            className={classes.bannerWrapper}
            sx={{ maxHeight: { md: 'auto' }, alignItems: { md: 'flex-start' } }}
          >
            <SignUpBanner className={classes.signupBanner} />
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
              <form id="signup-submit">
                <Typography
                  variant="h4"
                  fontWeight="700"
                  className={classes.heading}
                >
                  Yuk, Daftar!
                </Typography>
                <Typography
                  className={classes.subheading}
                  color={theme.palette.text.secondary}
                >
                  Belajar dan wujudkan mimpi kamu
                </Typography>
                <FormControl fullWidth variant="standard">
                  <InputLabel
                    shrink
                    htmlFor="nama-lengkap-input"
                    sx={{ fontWeight: '700' }}
                  >
                    Nama Lengkap
                  </InputLabel>
                  <BootstrapedInput
                    id="nama-lengkap-input"
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                      setNamaLengkap(e.target.value);
                    }}
                    value={namaLengkap}
                  />
                </FormControl>
                <FormControl fullWidth variant="standard">
                  <InputLabel
                    shrink
                    htmlFor="nis-input"
                    sx={{ fontWeight: '700' }}
                  >
                    NIS
                  </InputLabel>
                  <BootstrapedInput
                    id="nis-input"
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
                    htmlFor="class-student-select"
                    sx={{ fontWeight: '700' }}
                  >
                    Pilih Kelas
                  </InputLabel>
                  <Select
                    id="class-student-select"
                    fullWidth
                    onChange={(e) => {
                      setKelas(e.target.value);
                    }}
                    value={kelas}
                    input={<SelectInputStyled />}
                  >
                    <MenuItem value={'tujuh'}>Kelas VII</MenuItem>
                    <MenuItem value={'delapan'}>Kelas VIII</MenuItem>
                    <MenuItem value={'sembilan'}>Kelas IX</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="standard">
                  <InputLabel
                    shrink
                    htmlFor="phone-input"
                    sx={{ fontWeight: '700' }}
                  >
                    Nomor Telepon
                  </InputLabel>
                  <div className="container-input-adornment">
                    <Box
                      sx={{
                        p: '0.8rem',
                        border: '1px solid #dcdcdc',
                        borderTopLeftRadius: '0.5rem',
                        borderBottomLeftRadius: '0.5rem',
                        borderRightColor: 'transparent',
                      }}
                    >
                      +62
                    </Box>
                    <AdornmentInputPhone
                      id="phone-input"
                      variant="outlined"
                      sx={{
                        flexGrow: '2',
                      }}
                      type="text"
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                      value={mobile}
                    />
                  </div>
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
                  Sudah punya akun? <Link to="/login">Login</Link>
                </Typography>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Registration;
