import { Box, Paper, Typography } from '@mui/material';

const DeskripsiCourse = (course) => {
  return (
    <Paper className="container-detail-course-description">
      <Box className="title-heading">
        <Typography variant="h4">{course?.courseDetails?.title}</Typography>
        <Typography variant="h6">{course?.courseDetails?.category}</Typography>
      </Box>
    </Paper>
  );
};

export default DeskripsiCourse;
