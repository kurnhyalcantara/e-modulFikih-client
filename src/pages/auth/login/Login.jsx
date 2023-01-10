import { useState } from "react";
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
  FormHelperText,
} from "@mui/material";
import { ReactComponent as LoginBanner } from "../../../assets/login-banner.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  AdornmentInputPassword,
  BootstrapedInput,
} from "../../../components/Input/BootstrapedInput";
import "./Login.css";
import Transition from "../../../components/transition/Transition";
import { useEffect } from "react";

const Login = () => {
  const theme = useTheme();
  const [mobile, setMobile] = useState("");
  const [errorMobile, setErrorMobile] = useState(false);
  const [errorMobileMsg, setErrorMobileMsg] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorHelperPassword, setErrorHelperPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [labelSubmit, setLabelSubmit] = useState("Masuk");
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
    setLabelSubmit("Loading");
    try {
      await axios
        .post(
          "https://api-fikih-mts-bontouse.herokuapp.com/api/student/login",
          {
            mobile: mobile,
            password: password,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            const { data } = res;
            localStorage.setItem("AUTH", JSON.stringify(data));
            toast.success("Login berhasil");
            setSubmitDisable(false);
            setLabelSubmit("Masuk");
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 2000);
          }
        });
    } catch (error) {
      setSubmitDisable(false);
      setLabelSubmit("Masuk");
      switch (error.response.data.id) {
        case "account_not_registered":
          setErrorMobile(true);
          setErrorMobileMsg(error.response.data.msg);
          break;
        case "wrong_password":
          setErrorPassword(true);
          setErrorHelperPassword(error.response.data.msg);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (!mobile || !password || password.length < 4) {
      setSubmitDisable(true);
    } else {
      setSubmitDisable(false);
    }
  }, [mobile, password]);

  return (
    <Transition>
      <Box className="container">
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid
              item
              md={7}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <LoginBanner className="banner-auth" />
            </Grid>
            <Grid item md={5} xs={12}>
              <Box
                sx={{
                  maxWidth: "28rem",
                  margin: "0 auto",
                  padding: {
                    xs: "0",
                    md: "2.5rem",
                  },
                  border: {
                    xs: "none",
                    md: "1px solid #e6e6e6",
                  },
                  borderRadius: "0.5rem",
                  background: "#fff",
                }}
              >
                <form id="login-submit">
                  <Typography
                    variant="h4"
                    fontWeight="700"
                    color={theme.palette.text.primary}
                    textAlign="center"
                  >
                    Halo!
                  </Typography>
                  <Typography
                    color={theme.palette.text.secondary}
                    textAlign="center"
                    marginBottom={5}
                  >
                    Masuk untuk belajar sekarang
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="standard"
                    error={errorMobile}
                    sx={{ marginTop: "1rem" }}
                  >
                    <InputLabel
                      shrink
                      htmlFor="nis-login-input"
                      sx={{ fontWeight: "700" }}
                    >
                      No. HP
                    </InputLabel>
                    <BootstrapedInput
                      id="nis-login-input"
                      variant="outlined"
                      type="text"
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                      value={mobile}
                      error={errorMobile}
                      onFocus={() => {
                        setErrorMobile(false);
                      }}
                    />
                    <FormHelperText
                      id="componentMobileInput"
                      hidden={!errorMobile}
                    >
                      {errorMobileMsg}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth
                    variant="standard"
                    sx={{ marginTop: "1rem" }}
                    error={errorPassword}
                  >
                    <InputLabel
                      shrink
                      htmlFor="password-input"
                      sx={{ fontWeight: "700" }}
                    >
                      Password
                    </InputLabel>
                    <div className="container-input-adornment">
                      <AdornmentInputPassword
                        fullWidth
                        id="password-input"
                        variant="outlined"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        value={password}
                        type={!showPassword ? "password" : "text"}
                        error={errorPassword}
                        onFocus={() => {
                          setErrorPassword(false);
                        }}
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
                    <FormHelperText
                      id="helper-password"
                      hidden={!errorPassword}
                    >
                      {errorHelperPassword}
                    </FormHelperText>
                  </FormControl>

                  <Button
                    color="primary"
                    className="bootstraped-button"
                    sx={{ margin: "1rem 0" }}
                    fullWidth
                    disabled={submitDisable}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    {labelSubmit}
                  </Button>
                  <Typography
                    color={theme.palette.text.secondary}
                    sx={{ textAlign: "center" }}
                  >
                    Belum punya akun? <Link to="/registration">Daftar</Link>
                  </Typography>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Transition>
  );
};

export default Login;
