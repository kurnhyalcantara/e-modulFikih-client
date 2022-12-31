import StarRateIcon from "@mui/icons-material/StarRate";
import { Avatar, Box, CardContent, CardMedia, Divider, Typography, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Card.css";
import { AccessTimeTwoTone } from "@mui/icons-material";

const Cards = ({ item, type }) => {
  const theme = useTheme();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (item?.comments?.length > 0) {
      const getRating = () => {
        const ratings = item?.comments.map((rating) => rating.rating);
        const total = ratings.reduce((acc, item) => (acc += item), 0).toFixed(1);
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
    <Card className="card" variant="outlined" sx={{ width: { md: "300px", xs: "90%" } }}>
      <CardMedia
        component="img"
        height={140}
        image={
          item?.banner?.url ?? "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
        }
        alt={item?.title ?? "Card Banner"}
      ></CardMedia>
      <CardContent>
        {item?.category.map((tag, i) => {
          return (
            <button className="tag" key={i}>
              {tag}
            </button>
          );
        })}
        <Typography variant="h5" component={Link} className="heading" to={`/${type}/${item?._id}`}>
          {item?.title}
        </Typography>
        <Box className="instructor">
          <Avatar
            alt={item?.instructor?.name}
            img={
              item?.instructor?.img ??
              "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
            }
            sx={{ width: "14px", height: "14px" }}
          ></Avatar>
          <Typography component="p" color={theme.palette.text.secondary} fontSize={12} marginLeft={0.5}>
            {item?.instructor?.name}
          </Typography>
        </Box>
        <Divider></Divider>
        <Box className="info-detail-pelajaran">
          <Box className="alokasi-waktu">
            <AccessTimeTwoTone sx={{ width: "14px", height: "14px" }} color="disabled"></AccessTimeTwoTone>
            <Typography
              component="p"
              color={theme.palette.text.secondary}
              fontSize={12}
              fontWeight="700"
              marginLeft={0.5}
            >
              {`4 x ${item?.alokasiWaktu} Menit (${item?.jumlahPertemuan} Pertemuan)`}
            </Typography>
          </Box>
          <Box className="rating-pelajaran">
            <StarRateIcon className="star-rating" /> <span className="count-rating">{rating ? rating : "0"}+</span>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

Cards.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};
export default Cards;
