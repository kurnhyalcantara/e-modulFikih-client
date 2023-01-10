import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PropTypes from "prop-types";
import { useStyle } from "./styles";
import { Button } from "@mui/material";
import { GlobalState } from "../../../../GlobalState";

const StudentTask = ({ _id, title, description, start, end, submissions }) => {
  const classes = useStyle();
  const state = useContext(GlobalState);
  const [user] = state.userAPI.user;
  const [submitted, setSubmitted] = useState(false);
  const [mark, setMark] = useState("");

  useEffect(() => {
    const found = submissions.filter((item) => {
      return item.student._id === user._id;
    });
    if (found.length > 0) {
      setSubmitted(true);
      const marks = found[0].marks;
      setMark(marks);
    }
  }, [submissions, user._id]);

  return (
    <div className={classes.root}>
      <div className={classes.taskWrapper}>
        <div className={classes.headingWrapper}>
          <h2 className={classes.taskhead}>
            <AssignmentIcon /> {title}
          </h2>
          {mark && <p>Mark: {mark}</p>}
        </div>
        <div className={classes.taskcontent}>
          <div>
            <div className={classes.taskcontenttxt}>{description}</div>
            <div className={classes.footer}>
              <div>
                <div className={classes.start}>Starts : {start}</div>
                <div className={classes.end}>Ends : {end}</div>
              </div>
              {!submitted ? (
                <Button
                  sx={{ my: 1, color: "#000" }}
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/task_submission/${_id}`}
                  style={{
                    backgroundColor: "#EEE",
                    textTransform: "none",
                  }}
                >
                  Submit Task
                </Button>
              ) : (
                <Button
                  sx={{ my: 1, color: "red" }}
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#EEE",
                    textTransform: "none",
                  }}
                >
                  Submitted
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StudentTask.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  submissions: PropTypes.array,
};

export default StudentTask;
