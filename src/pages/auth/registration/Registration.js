import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
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

const Registration = () => {
  const classes = useStyle();
  const theme = useTheme();

  const [namaLengkap, setNamaLengkap] = useState('');
  const [nis, setNis] = useState('');
  const [kelas, setKelas] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student');
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
      if (role === 'student') {
        await axios
          .post(
            'https://fikih-mtsbontouse-backend.herokuapp.com/api/student/register',
            {
              namaLengkap: namaLengkap,
              nis: nis,
              kelas: kelas,
              mobile: mobile,
              password: password,
            }
          )
          .then((res) => {
            if (res.status === 200) {
              const { data } = res;
              window.location.href = '/student_dashboard';
              localStorage.setItem('AUTH', JSON.stringify(data));
              toast.success('Pendaftaran Berhasil');
            }
          });
      }
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
            className={classes.bannerWrapper}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <SignUpBanner className={classes.signupBanner} />
          </Grid>
          <Grid item md={5} xs={12}>
            <form className={classes.formWrapper}>
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
              <Select
                labelId="role-select"
                id="demo-simple-select"
                color="warning"
                fullWidth
                sx={{ mb: 2 }}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                value={role}
              >
                <MenuItem value={'student'}>Siswa</MenuItem>
                <MenuItem value={'parent'}>Orang Tua</MenuItem>
                <MenuItem value={'instructor'}>Guru</MenuItem>
              </Select>

              <TextField
                fullWidth
                id="outlined-basic"
                label="Nama Lengkap"
                variant="outlined"
                color="warning"
                type="text"
                onChange={(e) => {
                  setNamaLengkap(e.target.value);
                }}
                value={namaLengkap}
                sx={{ pb: 2 }}
              />

              {role === 'student' ? (
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="NIS"
                  variant="outlined"
                  color="warning"
                  type="text"
                  value={nis}
                  onChange={(e) => {
                    setNis(e.target.value);
                  }}
                  sx={{ pb: 2 }}
                />
              ) : null}
              <FormControl fullWidth>
                <InputLabel id="class-student-select" color="warning">
                  Pilih Kelas
                </InputLabel>
                <Select
                  labelId="class-select"
                  label="Pilih Kelas"
                  id="class-select"
                  color="warning"
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={(e) => {
                    setKelas(e.target.value);
                  }}
                  value={kelas}
                >
                  <MenuItem value={'tujuh'}>Kelas VII</MenuItem>
                  <MenuItem value={'delapan'}>Kelas VIII</MenuItem>
                  <MenuItem value={'sembilan'}>Kelas IX</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                id="outlined-basic"
                label="Nomor Telepon"
                variant="outlined"
                color="warning"
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                value={mobile}
                type="text"
                sx={{ pb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+62</InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Password"
                variant="outlined"
                color="warning"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type={!showPassword ? 'password' : 'text'}
                sx={{ pb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Tampilkan Password"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {!showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                color="primary"
                sx={{ height: '2.5rem', borderRadius: '2rem' }}
                fullWidth
                disabled={submitDisable}
                variant="contained"
                onClick={handleSubmit}
              >
                {labelSubmit}
              </Button>
              <Typography
                color={theme.palette.text.secondary}
                sx={{ textAlign: 'center', marginTop: '1rem' }}
              >
                Sudah punya akun?{' '}
                <Link className={classes.link} to="/login">
                  Login
                </Link>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Registration;
