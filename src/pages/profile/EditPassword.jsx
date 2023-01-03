import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { toast } from "react-toastify";
import { AdornmentInputPassword } from "../../components/Input/BootstrapedInput";

const GeneralSetting = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [user] = state.userAPI.user;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isErrorOldPassword, setIsErrorOldPassword] = useState(false);
  const [errorOldPasswordMsg, setErrorOldPasswordMsg] = useState("");
  const [submitDisable, setSubmitDisable] = useState(false);
  const [submitLabel, setSubmitLabel] = useState("Ganti Password");

  const handleSubmitChangePassword = async (e) => {
    try {
      e.preventDefault();
      if (newPassword !== confirmNewPassword) {
        return toast.error("Password baru dan konfirmasinya tidak cocok");
      }
      setSubmitDisable(true);
      setSubmitLabel("Loading");
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
            setSubmitLabel("Ganti Password");
          }
        });
    } catch (error) {
      setSubmitDisable(false);
      setSubmitLabel("Ganti Password");
      if (error.response.status === 400) {
        if (error.response.data.id === "old-password-not-match") {
          setIsErrorOldPassword(true);
          setErrorOldPasswordMsg(error.response.data.msg);
        }
      } else {
        toast.error(error.response.data.msg);
      }
    }
  };
  return (
    <Box className="general-information-container">
      <form onSubmit={handleSubmitChangePassword}>
        <FormControl
          fullWidth
          variant="standard"
          className="edit-information-input"
          error={isErrorOldPassword} //TODO: Menambahkan error state handling untuk password lama
          required
        >
          <InputLabel shrink htmlFor="old-password" sx={{ fontWeight: "700" }}>
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
              onFocus={() => {
                setIsErrorOldPassword(false);
              }}
              value={oldPassword}
              type="password"
              error={isErrorOldPassword}
            />
          </div>
          <FormHelperText id="helper-old-password" hidden={!isErrorOldPassword}>
            {errorOldPasswordMsg}
          </FormHelperText>
        </FormControl>
        <FormControl
          fullWidth
          variant="standard"
          className="edit-information-input"
          required
        >
          <InputLabel shrink htmlFor="new-password" sx={{ fontWeight: "700" }}>
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
        <FormControl
          fullWidth
          variant="standard"
          className="edit-information-input"
          required
        >
          <InputLabel
            shrink
            htmlFor="confirm-new-password"
            sx={{ fontWeight: "700" }}
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
          type="submit"
          fullWidth
          variant="contained"
          disabled={submitDisable}
          className="bootstraped-button"
          sx={{ mt: 5 }}
        >
          {submitLabel}
        </Button>
      </form>
    </Box>
  );
};

export default GeneralSetting;
