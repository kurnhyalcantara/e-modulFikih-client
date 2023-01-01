import { Box, Button, Container, Grid, Grow } from "@mui/material";
import { useContext } from "react";
import Filter from "../../components/filter/Filter";
import { GlobalState } from "../../GlobalState";
import Cards from "../../components/Cards/Card";
import SkeletonCourse from "../../components/skeleton/SkeletonCourse";
import "./AllCourse.css";
import Transition from "../../components/transition/Transition";
import { Link } from "react-router-dom";

const AllCourse = () => {
  const state = useContext(GlobalState);
  const [courses] = state.courseAPI.courses;
  const [loading] = state.courseAPI.loading;
  const [page, setPage] = state.courseAPI.page;
  const [result] = state.courseAPI.result;

  return (
    <Transition>
      <Box className="container-course">
        <Container maxWidth="xl">
          <Filter />
          <Grow in>
            <Grid container spacing={3}>
              {courses.map((course, i) => (
                <Grid
                  key={i}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{
                    display: "flex",
                    alignItem: "center",
                    justifyContent: "center",
                  }}
                  component={Link}
                  to={`/details/${course._id}`}
                >
                  <Cards item={course} type="details" />
                </Grid>
              ))}
            </Grid>
          </Grow>
          {courses.length === 0 && <SkeletonCourse loading={loading} />}
          <div className="load_more">
            {result < page * 8 ? (
              ""
            ) : (
              <Button color="primary" sx={{ marginTop: "2.5rem" }} onClick={() => setPage(page + 1)}>
                Load more
              </Button>
            )}
          </div>
        </Container>
      </Box>
    </Transition>
  );
};

export default AllCourse;
