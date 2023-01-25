import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  MobileStepper,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Transition from "../../../components/transition/Transition";
import "./Submission.css";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import { toast } from "react-toastify";

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
  const state = useContext(GlobalState);
  const [token] = state.token;
  const { courseId } = useParams();
  const [[mins, secs], setTime] = useState([10, 0]);
  const [activeStep, setActiveStep] = useState(0);
  const [submission, setSubmission] = useState([]);
  const [jawaban, setJawaban] = useState("");
  const [loading, setLoading] = useState(false);
  const [listJawaban, setListJawaban] = useState([
    {
      activeStep: activeStep,
      jawaban: "",
    },
  ]);
  const submissionLen = submission.length;
  const nomorSoal = new Array(submissionLen);
  const [result, setResult] = useState({
    score: 0,
  });

  for (let i = submissionLen; i > 0; i--) {
    nomorSoal[i - 1] = i;
  }

  const handleNext = async () => {
    let newJawaban = {
      activeStep: activeStep,
      jawaban: jawaban,
    };
    const checkDuplicate = listJawaban.every((jawaban) => {
      return newJawaban.activeStep !== jawaban.activeStep;
    });
    if (checkDuplicate || activeStep === 0) {
      if (activeStep === 0) {
        listJawaban.pop();
      }
      setListJawaban([...listJawaban, { ...newJawaban }]);
      setJawaban("");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (jawaban === submission[activeStep]?.kunci) {
      setResult({
        score: result.score + 1 * 5,
      });
    }
  };

  const handleViewScore = async () => {
    await axios
      .patch(
        `https://api-fikih-mts-bontouse.herokuapp.com/api/task/${courseId}`,
        {
          score: result.score,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        toast.success(res.data.msg);
      });
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

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

  useEffect(() => {
    if (listJawaban) {
      console.log(listJawaban);
    }
  }, [listJawaban]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  useEffect(() => {
    const getTaskLesson = async () => {
      if (courseId) {
        setLoading(true);
        await axios
          .get(
            `https://api-fikih-mts-bontouse.herokuapp.com/api/task/${courseId}`
          )
          .then((res) => {
            const submission = res.data.tasks[0].submission;
            setSubmission(submission);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err.response.data.msg);
          });
      }
    };
    getTaskLesson();
  }, [courseId]);

  return (
    <Transition>
      {loading ? (
        <div className="loading">Loading&#8230;</div>
      ) : (
        <Box className="submission-container">
          <Box className="timer-submission">
            <Button className="timer" type="button" color="error">
              Sisa Waktu{" "}
              {`${mins.toString().padStart(2, "0")}:${secs
                .toString()
                .padStart(2, "0")}`}
            </Button>
          </Box>
          <Box className="number-submission">
            {/* <Grid container spacing={1}>
              {nomorSoal.map((num, index) => {
                return (
                  <Grid item key={index}>
                    <BoxSoal active={mark}>{num}</BoxSoal>
                  </Grid>
                );
              })}
            </Grid> */}
          </Box>
          <Divider></Divider>
          <Box className="soal-submission">
            <Typography className="soal">
              {submission[activeStep]?.soal}
            </Typography>
            <Box className="jawaban">
              <RadioGroup
                name="opsi-jawaban-radio-group"
                onChange={(e) => setJawaban(e.target.value)}
              >
                {submission[activeStep]?.opsi.map((op, index) => {
                  return (
                    <FormControlLabel
                      value={op}
                      label={op}
                      name={submission[activeStep]?.no}
                      key={index}
                      control={<Radio />}
                    ></FormControlLabel>
                  );
                })}
              </RadioGroup>
            </Box>
          </Box>
          <Box className="stepper-flow">
            {activeStep === nomorSoal.length ? (
              <Button
                onClick={handleViewScore}
                className="bootstraped-button"
                variant="contained"
              >
                Lihat Hasil
              </Button>
            ) : (
              <MobileStepper
                variant="text"
                steps={nomorSoal.length}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button size="small" onClick={handleNext}>
                    {activeStep === nomorSoal.length - 1 ? "Finish" : "Next"}
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowLeftRounded />
                    ) : (
                      <KeyboardArrowRightRounded />
                    )}
                  </Button>
                }
                // backButton={
                //   <Button
                //     size="small"
                //     onClick={handleBack}
                //     disabled={activeStep === 0}
                //   >
                //     {theme.direction === "rtl" ? (
                //       <KeyboardArrowRightRounded />
                //     ) : (
                //       <KeyboardArrowLeftRounded />
                //     )}
                //     Back
                //   </Button>
                // }
              ></MobileStepper>
            )}
          </Box>
        </Box>
      )}
    </Transition>
  );
};

export default Submission;
