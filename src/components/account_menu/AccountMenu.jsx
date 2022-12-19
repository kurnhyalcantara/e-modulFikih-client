import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import {
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { GlobalState } from '../../GlobalState';
import { LogoutTwoTone, SettingsTwoTone } from '@mui/icons-material';

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
const AccountMenu = ({ logOut }) => {
  const state = useContext(GlobalState);
  const theme = useTheme();
  const [user] = state.userAPI.user;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="large"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              src="../../assets/avatar.svg"
              sx={{ width: 40, height: 40 }}
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0 8px 15px rgba(0,2,12,.19))',
            p: '1rem',
            borderBottomRightRadius: '0.5rem',
            borderBottomLeftRadius: '0.5rem',
            width: '245px',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user && user.type === 'student' && (
          <MenuItem>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <Typography component={Link} to={`/student_dashboard`}>
              Dashboard
            </Typography>
          </MenuItem>
        )}
        {user && user.type === 'parent' && (
          <MenuItem>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <Typography component={Link} to={`/parent_dashboard`}>
              Dashboard
            </Typography>
          </MenuItem>
        )}
        <MenuItem>
          <ListItemAvatar>
            <Avatar
              src="../../assets/avatar.svg"
              sx={{ width: 40, height: 40 }}
            />
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={`NIS. ${user.nis}`} />
        </MenuItem>
        <Divider />
        {userMenu.map((list, i) => {
          return (
            <MenuItem component={Link} to={list.route} button key={i}>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText
                color={theme.palette.text.secondary}
                primary={list.name}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
