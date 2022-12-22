import { Box, Container, Divider, Grid, Link, Typography } from '@mui/material';
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
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <Typography
            color={theme.palette.primary.main}
            fontWeight="900"
            fontSize="32px"
          >
            Fikih MTs Bontouse
          </Typography>
        </Grid>

        <Grid item xs={12} md={3} className="footer-section">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Link display="block" underline="none" href="/blog">
                Blog
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link display="block" underline="none" href="/about">
                Tentang
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} className="footer-section">
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
    </Box>
    // <div className={classes.footer}>
    //   <Container maxWidth="xl">
    //     <Grid container spacing={2}>
    //       <Grid item xs={12} md={5}>
    //         Copyright © Kurniawan 2022
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </div>
  );
};

export default Footer;
