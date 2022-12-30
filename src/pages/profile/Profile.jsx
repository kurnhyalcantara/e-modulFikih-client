import { Box, Container, Tab, Tabs } from '@mui/material';
import React, { useContext } from 'react';
import { useState } from 'react';
import GeneralInformation from './GeneralInformation';
import EditPassword from './EditPassword';
import './Profile.css';
import Transition from '../../components/transition/Transition';
import { GlobalState } from '../../GlobalState';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const Profile = () => {
  const state = useContext(GlobalState);
  const [user] = state.userAPI.user;
  const [tabContext, setTabContext] = useState(0);
  return (
    <Transition>
      <Box className="pattern-banner">Pengaturan Akun</Box>
      <Container maxWidth="md">
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            position: 'sticky',
            top: '70px',
            zIndex: '24',
            background: '#fff',
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
        <Box className="box-container-nav-profile">
          <TabPanel value={tabContext} index={0}>
            <GeneralInformation user={user} />
          </TabPanel>
          <TabPanel value={tabContext} index={1}>
            <EditPassword />
          </TabPanel>
        </Box>
      </Container>
    </Transition>
  );
};

export default Profile;
