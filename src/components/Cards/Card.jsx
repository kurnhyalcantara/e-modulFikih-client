import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStyle } from './styles';
import './Card.css';
import { AccessTimeTwoTone, PersonPinTwoTone } from '@mui/icons-material';

const Cards = ({ item, type }) => {
  const classes = useStyle();
  const theme = useTheme();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (item?.comments?.length > 0) {
      const getRating = () => {
        const ratings = item?.comments.map((rating) => rating.rating);
        const total = ratings
          .reduce((acc, item) => (acc += item), 0)
          .toFixed(1);
        const rating = total / ratings.length;
        if (rating > 0) {
          setRating(rating);
        } else {
          setRating(0);
        }
      };
      getRating();
    }
  }, [item]);

  return (
    <div className="container">
      <Card className="card" variant="outlined">
        <CardMedia
          component="img"
          height={140}
          image={
            item?.banner?.url ??
            'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'
          }
          alt={item?.title ?? 'card-image-banner'}
        ></CardMedia>
        <CardContent>
          <button className="tag">{item?.category}</button>
          <h3 className="heading">
            <Typography component={Link} to={`/${type}/${item?._id}`}>
              {item?.title}
            </Typography>
          </h3>
          <div className="lecturer">
            <Avatar
              alt={item?.lecturer?.name ?? 'Kurniawan'}
              img={
                item?.lecturer?.img ??
                'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg'
              }
              sx={{ width: '14px', height: '14px' }}
            ></Avatar>
            <Typography
              component="p"
              color={theme.palette.text.secondary}
              fontSize={12}
              marginLeft={0.5}
            >
              {item?.instructor?.name ?? 'Kurniawan'}
            </Typography>
          </div>
          <Divider></Divider>
          <div className="info-detail-pelajaran">
            <div className="alokasi-waktu">
              <AccessTimeTwoTone
                sx={{ width: '14px', height: '14px' }}
                color="disabled"
              ></AccessTimeTwoTone>
              <Typography
                component="p"
                color={theme.palette.text.primary}
                fontSize={12}
                fontWeight="700"
                marginLeft={0.5}
              >
                {item?.detail?.alokasiWaktu ?? '90 Menit'}
              </Typography>
            </div>
            <div className="rating-pelajaran">
              <StarRateIcon className="star-rating" />{' '}
              <span className="count-rating">{rating ? rating : '0'}+</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
