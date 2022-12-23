import { Box, Container, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import GeneralInformation from './GeneralInformation';
import EditPassword from './EditPassword';
import './Profile.css';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const Profile = () => {
  const [tabContext, setTabContext] = useState(0);
  return (
    <Box>
      <Box className="pattern-banner">Pengaturan Akun</Box>
      <Container maxWidth="md">
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tabs
            value={tabContext}
            onChange={(newValue) => {
              setTabContext(newValue);
            }}
            aria-label="Tabs Navigation Profile"
            variant="fullWidth"
          >
            <Tab label="Edit Profil"></Tab>
            <Tab label="Ubah Password"></Tab>
          </Tabs>
        </Box>
        <Box className="box-container-nav-profile">
          <TabPanel value={tabContext} index={0}>
            <GeneralInformation />
          </TabPanel>
          <TabPanel value={tabContext} index={1}>
            <EditPassword />
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
