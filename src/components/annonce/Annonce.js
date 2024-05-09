import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShareAlt,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAnnonceById } from "../utils/api/APIUtils";
import "./Annonce.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const Annonce = ({ currentUser, isSidebarOpen }) => {
  const { annonceId } = useParams();

  const [annonce, setAnnonce] = useState({});
  console.log("AnnonceId:", annonceId);

  useEffect(() => {
    getAnnonceById(annonceId)
      .then((data) => {
        console.log("ANNONCE:", JSON.stringify(data));
        setAnnonce(data);
      })
      .catch((error) => {
        console.error("Error fetching ANNONCE:", error);
      });
  }, [currentUser, annonceId]);

  return (
    <div className={`home-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Row md={4}>
        {/* <Row md={4} style={{border:'1px solid gray', marginBottom:'0.5rem', marginLeft:'0.2rem', marginRight:'0.2rem', borderRadius:'0.2rem'}}> */}
        <Col md={6} style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          <img
            src={annonce.image}
            alt="annonce"
            className="img-fluid"
            style={{ borderRadius: "0.5rem" }}
          />
        </Col>
        <Col md={6}>
          <Row style={{ marginTop: "0.5rem" }}>
            <Col>
              <img
                src={annonce.image}
                alt="annonce"
                className="img-fluid"
                style={{ borderRadius: "0.5rem" }}
              />
            </Col>
            <Col>
              <img
                src={annonce.image}
                alt="annonce"
                className="img-fluid"
                style={{ borderRadius: "0.5rem" }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            <Col>
              <img
                src={annonce.image}
                alt="annonce"
                className="img-fluid"
                style={{ borderRadius: "0.5rem" }}
              />
            </Col>
            <Col>
              <img
                src={annonce.image}
                alt="annonce"
                className="img-fluid"
                style={{ borderRadius: "0.5rem" }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row md={8}>
        <Col md={8}>
          <Card>
            <Card.Title
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginLeft: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {annonce.title}
            </Card.Title>
            <Card.Body>
              <Card.Text
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginLeft: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                Description : {annonce.description}
              </Card.Text>
              <Card.Text
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginLeft: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                {/* <FontAwesomeIcon icon={faUtensils} className="me-2" /> */}
                Benefits : {annonce.benefits}
                <br />
                Confidentiality : {annonce.confidentiality}
                {annonce.developerProfile}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>
              <h4>Details</h4>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <strong>Budget: $ {annonce.budget}</strong>
              </Card.Title>
            </Card.Body>
            <Card.Footer>
              <button className="btn btn-outline-dark w-100 my-2">
                <FontAwesomeIcon icon={faHeart} className="me-2" />
                Save
              </button>
              <button className="btn btn-outline-dark w-100 my-2">
                <FontAwesomeIcon icon={faShareAlt} className="me-2" />
                Share
              </button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Annonce;
