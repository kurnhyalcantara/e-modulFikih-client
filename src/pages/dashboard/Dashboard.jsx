import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <Box className="dashboardContainer">
      <Box className="jumbotron">
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight="800"
            color="#fff"
            marginY="0.2rem"
          >
            Selamat Datang Kurniawan!
          </Typography>
          <Typography color="#fff" component="p">
            Semoga aktivitas belajarmu menyenangkan
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" className="studentActivity">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box className="learningPath">
              <Box className="headingCard">Aktivitas Belajar</Box>
              <Box className="contentCard">Semua Aktivitas</Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="otherActivity">
              <Box className="headingCard">Aktivitas Lain </Box>
              <Box className="contentCard">Semua Aktivitas</Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
