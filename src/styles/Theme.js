import { createTheme } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

export const useTheme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#006f59",
    },
    secondary: {
      main: amber["500"],
    },
    text: {
      primary: "rgba(0, 0, 0, 0.81)",
      secondary: "rgba(0, 0, 0, 0.68)",
      disabled: "rgba(0, 0, 0, 0.48)",
    },
    common: {
      black: "rgba(0, 0, 0, 0.89)",
    },
  },
});
