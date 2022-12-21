/* eslint-disable no-unused-vars */
import {
  Container,
  Grid,
  Typography,
  Box,
  useTheme,
  Grow,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import CoursesTab from './CoursesTab/CoursesTab';
import InstallPWA from '../../utils/InstallPWA/InstallPWA';
import './Home.css';
import OurFeature from './OurFeature/OurFeature';

const Home = () => {
  const theme = useTheme();
  const state = useContext(GlobalState);
  const [find, setFind] = useState('');
  const [search, setSearch] = state.courseAPI.search;
  const history = useNavigate();

  const handleSearch = () => {
    history('/courses');
    setSearch(find);
  };

  useEffect(() => {
    setSearch('');
  }, [setSearch]);

  return (
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
          <InstallPWA></InstallPWA>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grow in>
            <img
              className="image"
              src="https://i.ibb.co/QPZ8m1t/Group-7501.png"
              alt="Group-750"
              border="0"
            />
          </Grow>
        </Grid>
      </Grid>
      <Box className="container-section">
        <OurFeature />
      </Box>
      <Box className="container-section">
        <CoursesTab />
      </Box>
    </Container>
  );
};

export default Home;
