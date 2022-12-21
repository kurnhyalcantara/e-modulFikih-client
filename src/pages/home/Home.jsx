/* eslint-disable no-unused-vars */
import {
  Container,
  Grid,
  InputBase,
  Button,
  IconButton,
  Typography,
  Box,
  useTheme,
  Grow,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import CarouselCards from './CarouselCards/CarouselCards';
import CoursesTab from './CoursesTab/CoursesTab';
import { useStyle } from './styles';
import InstallPWA from '../../utils/InstallPWA/InstallPWA';
import './Home.css';
import OurFeature from './OurFeature/OurFeature';

const Home = () => {
  const classes = useStyle();
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
        <Typography
          variant="h3"
          className="courses-tab-header"
          color={theme.palette.text.primary}
        >
          Tersedia Materi Untuk Setiap Jenjang Kelas
        </Typography>
        <CoursesTab />
      </Box>
      <div className={classes.background}>
        <Container maxWidth="xl">
          <CarouselCards />
        </Container>
      </div>
      {/* first div */}
      {/* <Container>
        <Grid className={classes.banner} container spacing={5}>
          <Grid item xs={12} md={6}>
            <img
              className={classes.image}
              src="https://i.ibb.co/VpbLtjx/Group-781.png"
              alt="Group-750"
              border="0"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <span className={classes.headertxt}>E earning System</span>
            <span className={classes.thbodytxts}>
              Get unlimited access to 6,000+ of Elearns top courses for your
              team. Learn and improve skills across business, tech, design, and
              more.
            </span> */}
      {/* <div className={classes.buttons}>
              <Button
                component={Link}
                to="/courses"
                className={classes.clkbtn}
                sx={{
                  borderRadius: 28,
                  backgroundColor: '#EA5252',
                  width: '100%',
                  padding: '5px 0 5px 0',
                }}
              > */}{' '}
      {/* <span className={classes.buttontxt}> Start Elearn Business</span> */}
      {/* <span className={classes.buttontxt}> Start Learning</span>
              </Button>
              <br />
            </div>
          </Grid>
        </Grid>
      </Container> */}
      {/* second div */}
      {/* <Container>
        <Grid className={classes.banner} container spacing={5}>
          <Grid item xs={12} md={6}>
            <span className={classes.headertxt}>Become an instructor</span>
            <span className={classes.thbodytxt}>
              Instructors from around the world teach millions of students on
              Elearn. We provide the tools and skills to teach what you love.
            </span>
            <div className={classes.buttons}>
              <Button
                component={Link}
                to="/"
                className={classes.clkbtn}
                sx={{
                  borderRadius: 28,
                  backgroundColor: '#EA5252',
                  width: '100%',
                  padding: '5px 0 5px 0',
                }}
              >
                {' '}
                <span className={classes.buttontxt}> Start Teaching Today</span>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              className={classes.image}
              src="https://i.ibb.co/VptJkRf/Group-1722.png"
              alt="Group-750"
              border="0"
            />
          </Grid>
        </Grid>
      </Container> */}
      {/* third div */}
      {/* <Container>
        <Grid className={classes.banner} container spacing={5}>
          <Grid item xs={12} md={6}>
            <img
              className={classes.image}
              src="https://i.ibb.co/Zmqt28T/Group-777.png"
              alt="Group-750"
              border="0"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <span className={classes.headertxt}>
              Transform your life through education
            </span>
            <span className={classes.thbodytxt}>
              Learners around the world are launching new careers, advancing in
              their fields, and enriching their lives.
            </span>
            <div className={classes.buttons}>
              <Button
                component={Link}
                to="/"
                className={classes.clkbtn}
                sx={{
                  borderRadius: 28,
                  backgroundColor: '#EA5252',
                  width: '100%',
                  padding: '5px 0 5px 0',
                }}
              >
                {' '}
                <span className={classes.buttontxt}>
                  {' '}
                  Start Elearn Business
                </span>
              </Button>
              <br />
            </div>
          </Grid>
        </Grid>
      </Container> */}
      {/* What to expect from a Elearn course */}
      <div className={classes.expectcontainer}>
        <h2 className={classes.expect}>
          Apa yang bisa kamu dapat dari E-Modul ini?
        </h2>

        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid className={classes.expectcardin} container spacing={5}>
                <Grid item xs={1}>
                  <img
                    className={classes.expectcardimage}
                    src="https://i.ibb.co/60WVLwS/Vector.png"
                    alt=""
                  />
                </Grid>
                <Grid item xs={10}>
                  <span className={classes.expectcardinh}>
                    Belajar dengan kecepatanmu sendiri
                  </span>
                  <p className={classes.expectcardinp}>
                    Nikmati pembelajaran dari rumah tanpa mengatur jadwal dan
                    mudah untuk mengikuti metode yang diberikan
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid className={classes.expectcardin} container spacing={5}>
                <Grid item xs={1}>
                  <img
                    className={classes.expectcardimage}
                    src="https://i.ibb.co/549zSVP/Vector1.png"
                    alt=""
                  />
                </Grid>
                <Grid item xs={10}>
                  <span className={classes.expectcardinh}>
                    Video pembahasan yang relevan
                  </span>
                  <p className={classes.expectcardinp}>
                    Video dengan kualitas terbaik, jadi kamu akan mendapatkan
                    penjelasan detail. Dengan akses tanpa berbatas waktu, kamu
                    dapat menontonnya sesering mungkin, bahkan saat kamu tidak
                    punya akses internet
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid className={classes.expectcardin} container spacing={5}>
                <Grid item xs={1}>
                  <img
                    className={classes.expectcardimage}
                    src="https://i.ibb.co/zQ8NhhZ/Vector3.png"
                    alt=""
                  />
                </Grid>
                <Grid item xs={10}>
                  <span className={classes.expectcardinh}>
                    Asah Pemahaman dengan Latihan Soal
                  </span>
                  <p className={classes.expectcardinp}>
                    Ketahui sejauh mana pemahaman dan kemampuanmu dalam menjawab
                    soal yang ada
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid className={classes.expectcardin} container spacing={5}>
                <Grid item xs={1}>
                  <img
                    className={classes.expectcardimage}
                    src="https://i.ibb.co/qD8bJVN/Vector.png"
                    alt=""
                  />
                </Grid>
                <Grid item xs={10}>
                  <span className={classes.expectcardinh}>Multi Platform</span>
                  <p className={classes.expectcardinp}>
                    E-Modul ini dapat diakses baik di Laptop maupun Smartphone.
                    Anda pun juga bisa menginstallnya tanpa perlu mengingat link
                    yang diberikan
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Container>
  );
};

export default Home;
