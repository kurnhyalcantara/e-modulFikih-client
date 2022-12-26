import { Container } from '@mui/material';
import React from 'react';
import StudentCourses from './StudentCourses/StudentCourses';
//import InstructionCoursesCard from './../instrucrorDashboard/instructionCoursesCard/InstructionCoursesCard';

const StudentDashboard = () => {
  return (
    <Container maxWidth="xl">
      <StudentCourses />
    </Container>
  );
};

export default StudentDashboard;
