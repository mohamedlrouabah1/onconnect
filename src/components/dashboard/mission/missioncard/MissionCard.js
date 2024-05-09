import React from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";

import "./MissionCard.scss";

const MissionCardCarousel = ({ mission }) => {
  return (
    <Card
      className={`mission-carousel-card ${
        mission.status === "unpaid" ? "unpaid" : "paid"
      }`}
    >
      <Card.Body>
        <Card.Img variant="top" src={mission.image} className="mission-image" />

        <Card.Title>{mission.title}</Card.Title>
        <Card.Subtitle>
          <Badge>{mission.tag}</Badge>
        </Card.Subtitle>
        <Card.Text style={{ color: "#8F8F8F", fontWeight: "medium" }}>
          {mission.startDate} - {mission.endDate}
        </Card.Text>
        <Card.Text
          style={{ color: mission.status === "unpaid" ? "red" : "green" }}
        >
          {mission.status === "unpaid"
            ? `Unpaid balance: ${mission.balance}`
            : `${mission.balance} Paid`}
        </Card.Text>
        {mission.status === "unpaid" && (
          <Button variant="primary">Send Payment Link</Button>
        )}
      </Card.Body>
    </Card>
  );
};

const MissionCardList = ({ mission }) => {
  return (
    <Card className="mission-container">
      <Row>
        <Col xs={12} md={2}>
          <img
            src={mission.image}
            alt={mission.title}
            className="mission-image"
          />
        </Col>
        <Col xs={12} md={8}>
          <h5 className="slick-left" style={{ marginTop: "0.5rem" }}>
            {mission.title}
          </h5>
          <p className="slick-left">
            <Badge>{mission.tag}</Badge>
          </p>
          <p
            className="slick-left"
            style={{ color: "#8F8F8F", fontWeight: "medium" }}
          >
            {mission.startDate} - {mission.endDate}
          </p>
        </Col>
        <Col xs={12} md={2} className="mission-footer">
          <p
            style={{ color: "black", fontWeight: "bolder", fontSize: "1.5rem" }}
          >
            {mission.balance}
          </p>
          <p style={{ color: "green", fontWeight: "bolder" }}>
            {mission.status === "unpaid" ? `Unpaid` : `Paid`}
          </p>
        </Col>
      </Row>
    </Card>
  );
};

export { MissionCardCarousel, MissionCardList };
