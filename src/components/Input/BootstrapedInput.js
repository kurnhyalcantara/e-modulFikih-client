import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const BootstrapedInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    border: "1px solid #dcdcdc",
    borderRadius: "0.5rem",
    position: "relative",
    height: "3rem",
    padding: "0 1rem",
    backgroundColor: "#fff",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  },
}));

export const SelectInputStyled = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
    color: theme.palette.text.primary,
  },
  "& .MuiInputBase-input": {
    border: "1px solid #dcdcdc",
    borderRadius: "0.5rem",
    position: "relative",
    padding: "0.8rem 1rem",
    backgroundColor: "#fff",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      borderRadius: "0.5rem",
    },
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  },
}));

export const AdornmentInputPhone = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    border: "1px solid #dcdcdc",
    borderTopRightRadius: "0.5rem",
    borderBottomRightRadius: "0.5rem",
    padding: "0.8rem 1rem",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  },
}));

export const AdornmentInputPassword = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    border: "1px solid #dcdcdc",
    borderRadius: "0.5rem",
    padding: "0.8rem 1rem",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  },
}));
