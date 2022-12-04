import {
  Box,
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileLayout = ({
  children,
  handleUpload,
  loading,
  image,
  styleUpload,
  handleDestroy,
}) => {
  return (
    <div>
      <div className="pattern-banner">Pengaturan Akun</div>
      <Container sx={{ my: '1.5rem' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box className="box-container-nav-profile">
              <List component="nav" aria-label="Navigation Profile">
                <ListItemButton
                  selected
                  component={Link}
                  to="/profile"
                  sx={{ '&:hover': 'none' }}
                >
                  <ListItemText primary="Edit Profil" />
                </ListItemButton>
                <ListItemButton component={Link} to="/setting">
                  <ListItemText primary="Ubah Password" />
                </ListItemButton>
              </List>
              {/* <div className="user_profile_upload">
                <input
                  type="file"
                  name="file"
                  id="user_file_up"
                  onChange={handleUpload}
                />
                {loading ? (
                  // <LoadingScreen
                  //   loading={loading}
                  //   bgColor="#f1f1f1"
                  //   spinnerColor="#9ee5f8"
                  //   textColor="#676767"
                  //   logoSrc="/logo.png"
                  // />
                  'loading'
                ) : (
                  <div id="user_file_img" style={styleUpload}>
                    <img src={image ? image.url : ''} alt="" />
                    <span onClick={handleDestroy}>X</span>
                  </div>
                )}
              </div>
              <Button
                sx={{ my: 1, color: '#000' }}
                fullWidth
                variant="contained"
                color="primary"
                component={Link}
                to={`/profile`}
                style={{
                  backgroundColor: '#EEE',
                  textTransform: 'none',
                }}
              >
                General Information
              </Button>
              <Button
                sx={{ my: 1, color: '#000' }}
                fullWidth
                component={Link}
                to={`/setting`}
                variant="contained"
                style={{
                  backgroundColor: '#Eee',
                  textTransform: 'none',
                }}
              >
                Setting
              </Button> */}
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className="box-container-nav-profile">{children}</div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProfileLayout;
