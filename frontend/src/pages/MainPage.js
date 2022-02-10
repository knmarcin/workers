import React from "react";
import WorkerList from "../components/WorkerList";
import Report from "../components/Report";
import Container from "react-bootstrap/Container";

const MainPage = () => {
  return (
    <Container>
      <WorkerList />
      <Report />
    </Container>
  );
};

export default MainPage;
