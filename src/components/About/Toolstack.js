import React from "react";
import { Col, Row } from "react-bootstrap";
import {
    SiPostman,
    SiSlack,
    SiIntellijidea, SiMattermost, SiOpenai
} from "react-icons/si";
import {BiHardHat} from "react-icons/bi";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiIntellijidea />
          <div className="div-icons">
              Intellij Idea
          </div>
      </Col>
        <Col xs={4} md={2} className="tech-icons">
            <BiHardHat/>
            <div className="div-icons">
                Hardhat
            </div>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
            <SiPostman/>
            <div className="div-icons">
                Postman
            </div>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
            <SiSlack/>
            <div className="div-icons">
                Slack
            </div>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
            <SiMattermost/>
            <div className="div-icons">
                Mattermost
            </div>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
            <SiOpenai/>
            <div className="div-icons">
                OpenAI
            </div>
        </Col>
    </Row>
  );
}

export default Toolstack;
