import React, { useEffect, useState } from "react";
import {
  getAllMissions,
  getFacturationByMissionId,
} from "../utils/api/APIUtils";
import {
  Card,
  Badge,
  Button,
  Row,
  Col,
  Modal,
  ModalBody,
} from "react-bootstrap";
// import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEuroSign,
  faDollarSign,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import "./Missions.scss";
import {
  faCheckCircle,
  faTimesCircle,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import Facturation from "../facturation/Facturation";

const InvoiceCard = ({
  missionId,
  // missionRef,
  currentUser,
  isSidebarOpen,
  editorName,
  editTime,
  status,
  amountEUR,
  amountUSD,
  onToggleAdditionalInfo,
  isAdditionalInfoVisible,
}) => {
  const getVariantForStatus = (status) => {
    const baseStyle = {
      display: "inline-flex",
      alignItems: "center",
      padding: "0.25em 0.6em",
      fontSize: "0.875em",
      fontWeight: "500",
      lineHeight: "1",
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "baseline",
      borderRadius: "0.2rem",
      color: "white",
    };

    const statusStyles = {
      IN_PROGRESS: {
        ...baseStyle,
        text: "Waiting for review",
        className: "bg-white border border-warning text-warning",
        icon: faClock,
      },
      FINISHED: {
        ...baseStyle,
        text: "Approved",
        className: "bg-success",
        icon: faCheckCircle,
      },
      CANCELED: {
        ...baseStyle,
        text: "Rejected",
        className: "bg-danger",
        icon: faTimesCircle,
      },
    };

    return statusStyles[status] || statusStyles["default"];
  };
  const [facturation, setFacturation] = useState([]);

  useEffect(() => {
    if (isAdditionalInfoVisible === false) return;
    getFacturationByMissionId(missionId)
      .then((data) => {
        console.log("facturation:", JSON.stringify(data));
        setFacturation(data);
      })
      .catch((error) => {
        console.error("Error fetching facturation:", error);
      });
  }, [missionId, isAdditionalInfoVisible]);

  const getStatusFacturation = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "success";
      case "PROPOSAL":
        return "primary";
      case "REVIEWED":
        return "warning";
      default:
        return "secondary";
    }
  };
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <Card className="mb-2 shadow  bg-white rounded">
        <Card.Body>
          <Row className="justify-content-between align-items-center">
            <Col xs={12} md={8}>
              <Card.Title
                className="text-primary"
                style={{ display: "flex", alignItems: "flex-start" }}
              >
                <Badge bg="primary">Mission</Badge>
                {/* <span bg="white border border-white text-secondary">
                  {missionRef}
                </span> */}
              </Card.Title>

              <Card.Subtitle className="mt-3 left-content text-secondary">
                {editorName} ¤ edited {editTime}
              </Card.Subtitle>
            </Col>
            <Col xs={12} md={3} className="right-content">
              <Card.Text>
                <Badge
                  className={getVariantForStatus(status).className}
                  style={getVariantForStatus(status).style}
                >
                  <FontAwesomeIcon icon={getVariantForStatus(status).icon} />
                  {` ${getVariantForStatus(status).text}`}
                </Badge>
              </Card.Text>

              <Card.Text className="currency-amounts mt-2 text-secondary">
                <FontAwesomeIcon
                  icon={faEuroSign}
                  className="currency-icon me-1"
                />{" "}
                {amountEUR} EUR |{" "}
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="currency-icon me-1"
                />{" "}
                {amountUSD} USD
              </Card.Text>
            </Col>
            <Col xs={12} md={1} className="right-content">
              <Button
                variant="link"
                onClick={onToggleAdditionalInfo}
                className="toggle-info-button"
              >
                <FontAwesomeIcon
                  icon={isAdditionalInfoVisible ? faChevronUp : faChevronRight}
                />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <>
        {isAdditionalInfoVisible && facturation && (
          <Card className="mb-3 additional-info">
            <Card.Body>
              <Table hover>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date</th>
                    {/* <th>Domain</th>
                    <th>Subdomain</th> */}
                    {/* <th>Description</th> */}
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Sub Total</th>
                    <th>Facture</th>
                  </tr>
                </thead>
                <tbody>
                  {facturation ? (
                    facturation.map((facture, index) => (
                      <tr key={index}>
                        <td>{facture.clientName}</td>
                        <td>{facture.creationDate}</td>
                        <td>
                          {" "}
                          <Badge
                            bg={getStatusFacturation(facture.facturationStatus)}
                          >
                            {facture.facturationStatus}
                          </Badge>
                        </td>
                        <td>{facture.dueDate}</td>
                        <td>{facture.amount}</td>
                        <td>
                          <Button variant="link" onClick={handleShowModal}>
                            Voir Facture
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <span className="text-muted">No facturation found</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          size="xl"
          dialogClassName="modal-90w"
        >
          {/* <Modal.Header closeButton>
            <Modal.Title>Facture</Modal.Title>
          </Modal.Header> */}
          <Modal.Body  >
            <Facturation
              currentUser={currentUser}
              isSidebarOpen={isSidebarOpen}
              missionId={missionId}
            />
          </Modal.Body>
        </Modal>
      </>
    </>
  );
};

const Missions = ({ currentUser, isSidebarOpen }) => {
  const [missions, setmissions] = useState([]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(null);

  useEffect(() => {
    getAllMissions()
      .then((data) => {
        console.log("missions:", JSON.stringify(data));
        setmissions(data);
      })
      .catch((error) => {
        console.error("Error fetching missions:", error);
      });
  }, [currentUser]);

  const handleToggleAdditionalInfo = (index) => {
    setShowAdditionalInfo(showAdditionalInfo === index ? null : index);
  };

  return (
    <div className={`home-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* <h1>Missions</h1> */}
      {missions.map((mission, index) => (
        <InvoiceCard
          key={index}
          missionId={mission.id}
          missionRef={mission.missionTitle}
          editorName={mission.developerName}
          // editTime={mission.lastModifiedDate}
          // amountEUR={mission.amountEUR}
          // amountUSD={mission.amountUSD}
          editTime={new Date().toLocaleDateString()}
          status={mission.missionStatus}
          description={mission.description}
          amountEUR={1000}
          amountUSD={1200}
          onToggleAdditionalInfo={() => handleToggleAdditionalInfo(index)}
          isAdditionalInfoVisible={showAdditionalInfo === index}
          currentUser={currentUser}
          isSidebarOpen={isSidebarOpen}
        />
      ))}
    </div>
  );
};

export default Missions;
