import { AssignmentOutlined } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Transition from "../../../components/transition/Transition";
import "./CorridorClass.css";

const CorridorClass = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourse = async () => {
      if (courseId) {
        setLoading(true);
        await axios
          .get(
            `https://api-fikih-mts-bontouse.herokuapp.com/api/course_details/${courseId}`
          )
          .then((res) => {
            const { courseDetails } = res.data;
            setCourse(courseDetails);
            setLoading(false);
          });
      }
    };
    getCourse();
  }, [courseId]);
  return (
    <Transition>
      {loading ? (
        <div className="loading">Loading&#8230;</div>
      ) : (
        <Box>
          <Box className="corridor-container">
            <Breadcrumbs>
              <Typography color="text.primary">Progress Belajar</Typography>
              <Typography color="text.secondary">Korridor Kelas</Typography>
            </Breadcrumbs>
            <Typography fontWeight="700" fontSize="1.8rem" marginTop="2rem">
              {course?.title}
            </Typography>
            <Button
              className="bootstraped-button"
              variant="contained"
              sx={{ marginY: "1rem" }}
              component={Link}
              to={`/lesson/${course?._id}`}
            >
              Materi
            </Button>
            <Button
              className="rounded-button"
              sx={{ marginY: "1rem", marginLeft: "1rem" }}
              component={Link}
              to={`/submission/${course?._id}`}
            >
              Ambil ujian
            </Button>
          </Box>
          <Divider />
          <Box className="student-activity">
            <Container maxWidth="lg">
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <Box className="activity-card">
                    <AssignmentOutlined
                      color="primary"
                      sx={{ width: "3rem", height: "3rem" }}
                    ></AssignmentOutlined>
                    <Typography fontWeight="700" marginTop="1.5rem">
                      Riwayat Penilaian
                    </Typography>
                    <Box
                      id="header-penilaian"
                      sx={{
                        display: { md: "flex", xs: "none" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "1.3rem",
                      }}
                    >
                      <Typography
                        fontWeight="700"
                        sx={{ textDecoration: "underline" }}
                      >
                        Ujian
                      </Typography>
                      <Typography
                        fontWeight="700"
                        sx={{ textDecoration: "underline" }}
                      >
                        Nilai
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: { md: "flex", xs: "none" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "1.3rem",
                      }}
                    >
                      <Box id="penilaian-harian">
                        <Typography>Penilaian Harian</Typography>
                        <Typography color="text.secondary">
                          01 Januari 2023
                        </Typography>
                      </Box>
                      <Box id="score">
                        <Typography color="secondary">80%</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: { md: "none", xs: "flex" },
                        flexDirection: "column",
                        marginTop: "1.3rem",
                      }}
                    >
                      <Box id="penilaian-harian">
                        <Typography>Penilaian Harian</Typography>
                        <Typography color="text.secondary">
                          01 Januari 2023
                        </Typography>
                      </Box>
                      <Box id="score">
                        <Typography color="secondary" marginTop="1rem">
                          80%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      )}
    </Transition>
  );
};

CorridorClass.propTypes = {
  course: PropTypes.object,
};

export default CorridorClass;
