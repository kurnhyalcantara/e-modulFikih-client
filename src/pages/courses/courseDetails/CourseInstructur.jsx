import { Grid, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";

const CourseInstructur = ({ item }) => {
  return (
    <Paper className="container-detail-course">
      <Grid container spacing={4}>
        <Grid item md={3} xs={12}>
          <img
            src={
              item?.courseDetail?.instructor?.image
                ? item?.instructor?.image?.url
                : "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
            }
            alt="instructor"
            style={{ width: "100%" }}
          />
          <Grid item md={9} xs={12} marginTop="1.5rem">
            <strong>Nama</strong>
            <Typography marginBottom="1rem">
              {item?.courseDetails?.instructor?.name}
            </Typography>
            <strong>Nomor Telepon</strong>
            <Typography marginBottom="1rem">
              {item?.courseDetails?.instructor?.mobile}
            </Typography>
            <strong>Alamat</strong>
            <Typography marginBottom="1rem">
              {item?.courseDetails?.instructor?.address}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

CourseInstructur.propTypes = {
  item: PropTypes.object,
};
export default CourseInstructur;
