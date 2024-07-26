import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.png";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import Aboutcard from "../About/AboutCard";
import laptopImg from "../../Assets/about.png";
import Techstack from "../About/Techstack";
import Toolstack from "../About/Toolstack";
import Home3 from "./Home3";
import ChatBotComponent from "../ChatBot/ChatBotComponent";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> DANIELE PRIMASSO</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
      <Container fluid className="about-section">
        <Particle />
        <Container>

          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
                md={7}
                style={{
                  justifyContent: "center",
                  paddingTop: "30px",
                  paddingBottom: "50px",
                }}
            >
              <h1 style={{ fontSize: "2.1em", paddingBottom: "20px", color: "black"}}>
                Know Who <strong className="blue">I'M</strong>
              </h1>
              <Aboutcard />
            </Col>
            <Col
                md={5}
                style={{ paddingTop: "120px", paddingBottom: "50px" }}
                className="about-img"
            >
              <img src={laptopImg} alt="about" className="img-fluid" />
            </Col>
          </Row>
          <Row style={{ justifyContent: "center", padding: "10px" }}>
            <Col
                md={12}
                style={{
                  justifyContent: "center",
                  paddingTop: "30px",
                  paddingBottom: "50px",
                }}
            >
            </Col>

          </Row>

          <h1 className="project-heading">
            Professional <strong className="blue">Skillset </strong>
          </h1>

          <Techstack/>

          <h1 className="project-heading">
            <strong className="blue">Tools</strong> I use
          </h1>
          <Toolstack/>
        </Container>
      </Container>
      <Home3 />
    </section>
  );
}

export default Home;
