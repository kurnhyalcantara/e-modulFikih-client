import {
  alpha,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import ProfileLayout from './Profile';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { PhotoCamera } from '@mui/icons-material';
import {
  AdornmentInputPhone,
  BootstrapedInput,
  SelectInputStyled,
} from '../../components/Input/BootstrapedInput';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';

const GeneralInformation = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [user] = state.userAPI.user;

  const [namaLengkap, setNamaLengkap] = useState('');
  const [namaPanggilan, setNamaPanggilan] = useState('');
  const [sekolah, setSekolah] = useState('');
  const [kelas, setKelas] = useState('tujuh');
  const [nis, setNis] = useState('');
  const [mobile, setMobile] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(dayjs('2010-01-01'));
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [labelSubmit, setLabelSubmit] = useState('Simpan');
  const [submitDisable, setSubmitDisable] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append('file', file);
      setLoading(true);
      const res = await axios.post(
        'http://localhost:4000/api/upload',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: token,
          },
        }
      );
      setLoading(false);
      setImage(res.data);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post(
        'http://localhost:4000/api/destroy',
        { public_id: image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? 'block' : 'none',
  };

  const handleSubmit = async () => {
    setSubmitDisable(true);
    setLabelSubmit('Loading');
    axios
      .put(
        `http://localhost:4000/api/student/update_profile/${user._id}`,
        {
          // userName: userName,
          namaLengkap: namaLengkap,
          nis: nis,
          mobile: mobile,
          image: image,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          Swal.fire('Good job!', 'You Update Your Profile', 'success');
        }
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  // useEffect(() => {
  //   if (user) {
  //     setNamaLengkap(user.name);
  //     setNamaPanggilan(user.nickname);
  //     setSekolah(user.sekolah);
  //     setKelas(user.address);
  //     setNis(user.nis);
  //     setMobile(user.mobile);
  //     setTanggalLahir(user.tanggalLahir);
  //     setImage(user.image);
  //   } else {
  //     setNamaLengkap('');
  //     setNamaPanggilan('');
  //     setSekolah('');
  //     setKelas('tujuh');
  //     setNis('');
  //     setMobile('');
  //     setTanggalLahir('');
  //     setImage(false);
  //   }
  // }, [user]);

  return (
    // <ProfileLayout
    //   handleUpload={handleUpload}
    //   loading={loading}
    //   image={image}
    //   styleUpload={styleUpload}
    //   handleDestroy={handleDestroy}
    // >
    <Box>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          }
        >
          <Avatar
            alt={user.name}
            src={!image ? '../../../assets/avatar.svg' : user.image}
            sx={{ width: '5rem', height: '5rem' }}
          />
        </Badge>
      </div>
      <form id="edit-profile-form" style={{ padding: '1.5rem' }}>
        <FormControl fullWidth variant="standard">
          <InputLabel
            shrink
            htmlFor="nama-lengkap-input"
            sx={{ fontWeight: '700' }}
          >
            Nama Lengkap <span style={{ color: 'red' }}>*</span>
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
            htmlFor="nama-panggilan-input"
            sx={{ fontWeight: '700' }}
          >
            Nama Panggilan
          </InputLabel>
          <BootstrapedInput
            id="nama-panggilan-input"
            variant="outlined"
            type="text"
            onChange={(e) => {
              setNamaPanggilan(e.target.value);
            }}
            value={namaPanggilan}
          />
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel shrink htmlFor="sekolah-input" sx={{ fontWeight: '700' }}>
            Sekolah <span style={{ color: 'red' }}>*</span>
          </InputLabel>
          <BootstrapedInput
            id="sekolah-input"
            variant="outlined"
            type="text"
            onChange={(e) => {
              setSekolah(e.target.value);
            }}
            value={sekolah}
          />
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel
            shrink
            htmlFor="class-student-select"
            sx={{ fontWeight: '700' }}
          >
            Pilih Kelas <span style={{ color: 'red' }}>*</span>
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
          <InputLabel shrink htmlFor="nis-input" sx={{ fontWeight: '700' }}>
            NIS <span style={{ color: 'red' }}>*</span>
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
          <InputLabel shrink htmlFor="phone-input" sx={{ fontWeight: '700' }}>
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
        <InputLabel
          shrink
          htmlFor="tanggal-lahir-input"
          sx={{ fontWeight: '700' }}
        >
          Tanggal Lahir
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            fullWidth
            disableFuture
            openTo="year"
            views={['year', 'month', 'day']}
            value={tanggalLahir}
            onChange={(newValue) => {
              setTanggalLahir(newValue);
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
        <FormControl fullWidth variant="standard" sx={{ marginTop: '1rem' }}>
          <InputLabel
            shrink
            htmlFor="jenis-kelamin-input"
            sx={{ fontWeight: '700' }}
          >
            Jenis Kelamin
          </InputLabel>
          <RadioGroup
            row
            id="jenis-kelamin-input"
            value={jenisKelamin}
            onChange={(e) => {
              setJenisKelamin(e.target.value);
            }}
            sx={{ marginTop: '1rem !important' }}
          >
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Laki-Laki"
            />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Perempuan"
            />
          </RadioGroup>
        </FormControl>
        <Button
          color="primary"
          className="bootstraped-button"
          sx={{ margin: '2.5rem 0' }}
          fullWidth
          disabled={submitDisable}
          variant="contained"
          onClick={handleSubmit}
        >
          {labelSubmit}
        </Button>
      </form>
    </Box>
    // </ProfileLayout>
  );
};

export default GeneralInformation;
