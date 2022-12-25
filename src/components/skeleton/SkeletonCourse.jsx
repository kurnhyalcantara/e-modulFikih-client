import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Grow,
  Skeleton,
  Typography,
} from '@mui/material';

function CourseCard() {
  return (
    <Grow in>
      <Grid container spacing={4}>
        {['1', '2', '3', '4', '5', '6', '7', '8'].map((item, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
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
                <Typography variant="p">
                  <Skeleton animation="wave" width="100%" />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
}

export default CourseCard;
