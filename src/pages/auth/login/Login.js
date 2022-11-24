import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  OutlinedInput,
  IconButton,
  useTheme,
  InputAdornment,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useStyle } from './styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const classes = useStyle();
  const theme = useTheme();

  const [role, setRole] = useState('student');
  const [userName, setUserName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role === 'student') {
        await axios
          .post(
            'https://fikih-mtsbontouse-backend.herokuapp.com/api/student/login',
            {
              userName: userName,
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
      } else if (role === 'parent') {
        await axios
          .post(
            'https://fikih-mtsbontouse-backend.herokuapp.com/api/parent/login',
            {
              mobile: mobile,
              password: password,
            }
          )
          .then((res) => {
            if (res.status === 200) {
              const { data } = res;
              window.location.href = '/parent_dashboard';
              localStorage.setItem('AUTH', JSON.stringify(data));
            }
          });
      } else if (role === 'instructor') {
        await axios
          .post(
            'https://fikih-mtsbontouse-backend.herokuapp.com/api/instructor/login',
            {
              userName: userName,
              password: password,
            }
          )
          .then((res) => {
            if (res.status === 200) {
              const { data } = res;
              window.location.href = '/instructor_dashboard';
              localStorage.setItem('AUTH', JSON.stringify(data));
            }
          });
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className={classes.root}>
      <form className={classes.formWrapper}>
        <Typography
          variant="h4"
          className={classes.heading}
          fontWeight="700"
          color={theme.palette.text.primary}
        >
          Halo!
        </Typography>
        <Typography
          className={classes.subheading}
          color={theme.palette.text.secondary}
        >
          Masuk untuk belajar sekarang
        </Typography>
        <FormControl fullWidth sx={{ pb: 2 }}>
          <InputLabel color="primary" id="role-label">
            Sebagai
          </InputLabel>
          <Select
            labelId="role-label"
            id="role-select"
            label="Sebagai"
            color="primary"
            onChange={(e) => {
              setRole(e.target.value);
            }}
            value={role}
          >
            <MenuItem value={'student'}>Siswa</MenuItem>
            <MenuItem value={'parent'}>Orang Tua</MenuItem>
            <MenuItem value={'instructor'}>Guru</MenuItem>
          </Select>
        </FormControl>
        {role === 'parent' ? (
          <TextField
            fullWidth
            id="outlined-basic"
            label="Mobile Number"
            variant="outlined"
            color="primary"
            type="text"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            sx={{ pb: 2 }}
          />
        ) : (
          <TextField
            fullWidth
            id="outlined-basic"
            label="NIS"
            variant="outlined"
            color="primary"
            type="text"
            value={userName}
            required
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            sx={{ pb: 2 }}
          />
        )}
        <FormControl fullWidth variant="outlined">
          <InputLabel color="primary" id="pass-label">
            Password
          </InputLabel>

          <OutlinedInput
            id="password"
            label="Password"
            color="primary"
            type={showPassword ? 'text' : 'password'}
            value={password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Show Password"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            required
          />
        </FormControl>
        <Button
          sx={{
            marginTop: '22px',
            height: '3rem',
            borderRadius: '30px',
          }}
          fullWidth
          onClick={handleSubmit}
          variant="contained"
        >
          Masuk
        </Button>
        <Typography
          className={classes.msg}
          color={theme.palette.text.secondary}
        >
          Belum punya akun?{' '}
          <Link className={classes.link} to="/registration">
            Daftar
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default Login;
