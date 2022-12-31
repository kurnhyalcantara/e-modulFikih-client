import { Box, Card, CardContent, Paper, Typography } from '@mui/material';
import Carousel from 'react-grid-carousel';
import PropTypes from 'prop-types';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

const fasility = [
  {
    name: 'Materi',
    brief: 'Materi akan disajikan dengan menarik dan mudah dipahami',
  },
  {
    name: 'Video Penjelasan',
    brief:
      'Beberapa materi disajikan dengan video penjelasan agar mempermudah pemahaman peserta didik',
  },
  {
    name: 'Kuis',
    brief:
      'Di sela-sela pembelajaran, akan ada beberapa soal yang akan dijawab oleh peserta didik',
  },
  {
    name: 'Ujian',
    brief: 'Uji pengetahuanmu dengan mengerjakan soal-soal ujian',
  },
];

const DeskripsiCourse = ({ item }) => {
  const description = `${item?.courseDetails?.description}`;
  return (
    <Paper className="container-detail-course">
      <Box className="container-description">
        <h2>Deskripsi</h2>
        <ReactMarkdown remarkPlugin={[remarkGfm]}>{description}</ReactMarkdown>
      </Box>
      <Box className="container-description">
        <h2>Tujuan Pembelajaran</h2>
        <p>
          Setelah mengikuti pembelajaran pada materi ini, diakhir peserta didik
          diharapkan:
        </p>
        <ul>
          {item?.courseDetails?.indikatorPencapaianKompetensi &&
            item?.courseDetails?.indikatorPencapaianKompetensi.map(
              (ipk, index) => {
                return <li key={index}>{ipk}</li>;
              }
            )}
        </ul>
      </Box>
      <Box className="container-description">
        <h2>Metode Ajar</h2>
        <ul className="metode-ajar-style">
          {item?.courseDetails?.metode &&
            item?.courseDetails?.metode.map((list, index) => {
              return <li key={index}>{list}</li>;
            })}
        </ul>
      </Box>
      <Box className="container-description">
        <h2>Fasilitas Belajar</h2>
        <Carousel cols={4} rows={1} gap={20} loop>
          {fasility.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <Card sx={{ borderRadius: '0.5rem' }} variant="outlined">
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography component="p" color="disabled">
                      {item.brief}
                    </Typography>
                  </CardContent>
                </Card>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Box>
    </Paper>
  );
};

DeskripsiCourse.propTypes = {
  item: PropTypes.object,
};

export default DeskripsiCourse;
