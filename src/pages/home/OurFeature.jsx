import {
  Box,
  Typography,
  Grid,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import { ReactComponent as TimeManagement } from "../../assets/feature-time-management.svg";
import { ReactComponent as ExamOnline } from "../../assets/feature-exam-online.svg";
import { ReactComponent as MultiPlatform } from "../../assets/feature-multi-platform.svg";

const listFeature = [
  {
    image: <TimeManagement className="card-image" />,
    title: "Belajar Dengan Kecepatanmu Sendiri",
    description:
      "Nikmati pembelajaran dari rumah tanpa mengatur jadwal dan mudah untuk mengikuti metode yang diberikan",
  },
  {
    image: <ExamOnline className="card-image" />,
    title: "Latihan Soal",
    description:
      // eslint-disable-next-line max-len
      "Kumpulan bank soal yang bisa diakses untuk memudahkan proses belajar. Bank soal ini juga dilengkapi dengan pembahasan pada setiap soalnya",
  },
  {
    image: <MultiPlatform className="card-image" />,
    title: "Multi Platform",
    description:
      // eslint-disable-next-line max-len
      "E-Modul ini dapat diakses baik di laptop maupun di smartphone. Anda pun juga dapat menginstallnya tanpa perlu mengingat link aplikasinya",
  },
];

const OurFeature = () => {
  const theme = useTheme();
  return (
    <Box className="our-feature">
      <Typography
        className="title-container"
        color={theme.palette.primary.main}
      >
        FITUR KAMI
      </Typography>
      <Typography
        variant="h4"
        fontWeight={700}
        className="header-feature"
        color={theme.palette.text.primary}
        textAlign="center"
      >
        Fitur Kami Siap Membantu Kamu!
      </Typography>
      <Typography
        variant="p"
        color={theme.palette.text.secondary}
        className="description-feature"
      >
        Kami menyediakan fitur-fitur menarik untuk memudahkan proses belajarmu
      </Typography>
      <Grid container spacing={4} sx={{ padding: "2.5rem 2rem" }}>
        {listFeature &&
          listFeature.map((feature, index) => {
            return (
              <Grid item xs={12} md={4} key={index}>
                <Card variant="outlined" className="card-style">
                  <CardContent className="card-feature">
                    {feature.image}
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      textAlign="center"
                      paddingY={2}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="p"
                      color={theme.palette.text.secondary}
                      textAlign="center"
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default OurFeature;
