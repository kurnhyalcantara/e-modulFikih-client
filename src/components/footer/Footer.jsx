import { Box, Container, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { useStyle } from './styles';
import { useTheme } from '@mui/material/styles';
import './Footer.css';

const Footer = () => {
  const classes = useStyle();
  const theme = useTheme();
  return (
    <Box className="container-footer">
      <div className={classes.footers}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid className={classes.branding} item xs={12} md={5}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    color={theme.palette.primary.main}
                    fontWeight="900"
                    fontSize="32px"
                  >
                    Fikih MTs Bontouse
                  </Typography>
                </Grid>
                <Grid className={classes.description} item xs={12}>
                  Modul Pembelajaran Fikih Berbasis
                  <em> Progressive Web Apps </em>
                  untuk siswa MTs As'adiyah No. 2 Bontouse
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} md={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p className={classes.heading}>Useful Links</p>
                  <Link underline="none" component="button">
                    About us
                  </Link>
                  <br />
                  <Link underline="none" component="button">
                    Work with us
                  </Link>
                  <br />
                  <Link underline="none" component="button">
                    IAI As'adiyah Sengkang
                  </Link>
                  <br />
                  <Link underline="none" component="button">
                    For developers
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              Contact US
              <p className={classes.contact}>
                <LocalPhoneIcon className={classes.ico} /> +62 81920 9382
              </p>
              <p className={classes.contact}>
                <MailOutlineIcon className={classes.ico} />{' '}
                kurnhyalcantara@gmail.com
              </p>
              <p className={classes.contact}>
                <AddLocationIcon className={classes.ico} /> Sengkang, Wajo
              </p>
              <div className={classes.icons}>
                <FacebookIcon className={classes.icon} />
                <TwitterIcon className={classes.icon} />
                <InstagramIcon className={classes.icon} />
                <YouTubeIcon className={classes.icon} />
                <PinterestIcon className={classes.icon} />
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.footer}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              Copyright © Kurniawan 2022
            </Grid>
          </Grid>
        </Container>
      </div>
    </Box>
  );
};

export default Footer;
