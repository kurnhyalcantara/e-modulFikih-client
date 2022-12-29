import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import {
  IconButton,
  Button,
  useTheme,
  ListItemAvatar,
  Avatar,
  ListItemButton,
} from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import {
  Menu,
  HomeRounded,
  PersonRounded,
  LocalLibraryRounded,
  ArticleRounded,
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const mainMenu = [
  {
    name: 'Materi',
    route: '/courses',
    icon: <LocalLibraryRounded />,
  },
  {
    name: 'Blog',
    route: '/blog',
    icon: <ArticleRounded />,
  },
];

const userMenu = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    icon: <HomeRounded />,
  },
  {
    name: 'Profil Saya',
    route: '/profile',
    icon: <PersonRounded />,
  },
];

const joinMenu = userMenu.concat(mainMenu);

const Sidebar = ({ toggleDrawer, drawer }) => {
  const theme = useTheme();
  const navigation = useNavigate();
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [user] = state.userAPI.user;
  const logo =
    'https://firebasestorage.googleapis.com/v0/b/fikih-mtsbontouse.appspot.com/o/Icons%2Ficon-72x72.png?alt=media&token=7c559bc1-872f-4ba2-b3bd-5d8c0cee5c29';

  const getYear = () => {
    return new Date().getFullYear();
  };

  const listMainMenu = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      sx={{ width: '250px' }}
    >
      <List>
        {mainMenu.map((list, i) => (
          <ListItemButton component={Link} to={list.route} key={i}>
            <ListItemIcon sx={{ color: `${theme.palette.primary.main}` }}>
              {list.icon}
            </ListItemIcon>
            <ListItemText>
              <Typography color={theme.palette.text.primary} fontWeight="700">
                {list.name}
              </Typography>
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  const listUserNav = (anchor) => (
    <Box
      sx={{ width: '250px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {joinMenu.map((list, i) => {
          return (
            <ListItemButton component={Link} to={list.route} key={i}>
              <ListItemIcon sx={{ color: `${theme.palette.primary.main}` }}>
                {list.icon}
              </ListItemIcon>
              <ListItemText>
                <Typography color={theme.palette.text.primary} fontWeight="700">
                  {list.name}
                </Typography>
              </ListItemText>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <IconButton onClick={toggleDrawer('left', true)}>
        <Menu />
      </IconButton>
      <Drawer
        anchor={'left'}
        open={drawer['left']}
        onClose={toggleDrawer('left', false)}
      >
        <Box display="flex" alignItems="center" paddingY={1.5}>
          <img
            style={{ padding: '12px', width: '40px', height: '40px' }}
            src={logo}
            alt="logo"
          />
          <Box display="flex" flexDirection="column">
            <Typography color={theme.palette.primary.main} fontWeight="900">
              Fikih MTs Bontouse
            </Typography>
            <Typography
              id="version"
              color={theme.palette.text.primary}
              fontSize="12px"
              fontWeight="700"
            >
              versi 0.1.0 (testing)
            </Typography>
          </Box>
        </Box>
        <Divider variant="middle" />
        {isLogged ? listUserNav('left') : listMainMenu('left')}
        <Box alignItems="center" justifyContent="center" padding="1.5rem">
          {!isLogged && (
            <Button
              className="rounded-button"
              component={Link}
              to="/login"
              onClick={toggleDrawer('left', false)}
              onKeyDown={toggleDrawer('left', false)}
              fullWidth
            >
              Masuk
            </Button>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            height: '100%',
            padding: '0.8rem',
          }}
        >
          <Typography
            color={theme.palette.text.secondary}
            fontSize="12px"
            textAlign="center"
          >
            Powered by Kurniawan &copy; {getYear()} <br />
            Mahasiswa IAI As'adiyah Sengkang
          </Typography>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default Sidebar;
