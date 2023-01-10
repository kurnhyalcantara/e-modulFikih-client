import { LocalActivityRounded } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import Transition from "../../components/transition/Transition";
import "./Dashboard.css";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const state = useContext(GlobalState);
  const [list] = state.userAPI.list;
  const [user] = state.userAPI.user;

  return (
    <Transition>
      <Box className="dashboard-container">
        <Box className="jumbotron">
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              fontWeight="800"
              color="#fff"
              marginY="0.2rem"
            >
              Selamat Datang {user?.namaPanggilan ?? user.namaLengkap}
            </Typography>
            <Typography color="#fff" component="p">
              Semoga aktivitas belajarmu menyenangkan
            </Typography>
          </Container>
        </Box>
        <Container maxWidth="lg" className="student-activity">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className="learning-path">
                <Box
                  className="heading-card"
                  display="flex"
                  alignItems="center"
                >
                  <LocalActivityRounded
                    sx={{ marginRight: "0.5rem" }}
                  ></LocalActivityRounded>
                  <Typography>Aktivitas Belajar</Typography>
                </Box>
                {list.length ? (
                  <Box className="content-card">
                    {list.map((enrolled, index) => {
                      return (
                        <Box className="course-enrolled" key={index}>
                          <Box id="status-enrolled">
                            <Typography fontSize="14px" fontWeight="700">
                              Sedang Dipelajari
                            </Typography>
                            <Typography>
                              {enrolled?.courseDetails?.title}
                            </Typography>
                          </Box>
                          <Box id="open-enrolled">
                            <Typography
                              color="primary"
                              component={Link}
                              to={`/corridor/${enrolled?.courseDetails._id}`}
                            >
                              Lanjutkan
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                ) : (
                  <Box className="content-card">
                    <Link to={`/courses`}>Cari Materi</Link>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="other-activity">
                <Box className="heading-card">Aktivitas Lain </Box>
                <Box className="content-card">Semua Aktivitas</Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Transition>
  );
};

export default Dashboard;
