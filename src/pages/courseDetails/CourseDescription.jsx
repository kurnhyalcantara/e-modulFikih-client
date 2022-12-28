import { Box, Paper, Typography } from '@mui/material';
import MarkDown from 'react-markdown';

const DeskripsiCourse = ({ item }) => {
  console.log(item?.courseDetails?.description);
  return (
    <Paper className="container-detail-course">
      <Box className="container-description">
        <h2>Deskripsi</h2>
        <MarkDown>{item?.courseDetails?.description}</MarkDown>
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
