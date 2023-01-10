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
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { PhotoCamera } from "@mui/icons-material";
import {
  AdornmentInputPhone,
  BootstrapedInput,
  SelectInputStyled,
} from "../../components/Input/BootstrapedInput";
import { toCapitalize } from "../../utils/StringModify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const GeneralInformation = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [user] = state.userAPI.user;
  const [namaLengkap, setNamaLengkap] = useState("");
  const [namaPanggilan, setNamaPanggilan] = useState("");
  const [sekolah, setSekolah] = useState("");
  const [kelas, setKelas] = useState("");
  const [nis, setNis] = useState("");
  const [mobile, setMobile] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState(dayjs("2010-01-01"));
  const [jenisKelamin, setJenisKelamin] = useState("male");
  const [image, setImage] = useState({});
  const [avatarLetter, setAvatarLetter] = useState("");
  const [labelSubmit, setLabelSubmit] = useState("Simpan");
  const [submitDisable, setSubmitDisable] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      await toast.promise(
        axios
          .post(
            "https://api-fikih-mts-bontouse.herokuapp.com/api/upload",
            formData,
            {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: token,
              },
            }
          )
          .then((res) => {
            setImage(res.data);
          }),
        {
          pending: "Mengupload Foto Profil",
          success: "Upload Berhasil",
          error: "Upload Gagal",
        }
      );
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitDisable(true);
    setLabelSubmit("Loading");
    await axios
      .put(
        `https://api-fikih-mts-bontouse.herokuapp.com/api/student/profile/update_data/${user._id}`,
        {
          namaLengkap: toCapitalize(namaLengkap),
          namaPanggilan: toCapitalize(namaPanggilan),
          sekolah: toCapitalize(sekolah),
          kelas: kelas,
          nis: nis,
          mobile: mobile,
          tanggalLahir: tanggalLahir,
          jenisKelamin: jenisKelamin,
          image: image,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Data profil telah diperbarui");
          window.location.reload();
        }
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
        setSubmitDisable(false);
        setLabelSubmit("Simpan");
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
      setImage(user.image);
      setAvatarLetter(user.avatarLetter);
    }
  }, [user]);

  return (
    <Box className="general-information-container">
      <Box className="avatar-container">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <IconButton
              color="primary"
              aria-label="Upload Foto Profile"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                name="file"
                id="user_file_up"
                onChange={handleUpload}
              />
              <PhotoCamera />
            </IconButton>
          }
        >
          <Avatar
            alt={namaLengkap}
            src={image ? image.url : "../../../assets/avatar.svg"}
            sx={{ width: "5rem", height: "5rem" }}
          >
            {avatarLetter}
          </Avatar>
        </Badge>
      </Box>
      <form
        id="edit-profile-form"
        className="edit-information-container"
        onSubmit={handleSubmit}
      >
        <FormControl
          fullWidth
          variant="standard"
          className="edit-information-input"
          required
        >
          <InputLabel
            shrink
            htmlFor="nama-lengkap-input"
            sx={{ fontWeight: "700" }}
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
        <FormControl
          fullWidth
          variant="standard"
          className="edit-information-input"
        >
          <InputLabel
            shrink
            htmlFor="nama-panggilan-input"
            sx={{ fontWeight: "700" }}
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
        <FormControl
          fullWidth
          variant="standard"
          className="edit-information-input"
          required
        >
          <InputLabel shrink htmlFor="sekolah-input" sx={{ fontWeight: "700" }}>
            Sekolah
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
        <FormControl
          fullWidth
          variant="standard"
          className="edit-information-input"
          required
        >
          <InputLabel
            shrink
            htmlFor="class-student-select"
            sx={{ fontWeight: "700" }}
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
            <MenuItem value={"tujuh"}>Kelas VII</MenuItem>
            <MenuItem value={"delapan"}>Kelas VIII</MenuItem>
            <MenuItem value={"sembilan"}>Kelas IX</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          variant="standard"
          className="edit-information-input"
          required
        >
          <InputLabel shrink htmlFor="nis-input" sx={{ fontWeight: "700" }}>
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
        <FormControl
          fullWidth
          variant="standard"
          className="edit-information-input"
          required
        >
          <InputLabel shrink htmlFor="phone-input" sx={{ fontWeight: "700" }}>
            Nomor Telepon
          </InputLabel>
          <div className="container-input-adornment">
            <Box
              sx={{
                p: "0.8rem",
                border: "1px solid #dcdcdc",
                borderTopLeftRadius: "0.5rem",
                borderBottomLeftRadius: "0.5rem",
                borderRightColor: "transparent",
              }}
            >
              +62
            </Box>
            <AdornmentInputPhone
              id="phone-input"
              variant="outlined"
              sx={{
                flexGrow: "2",
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
          sx={{ fontWeight: "700" }}
        >
          Tanggal Lahir
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            fullWidth
            disableFuture
            openTo="year"
            views={["year", "month", "day"]}
            value={tanggalLahir}
            onChange={(newValue) => {
              setTanggalLahir(newValue);
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
        <FormControl
          fullWidth
          variant="standard"
          className="edit-information-input"
        >
          <InputLabel
            shrink
            htmlFor="jenis-kelamin-input"
            sx={{ fontWeight: "700" }}
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
            sx={{ marginTop: "1rem" }}
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
          sx={{ margin: "2.5rem 0" }}
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
