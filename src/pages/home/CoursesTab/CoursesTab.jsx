import React, { useEffect, useState } from 'react';
import { useStyle } from './styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Grow,
  Skeleton,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Cards from '../../../components/Cards/Card';
import './CoursesTab.css';

const CoursesTab = () => {
  const theme = useTheme();
  const classes = useStyle();
  const [tabList, setTabList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [tabContext, setTabContext] = useState(0);
  const [loading, setLoading] = useState(false);

  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div role="tabpanel" hidden={value !== index} {...other}>
        {value === index && <Box>{children}</Box>}
      </div>
    );
  };

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      await axios.get('http://localhost:4000/api/all/course').then((res) => {
        if (res.status === 200) {
          const { courses } = res.data;
          setCourseList(courses);
          let list = [...new Set(courses.map((item) => item.category))];
          setTabList(list);
          setLoading(false);
        }
      });
    };
    getCourses();
  }, []);

  return (
    <Box className="container">
      <Typography
        variant="h3"
        className="courses-tab-header"
        color={theme.palette.text.primary}
      >
        Tersedia Materi Untuk Setiap Jenjang Kelas
      </Typography>
      {loading ? (
        <Grow in>
          <Grid container spacing={4} sx={{ mb: 10, mt: 5 }}>
            {['1', '2', '3', '4'].map((item, i) => (
              <Grid item xs={12} sm={6} lg={3} key={i}>
                <Card variant="outlined">
                  <CardMedia height={140}>
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      height={140}
                      width="100%"
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h5">
                      <Skeleton animation="wave" width="40%" />
                    </Typography>
                    <Typography variant="h5">
                      <Skeleton animation="wave" width="100%" />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grow>
      ) : (
        <div>
          <Box sx={{ borderBottom: 1, borderColor: 'white', mt: '1rem' }}>
            <Tabs
              variant="scrollable"
              className={classes.tabcontainer}
              onChange={(event, newValue) => {
                setTabContext(newValue);
              }}
              value={tabContext}
              indicatorColor="secondary"
            >
              {tabList &&
                tabList.map((item, i) => <Tab label={item} key={i} />)}
            </Tabs>
          </Box>
          {tabList &&
            tabList.map((tab, index) => {
              return (
                <TabPanel key={`tab${index}`} value={tabContext} index={index}>
                  <Grid container spacing={4}>
                    {courseList &&
                      courseList
                        .filter((item, i) => item.category === tab)
                        .slice(0, 4)
                        .map((item, i) => (
                          <Grid
                            item
                            key={`course${i}`}
                            md={3}
                            sx={{ mt: '1.5rem' }}
                          >
                            <Cards key={i} item={item} type="details" />
                          </Grid>
                        ))}
                  </Grid>
                </TabPanel>
              );
            })}
        </div>
      )}
    </Box>
  );
};

export default CoursesTab;
