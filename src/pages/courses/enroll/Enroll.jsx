import { Box, Button, Divider, Typography } from "@mui/material";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { GlobalState } from "../../../GlobalState";
import { useStyles } from "./styles";
import "./Enroll.css";
import { BootstrapedInput } from "../../../components/Input/BootstrapedInput";
import { toast } from "react-toastify";

const EnrollStudent = () => {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const addList = state.userAPI.addList;
  const [list] = state.userAPI.list;
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [enrolled, setEnrolled] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    await addList(token, course)
      .then((msg) => {
        toast.success(msg);
        setEnrolled(true);
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        setEnrolled(false);
        toast.error(err);
      });
  };

  useEffect(() => {
    const getData = async () => {
      if (courseId) {
        setLoading(true);
        await axios
          .get(`http://localhost:4000/api/course_details/${courseId}`)
          .then((res) => {
            if (res.status === 200) {
              setCourse(res.data);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    const checkEnroll = async () => {
      list.filter((item) => {
        if (item?.courseDetails?._id === course?.courseDetails?._id) {
          return setEnrolled(true);
        } else {
          return setEnrolled(false);
        }
      });
    };

    getData();
    checkEnroll();
  }, [courseId, list, course?.courseDetails?._id]);

  return (
    <Box className="enroll-container">
      {loading ? (
        <div className="loading">Loading&#8230;</div>
      ) : (
        <Box className="form-wrapper">
          <Typography
            variant="h4"
            sx={{ textAlign: { md: "left" } }}
            align="center"
            fontWeight="700"
            marginBottom="1rem"
          >
            Masukkan Token Kelas
          </Typography>
          <Divider />
          <div className="section-enroll">
            <img
              src={course?.courseDetails?.banner?.url}
              className={classes.banner}
              alt="banner"
            />
            <div className={classes.section2}>
              <Typography variant="h6">
                {course?.courseDetails?.title}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {course?.courseDetails?.category}
              </Typography>
            </div>
          </div>
          <Typography variant="subtitle2" color="text.secondary">
            Pengajar
          </Typography>
          <Typography variant="h6">
            {course?.courseDetails?.instructor?.name}
          </Typography>
          <Typography>{course?.courseDetails?.instructor?.mobile}</Typography>
          <Typography>{course?.courseDetails?.instructor?.address}</Typography>
          <Box display="flex" alignItems="center" margin="1rem 0">
            <BootstrapedInput
              placeholder="Masukkan Token"
              sx={{ marginRight: "1rem" }}
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
              }}
            ></BootstrapedInput>
            <Button
              className="bootstraped-button"
              variant="contained"
              disabled={token.length < 5}
              onClick={handleEnroll}
              sx={{ flexGrow: 2 }}
            >
              {enrolled ? "Sukses" : "Proses"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EnrollStudent;
