/* eslint-disable no-unused-vars */
import {
  Container,
  Grid,
  Typography,
  Box,
  useTheme,
  Grow,
  Button,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import CoursesTab from './CoursesTab';
import OurFeature from './OurFeature';
import InstallPWA from '../../utils/InstallPWA/InstallPWA';
import './Home.css';
import Transition from '../../components/transition/Transition';

const Home = () => {
  const theme = useTheme();
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;

  return (
    <Transition>
      <Box>
        <Container maxWidth="xl">
          <Grid className="about-section" container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
                fontWeight="900"
                color={theme.palette.primary.main}
              >
                Gapai Mimpimu
              </Typography>
              <Typography
                sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
                fontWeight="900"
                color={theme.palette.text.primary}
              >
                Belajar Dimanapun
              </Typography>
              <Typography color={theme.palette.text.secondary}>
                Modul Pembelajaran Fikih Berbasis <em>Progressive Web Apps </em>
                untuk siswa MTs As'adiyah No. 2 Bontouse
              </Typography>
              <Grid container spacing={1} sx={{ marginY: '1.5rem' }}>
                <Grid item xs={6}>
                  <InstallPWA></InstallPWA>
                </Grid>
                {isLogged ? null : (
                  <Grid
                    item
                    xs={6}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                  >
                    <Button
                      className="rounded-button login-button"
                      component={Link}
                      to="/login"
                    >
                      Login
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grow in>
                <Box
                  component="img"
                  className="image"
                  src="https://i.ibb.co/QPZ8m1t/Group-7501.png"
                  alt="Group-750"
                  border="0"
                  sx={{
                    display: 'block',
                    margin: '0 auto',
                    width: { md: '100%', xs: '90%' },
                  }}
                />
              </Grow>
            </Grid>
          </Grid>
        </Container>
        <Box className="container-section">
          <OurFeature />
        </Box>
        <Box className="container-section">
          <CoursesTab />
        </Box>
      </Box>
    </Transition>
  );
};

export default Home;
