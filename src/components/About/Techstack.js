import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
} from "react-icons/di";
import {
  SiSolidity,
} from "react-icons/si";
import { TbBrandGolang } from "react-icons/tb";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
            <DiJavascript1/>
            <div className="div-icons">
                Javascript
            </div>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
            <TbBrandGolang/>
            <div className="div-icons">
                Golang
            </div>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
            <DiNodejs/>
            <div className="div-icons">
                Node JS
            </div>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
            <DiReact/>
            <div className="div-icons">
                React
            </div>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
            <SiSolidity/>
            <div className="div-icons">
                Solidity
            </div>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
            <DiMongodb/>
            <div className="div-icons">
                MongoDB
            </div>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
            <DiPython/>
            <div className="div-icons">
                Python
            </div>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
            <DiJava/>
            <div className="div-icons">
                Java
            </div>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
            <DiGit/>
            <div className="div-icons">
                Git
            </div>
        </Col>
    </Row>
  );
}

export default Techstack;
