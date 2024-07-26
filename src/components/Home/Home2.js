import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeMainMe from "../../Assets/home-main_me.png";

import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="blue"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              Hi, I'm Daniele Primasso, a software developer with 7 years of experience, specializing in
              <b className="blue"> backend development </b> and <b className="blue"> blockchain technologies </b>.
              <br />
              <br />I am fluent in classics like
              <i>
                <b className="blue"> Javascript, Go and Solidity. </b>
              </i>
              <br />
              <br />
              My field of Interest's are building new&nbsp;
              <i>
                <b className="blue">Web Technologies and Products </b> and
                also in areas related to{" "}
                <b className="blue">
                  Blockchain.
                </b>
              </i>
              <br />
              <br />
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={homeMainMe} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
