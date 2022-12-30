import {
  Avatar,
  Badge,
  Box,
  Button,
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
import React, { useContext, useEffect, useState } from 'react';

import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
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
  const [image] = useState({});
  const [labelSubmit, setLabelSubmit] = useState('Simpan');
  const [submitDisable, setSubmitDisable] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitDisable(true);
    setLabelSubmit('Loading');
    await axios
      .put(
        `http://localhost:4000/api/student/profile/update_data/${user._id}`,
        {
          namaLengkap: namaLengkap,
          namaPanggilan: namaPanggilan,
          sekolah: sekolah,
          kelas: kelas,
          nis: nis,
          mobile: mobile,
          tanggalLahir: tanggalLahir,
          jenisKelamin: jenisKelamin,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success('Data profil telah diperbarui');
          window.location.reload();
        }
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
        setSubmitDisable(false);
        setLabelSubmit('Simpan');
      });
  };

  useEffect(() => {
    if (user) {
      setNamaLengkap(user.namaLengkap);
      setNamaPanggilan(user.namaPanggilan);
      setSekolah(user.sekolah);
      setKelas(user.kelas);
      setNis(user.nis);
      setMobile(user.mobile);
      setTanggalLahir(user.tanggalLahir);
      setJenisKelamin(user.jenisKelamin);
    }
  }, [user]);

  return (
    <Box className="general-information-container">
      <Box className="avatar-container">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <IconButton
              color="primary"
              aria-label="Upload Foto Profile"
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
      </Box>
      <form
        id="edit-profile-form"
        className="edit-information-container"
        onSubmit={handleSubmit}
      >
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
            className="edit-information-input"
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
            className="edit-information-input"
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
            className="edit-information-input"
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
            input={<SelectInputStyled className="edit-information-input" />}
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
            className="edit-information-input"
          />
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel shrink htmlFor="phone-input" sx={{ fontWeight: '700' }}>
            Nomor Telepon <span style={{ color: 'red' }}>*</span>
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
            sx={{ marginTop: '1rem' }}
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
          type="submit"
        >
          {labelSubmit}
        </Button>
      </form>
    </Box>
  );
};

export default GeneralInformation;
