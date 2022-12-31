import { Box, Button, FormControl, InputLabel } from '@mui/material';
import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AdornmentInputPassword } from '../../components/Input/BootstrapedInput';

const GeneralSetting = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [user] = state.userAPI.user;
  const userName = user.userName;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [submitDisable, setSubmitDisable] = useState(false);
  const [submitLabel, setSubmitLabel] = useState('Ganti Password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitDisable(true);
    setSubmitLabel('Loading');
    await axios
      .put(
        `http://localhost:4000/api/student/profile/update_password/${user._id}`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.msg);
          setSubmitDisable(false);
          setSubmitLabel('Ganti Password');
        }
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };
  return (
    <Box className="general-information-container">
      <FormControl fullWidth variant="standard">
        <InputLabel shrink htmlFor="old-password" sx={{ fontWeight: '700' }}>
          Password Lama
        </InputLabel>
        <div className="container-input-adornment">
          <AdornmentInputPassword
            fullWidth
            id="old-password"
            variant="outlined"
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
            value={oldPassword}
            type="password"
          />
        </div>
      </FormControl>
      <FormControl fullWidth variant="standard">
        <InputLabel shrink htmlFor="new-password" sx={{ fontWeight: '700' }}>
          Password Baru
        </InputLabel>
        <div className="container-input-adornment">
          <AdornmentInputPassword
            fullWidth
            id="new-password"
            variant="outlined"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            value={newPassword}
            type="password"
          />
        </div>
      </FormControl>
      <FormControl fullWidth variant="standard">
        <InputLabel
          shrink
          htmlFor="confirm-new-password"
          sx={{ fontWeight: '700' }}
        >
          Konfirmasi Password Baru
        </InputLabel>
        <div className="container-input-adornment">
          <AdornmentInputPassword
            fullWidth
            id="confirm-new-password"
            variant="outlined"
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
            }}
            value={confirmNewPassword}
            type="password"
          />
        </div>
      </FormControl>
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        disabled={submitDisable}
        className="bootstraped-button"
        sx={{ mt: 5 }}
      >
        {submitLabel}
      </Button>
    </Box>
  );
};

export default GeneralSetting;
