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
} from '@mui/material';
import axios from 'axios';
import React, { Fragment, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import AccountMenu from '../account_menu/AccountMenu';
import Sidebar from '../sidebar/Sidebar';
import { useTheme } from '@mui/material/styles';
import { BootstrapedInput } from '../Input/BootstrapedInput';

const Navbar = () => {
  const theme = useTheme();
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [search, setSearch] = state.courseAPI.search;
  const [user] = state.userAPI.user;
  const history = useNavigate();
  const logo =
    'https://firebasestorage.googleapis.com/v0/b/fikih-mtsbontouse.appspot.com/o/Icons%2Ficon-72x72.png?alt=media&token=7c559bc1-872f-4ba2-b3bd-5d8c0cee5c29';

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const logOut = async () => {
    await axios.get(
      'https://fikih-mtsbontouse-backend.herokuapp.com/api/logout'
    );
    localStorage.clear();
    setIsLogged(false);
    window.location.href = '/';
    // closeMobileMenu();
  };

  const [drawer, setDrawer] = useState({
    left: false,
  });

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
    <AppBar
      elevation={0}
      color="inherit"
      position="fixed"
      sx={{ filter: 'drop-shadow(0 8px 15px rgba(0,14,61,.08))' }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}
        >
          {/* For Mobile View */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Sidebar drawer={drawer} toggleDrawer={toggleDrawer} />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <Link to="/">
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
            >
              Fikih MTs Bontouse
            </Typography>
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
            >
              Blog
            </Typography>
            <Typography
              className="menuButton-Navbar"
              color={theme.palette.text.primary}
              component={Link}
              to="/job_view"
            >
              Creator
            </Typography>
            {isLogged ? (
              <Fragment>
                <AccountMenu logOut={logOut} />
                {user.type === 'instructor' && user.status === true ? (
                  <Sidebar drawer={drawer} toggleDrawer={toggleDrawer} />
                ) : null}
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
