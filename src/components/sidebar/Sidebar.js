import React from 'react';
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { IconButton, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { useStyle } from './styles';

const listBox = [
  {
    name: 'Materi',
    route: '/courses',
    icon: <LocalLibraryTwoToneIcon />,
  },
  {
    name: 'Blog',
    route: '/blog',
    icon: <ArticleTwoToneIcon />,
  },
  {
    name: 'Profil Creator',
    route: '/job_view',
    icon: <FaceTwoToneIcon />,
  },
];

const Sidebar = ({ toggleDrawer, drawer }) => {
  const classes = useStyle();
  const logo =
    'https://firebasestorage.googleapis.com/v0/b/fikih-mtsbontouse.appspot.com/o/Icons%2Ficon-72x72.png?alt=media&token=7c559bc1-872f-4ba2-b3bd-5d8c0cee5c29';
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {listBox.map((list, i) => (
          <ListItem component={Link} to={list.route} button key={i}>
            <ListItemIcon sx={{ color: '#006f59' }}>{list.icon}</ListItemIcon>
            <ListItemText primary={list.name} sx={{ color: '#5b6a72' }} />
          </ListItem>
        ))}
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
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={'left'}
          open={drawer['left']}
          onClose={toggleDrawer('left', false)}
        >
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Link to="/">
              <img
                style={{ padding: '12px', width: '40px', height: '40px' }}
                src={logo}
                alt="logo"
              />
            </Link>
            <Box display="flex" flexDirection="column">
              <Typography
                color="#006f59"
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
                color="#3D3B37"
                fontSize="12px"
                fontWeight="900"
              >
                versi 0.1.0 (testing)
              </Typography>
            </Box>
          </Box>
          <Divider />
          {list('left')}
          <Divider />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              className={classes.login}
              component={Link}
              color="inherit"
              to="/login"
              onClick={toggleDrawer('left', false)}
              onKeyDown={toggleDrawer('left', false)}
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
            <Typography color="#616161" fontSize="11px" textAlign="center">
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
