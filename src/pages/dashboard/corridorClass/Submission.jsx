import {
  Box,
  Button,
  Divider,
  Grid,
  MobileStepper,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Transition from "../../../components/transition/Transition";
import "./Submission.css";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";

const BoxSoal = ({ active, children }) => {
  return (
    <Box
      className="box-soal"
      bgcolor={active ? "#006f59" : "#fff"}
      color={active ? "#fff" : "#000"}
      width="20px"
      textAlign="center"
    >
      {children}
    </Box>
  );
};

BoxSoal.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.number,
};

const Submission = () => {
  const theme = useTheme();
  const [[mins, secs], setTime] = useState([15, 0]);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (secs === 0) {
        setTime([mins - 1, 59]);
      } else {
        setTime([mins, secs - 1]);
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  });

  const numSoal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <Transition>
      <Box className="submission-container">
        <Box className="timer-submission">
          <Button className="timer" type="button" color="error">
            Sisa Waktu{" "}
            {`${mins.toString().padStart(2, "0")}:${secs
              .toString()
              .padStart(2, "0")}`}
          </Button>
        </Box>
        <Divider></Divider>
        <Box className="category-submission">
          <Typography fontWeight="700">Soal kategori</Typography>
        </Box>
        <Box className="number-submission">
          <Grid container spacing={1}>
            {numSoal.map((num, index) => {
              return (
                <Grid item key={index}>
                  <BoxSoal>{num}</BoxSoal>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Divider></Divider>
        <Box className="soal-submission">
          <Typography className="soal"></Typography>
        </Box>
        <Box className="stepper-flow">
          <MobileStepper
            variant="text"
            steps={15}
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
                disabled={activeStep === 15 - 1}
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
    </Transition>
  );
};

export default Submission;
