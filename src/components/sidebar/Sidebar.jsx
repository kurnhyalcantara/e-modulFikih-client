import React, { useContext } from 'react';
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { IconButton, Button, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';

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
  const theme = useTheme();
  const logo =
    'https://firebasestorage.googleapis.com/v0/b/fikih-mtsbontouse.appspot.com/o/Icons%2Ficon-72x72.png?alt=media&token=7c559bc1-872f-4ba2-b3bd-5d8c0cee5c29';
  const List = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {listBox.map((list, i) => (
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
          {List('left')}
          <Divider variant="middle" />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
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
