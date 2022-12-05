import {
  Box,
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GeneralInformation from './generalInformation/GeneralInformation';
import GeneralSetting from './generalSetting/GeneralSetting';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const ProfileUser = () => {
  const [tabContext, setTabContext] = useState(0);
  return (
    <div>
      <div className="pattern-banner">Pengaturan Akun</div>
      <Container sx={{ my: '1.5rem' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box
              className="box-container-nav-profile"
              sx={{ display: { md: 'block', xs: 'none' } }}
            >
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
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Tabs
                value={tabContext}
                onChange={(event, newValue) => {
                  setTabContext(newValue);
                }}
                aria-label="Tabs Navigation Profile"
                variant="fullWidth"
              >
                <Tab label="Edit Profil"></Tab>
                <Tab label="Ubah Password"></Tab>
              </Tabs>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              className="box-container-nav-profile"
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <GeneralInformation />
            </Box>
            <Box
              className="box-container-nav-profile"
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <TabPanel value={tabContext} index={0}>
                <GeneralInformation />
              </TabPanel>
              <TabPanel value={tabContext} index={1}>
                <GeneralSetting />
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProfileUser;
