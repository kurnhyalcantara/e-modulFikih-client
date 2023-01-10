import { Container } from "@mui/material";
import InstructionCourses from "./instructionCourses/InstructionCourses";
import { useStyle } from "./styles";

const InstructorDashboard = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <InstructionCourses />
      </Container>
    </div>
  );
};

export default InstructorDashboard;
