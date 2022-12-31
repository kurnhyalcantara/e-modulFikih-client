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

import { GlobalState } from '../../GlobalState';
import { LogoutRounded, SettingsRounded } from '@mui/icons-material';

const AccountMenu = ({ logOut }) => {
  const state = useContext(GlobalState);
  const theme = useTheme();
  const [user] = state.userAPI.user;
  const [isLogged] = state.userAPI.isLogged;
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
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Box className="avatar-penampung">
              <Avatar
                className="avatar-navbar"
                src={user?.image?.url ?? ''}
                alt={user?.namaLengkap}
                sx={{
                  width: { xs: '2rem', md: '2.5rem' },
                  height: { xs: '2rem', md: '2.5rem' },
                }}
              >
                {user?.avatarLetter}
              </Avatar>
            </Box>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open && isLogged}
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
        <MenuItem>
          <ListItemAvatar>
            <Avatar
              src={user?.image?.url ?? ''}
              alt={user?.namaLengkap}
              sx={{
                width: 40,
                height: 40,
              }}
            >
              {user?.avatarLetter}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={user.namaLengkap}
            secondary={`NIS. ${user.nis}`}
            className="namaLengkap-sidebar"
          />
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/profile">
          <ListItemIcon>
            <SettingsRounded />
          </ListItemIcon>
          <ListItemText
            color={theme.palette.text.secondary}
            primary="Pengaturan Profil"
            fontWeight="700"
          />
        </MenuItem>
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <LogoutRounded color="error" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="error">Keluar</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
