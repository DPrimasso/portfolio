import React from "react";
import Card from "react-bootstrap/Card";
import {ImAirplane, ImPointRight} from "react-icons/im";
import {MdOutlineSportsSoccer, MdEmojiPeople, MdPeopleAlt, MdPerson4, MdPeople} from "react-icons/md";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="blue">Daniele Primasso </span>
            from <span className="blue"> Castel Goffredo, Italia.</span>
            <br />
            I am currently employed as a software developer at Scaling Parrots.
            <br />
            I have a strong passion for coding, and when i discover new technologies, i love to delve deep and explore what they have to offer
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <MdOutlineSportsSoccer /> Playing Sport
            </li>
            <li className="about-activity">
              <ImAirplane /> Travelling
            </li>
            <li className="about-activity">
              <MdPeople /> Enjoy time with friends
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
