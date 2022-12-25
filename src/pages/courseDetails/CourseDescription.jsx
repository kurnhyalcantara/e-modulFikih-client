import { Box, Paper, Typography } from '@mui/material';

const DeskripsiCourse = ({ item }) => {
  return (
    <Paper className="container-detail-course">
      <Box className="container-description">
        <h2>Deskripsi</h2>
        <Typography component="p">{item?.courseDetails?.about}</Typography>
      </Box>
      <Box className="container-description">
        <h2>Tujuan Pembelajaran</h2>
      </Box>
      <Box className="container-description">
        <h2>Metode Ajar</h2>
      </Box>
    </Paper>
  );
};

export default DeskripsiCourse;
