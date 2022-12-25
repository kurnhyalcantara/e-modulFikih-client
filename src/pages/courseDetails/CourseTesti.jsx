import { Avatar, Box, Paper, Rating, Typography } from '@mui/material';

const CourseTesti = ({ item }) => {
  return (
    <Paper className="container-detail-course">
      <Box>
        {item?.courseDetails?.comments &&
          item?.courseDetails?.comments?.length > 0 &&
          item?.courseDetails?.comments?.map((comment, i) => (
            <Box
              key={i}
              sx={{
                border: '1px solid #eee',
                padding: '10px',
                margin: '15px 0',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{ mr: 3 }}
                  alt={comment?.lecturer?.name ?? 'Kurniawan'}
                  img={
                    comment?.lecturer?.img ??
                    'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg'
                  }
                ></Avatar>
                <Typography fontWeight="700" marginRight="1rem">
                  {comment?.author}
                </Typography>
                <Rating value={comment?.rating} readOnly></Rating>
              </Box>
              <Typography paddingLeft={8}>{comment?.comment}</Typography>
            </Box>
          ))}
      </Box>
    </Paper>
  );
};

export default CourseTesti;
