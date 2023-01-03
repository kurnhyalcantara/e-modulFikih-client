import {
  Box,
  Button,
  MobileStepper,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";

const SingleMateri = () => {
  const theme = useTheme();
  const { courseId } = useParams();
  const [activeStep] = useState(0);
  const [lesson, setLesson] = useState([]);

  useEffect(() => {
    const getCourseLesson = async () => {
      if (courseId) {
        await axios
          .get(`http://localhost:4000/course_details/${courseId}`)
          .then((res) => {
            setLesson(res?.data?.courseDetails?.lesson);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getCourseLesson;
  }, [courseId]);

  return (
    <Box className="single-materi-container" sx={{ flexGrow: 1 }}>
      <Paper square elevation={0} className="heading-materi">
        <Typography>{lesson[activeStep].label}</Typography>
      </Paper>
      <Paper square className="content-materi">
        {parse(lesson[activeStep].description)}
      </Paper>
      <MobileStepper
        variant="text"
        steps={lesson.length}
        position="static"
        active={activeStep}
        nextButton={
          <Button size="small" disabled={activeStep === lesson.length - 1}>
            {lesson[activeStep + 1].label ?? "Next"}
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeftRounded />
            ) : (
              <KeyboardArrowRightRounded />
            )}
          </Button>
        }
        backButton={
          <Button size="disabled" disabled={activeStep === 0}>
            {lesson[activeStep - 1].label ?? "Back"}
            {theme.direction === "rtl" ? (
              <KeyboardArrowRightRounded />
            ) : (
              <KeyboardArrowLeftRounded />
            )}
          </Button>
        }
      ></MobileStepper>
    </Box>
  );
};

export default SingleMateri;
