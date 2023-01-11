import ReactPlayer from "react-player";
import { useStyle } from "./styles";
import PropTypes from "prop-types";

const LessonVideo = (props) => {
  const { title, link } = props.videos;
  // const { title } = props.videos;
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <span>Class : {title}</span>
      </div>
      <ReactPlayer url={link} />
    </div>
  );
};

LessonVideo.propTypes = {
  videos: PropTypes.object,
};

export default LessonVideo;
