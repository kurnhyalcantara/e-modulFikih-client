import { Box, Button, MobileStepper, Paper, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import Transition from "../../../components/transition/Transition";
import parse from "html-react-parser";
import "./SingleCourse.css";

const SingleMateri = () => {
  const theme = useTheme();
  const { courseId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [lesson, setLesson] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourseLesson = async () => {
      if (courseId) {
        setLoading(true);
        await axios
          .get(
            `https://api-fikih-mts-bontouse.herokuapp.com/api/lesson/${courseId}`
          )
          .then((res) => {
            const { materi } = res.data.lesson;
            setLesson(materi);
            console.log(materi);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err.response.data.msg);
          });
      }
    };
    getCourseLesson();
  }, [courseId]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Transition>
      {loading ? (
        <div className="loading">Loading&#8230;</div>
      ) : (
        <Box className="single-materi-container">
          <Paper square className="content-materi">
            {lesson[activeStep]?.content && parse(lesson[activeStep]?.content)}
          </Paper>
          <Box className="stepper-flow">
            <MobileStepper
              variant="text"
              steps={lesson.length}
              position="static"
              activeStep={activeStep}
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRightRounded />
                  ) : (
                    <KeyboardArrowLeftRounded />
                  )}
                  Back
                </Button>
              }
              nextButton={
                <Button
                  size="small"
                  disabled={activeStep === lesson.length - 1}
                  onClick={handleNext}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeftRounded />
                  ) : (
                    <KeyboardArrowRightRounded />
                  )}
                </Button>
              }
            ></MobileStepper>
          </Box>
        </Box>
      )}
    </Transition>
  );
};

export default SingleMateri;
