import { Avatar, Box, Paper, Rating, Typography } from "@mui/material";
import PropTypes from "prop-types";

const CourseTesti = ({ item }) => {
  return (
    <Paper className="container-detail-course">
      <Box>
        {item?.courseDetails?.testimoni &&
          item?.courseDetails?.testimoni?.length > 0 &&
          item?.courseDetails?.testimoni?.map((testi, i) => (
            <Box
              key={i}
              sx={{
                border: "1px solid #eee",
                padding: "10px",
                margin: "15px 0",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{ mr: 3 }}
                  alt={testi?.author}
                  src={
                    testi?.image?.url ??
                    "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg"
                  }
                ></Avatar>
                <Typography fontWeight="700" marginRight="1rem">
                  {testi?.author}
                </Typography>
                <Rating value={testi?.rating} readOnly></Rating>
              </Box>
              <Typography paddingLeft={8}>{testi?.comment}</Typography>
            </Box>
          ))}
      </Box>
    </Paper>
  );
};

CourseTesti.propTypes = {
  item: PropTypes.object,
};

export default CourseTesti;
