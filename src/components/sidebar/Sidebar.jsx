import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import {
  IconButton,
  Button,
  useTheme,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import {
  LogoutTwoTone,
  SettingsTwoTone,
  LocalLibraryTwoTone,
  FaceTwoTone,
  ArticleTwoTone,
  Menu,
} from '@mui/icons-material';

const mainMenu = [
  {
    name: 'Materi',
    route: '/courses',
    icon: <LocalLibraryTwoTone />,
  },
  {
    name: 'Blog',
    route: '/blog',
    icon: <ArticleTwoTone />,
  },
  {
    name: 'Profil Creator',
    route: '/job_view',
    icon: <FaceTwoTone />,
  },
];

const userMenu = [
  {
    name: 'Pengaturan Profil',
    route: '/profile',
    icon: <SettingsTwoTone />,
  },
  {
    name: 'Keluar',
    route: '/logout',
    icon: <LogoutTwoTone />,
  },
];

const Sidebar = ({ toggleDrawer, drawer }) => {
  const theme = useTheme();
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [user] = state.userAPI.user;
  const logo =
    'https://firebasestorage.googleapis.com/v0/b/fikih-mtsbontouse.appspot.com/o/Icons%2Ficon-72x72.png?alt=media&token=7c559bc1-872f-4ba2-b3bd-5d8c0cee5c29';
  const listMainMenu = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {mainMenu.map((list, i) => (
          <ListItem component={Link} to={list.route} button key={i}>
            <ListItemIcon sx={{ color: `${theme.palette.primary.main}` }}>
              {list.icon}
            </ListItemIcon>
            <ListItemText
              color={theme.palette.text.primary}
              primary={list.name}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const listUserNav = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              src="../../assets/avatar.svg"
              sx={{ width: 40, height: 40 }}
            ></Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={`NIS. ${user.nis}`} />
        </ListItem>
        {userMenu.map((list, i) => {
          return (
            <ListItem component={Link} to={list.route} button key={i}>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText
                color={theme.palette.text.secondary}
                primary={list.name}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer('left', true)}>
          <Menu />
        </IconButton>
        <Drawer
          anchor={'left'}
          open={drawer['left']}
          onClose={toggleDrawer('left', false)}
        >
          <Box display="flex" alignItems="center">
            <Link to="/">
              <img
                style={{ padding: '12px', width: '40px', height: '40px' }}
                src={logo}
                alt="logo"
              />
            </Link>
            <Box display="flex" flexDirection="column">
              <Typography
                color={theme.palette.primary.main}
                fontWeight="900"
                to="/"
                onClick={toggleDrawer('left', false)}
                onKeyDown={toggleDrawer('left', false)}
                component={Link}
              >
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
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
            display={isLogged ? 'none' : 'flex'}
          >
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
    </div>
  );
};

export default Sidebar;
