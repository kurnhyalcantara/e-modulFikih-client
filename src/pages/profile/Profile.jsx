import { Box, Container, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import GeneralInformation from './GeneralInformation';
import EditPassword from './EditPassword';
import './Profile.css';
import Transition from '../../components/transition/Transition';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.element,
  value: PropTypes.number,
  index: PropTypes.number,
};

const Profile = () => {
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
            top: { xs: '70px', md: '102px' },
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
            <GeneralInformation />
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
