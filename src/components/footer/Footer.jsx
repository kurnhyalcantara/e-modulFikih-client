import { Box, Grid, IconButton, Link, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import "./Footer.css";
import { EmailOutlined, Instagram, LocationOnOutlined, WhatsappOutlined } from "@mui/icons-material";

const getYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  const theme = useTheme();
  return (
    <Box className="container-footer">
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <Typography color={theme.palette.primary.main} fontWeight="900" fontSize="32px" marginBottom={2}>
            Fikih MTs Bontouse
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          className="footer-section"
          sx={{ borderTop: { md: "none", xs: "1px solid #e6e6e6" } }}
        >
          <Link display="block" marginY={1.5} color={theme.palette.text.secondary} underline="none" href="/blog">
            Blog
          </Link>
          <Link display="block" marginY={1.5} color={theme.palette.text.secondary} underline="none" href="/about">
            Tentang
          </Link>
          <Link display="block" marginY={1.5} color={theme.palette.text.secondary} underline="none" href="/help">
            Bantuan
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          className="footer-section"
          sx={{ borderTop: { md: "none", xs: "1px solid #e6e6e6" } }}
        >
          <Box className="footer-contact">
            <LocationOnOutlined color="disabled" sx={{ marginRight: "1rem" }} />
            <Typography color={theme.palette.text.secondary}>
              AWATA Jl. Ujungkessi (Samping Barat Mesjid Zam-Zam) Desa Mannagae Kec. Tanasitolo, Wajo SUL-SEL, Indonesia
            </Typography>
          </Box>
          <Box className="footer-contact">
            <EmailOutlined color="disabled" sx={{ marginRight: "1rem" }} />
            <Typography color={theme.palette.text.secondary}>kurnhyalcantara@gmail.com</Typography>
          </Box>
          <Box className="footer-contact">
            <WhatsappOutlined color="disabled" sx={{ marginRight: "1rem" }} />
            <Typography color={theme.palette.text.secondary}>+62 823-7252-7221 (chat only)</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box className="container-branding">
        <Typography color={theme.palette.text.secondary}>{`${getYear()} © Kurniawan `}</Typography>
        <Box className="social-media">
          <IconButton aria-label="@kurnhyalcantara24">
            <Link href="https://instagram.com/kurnhyalcantara24" sx={{ color: "#949494" }} target="_blank">
              <Instagram></Instagram>
            </Link>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
