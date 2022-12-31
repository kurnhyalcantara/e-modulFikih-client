/* eslint-disable no-unused-vars */
import {
  AppBar,
  Box,
  Button,
  Container,
  InputBase,
  Toolbar,
  Typography,
  Divider,
  Avatar,
} from '@mui/material';
import axios from 'axios';
import React, { Fragment, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import AccountMenu from '../account_menu/AccountMenu';
import Sidebar from '../drawer/Sidebar';
import { useTheme } from '@mui/material/styles';
import { BootstrapedInput } from '../Input/BootstrapedInput';
import './Navbar.css';
import { deepOrange } from '@mui/material/colors';
import { toast } from 'react-toastify';

const Navbar = () => {
  const theme = useTheme();
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [search, setSearch] = state.courseAPI.search;
  const [user] = state.userAPI.user;
  const [drawer, setDrawer] = useState({});
  const history = useNavigate();
  const logo =
    'https://firebasestorage.googleapis.com/v0/b/fikih-mtsbontouse.appspot.com/o/Icons%2Ficon-72x72.png?alt=media&token=7c559bc1-872f-4ba2-b3bd-5d8c0cee5c29';

  const logOut = async () => {
    await axios.get('http://localhost:4000/api/logout');
    localStorage.clear();
    setIsLogged(false);
    toast.success('Logout berhasil');
    history('/login');
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawer({ ...drawer, [anchor]: open });
  };

  const handleChange = (e) => {
    history('/courses');
    setSearch(e.target.value);
  };

  return (
    <AppBar elevation={0} color="inherit" className="appBar">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}
        >
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Sidebar drawer={drawer} toggleDrawer={toggleDrawer} />
          </Box>
          <Box
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <Box sx={{ alignItems: 'center', display: 'flex' }}>
              <Link to="/" display="inline-block">
                <img
                  style={{ padding: '12px', width: '40px', height: '40px' }}
                  src={logo}
                  alt="logo"
                />
              </Link>
              <Typography
                color={theme.palette.primary.main}
                fontWeight="900"
                fontSize="20px"
                to="/"
                component={Link}
                display="inline-block"
              >
                Fikih MTs Bontouse
              </Typography>
            </Box>
            {isLogged ? (
              <Fragment>
                <AccountMenu logOut={logOut}></AccountMenu>
              </Fragment>
            ) : null}
          </Box>
          {/* For Desktop View */}
          <Box
            sx={{
              alignItems: 'center',
              display: { xs: 'none', md: 'flex' },
              padding: '12px',
            }}
          >
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <Typography
              className="menuButton-Navbar"
              color={theme.palette.primary.main}
              fontWeight="900"
              fontSize="25px"
              to="/"
              component={Link}
            >
              Fikih MTs Bontouse
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography
              className="menuButton-Navbar"
              color={theme.palette.text.primary}
              to="/courses"
              component={Link}
              fontWeight="700"
            >
              Materi
            </Typography>
            <BootstrapedInput
              onChange={handleChange}
              placeholder="Cari materi"
            />
            <Typography
              className="menuButton-Navbar"
              color={theme.palette.text.primary}
              to="/blogs"
              component={Link}
              fontWeight="700"
            >
              Blog
            </Typography>
            <Typography
              className="menuButton-Navbar"
              color={theme.palette.text.primary}
              component={Link}
              to="/job_view"
              fontWeight="700"
            >
              Tentang
            </Typography>
            {isLogged ? (
              <Fragment>
                <AccountMenu logOut={logOut} />
              </Fragment>
            ) : (
              <Button className="rounded-button" component={Link} to="/login">
                Masuk
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
