import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllContrats } from "../utils/api/APIUtils";
import { Container, Table, Badge, Button, Row, Col, InputGroup, FormControl, DropdownButton, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from 'xlsx'; 

const Contrats = ({ currentUser, isSidebarOpen }) => {
  const [contrats, setContrats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [periodFilter, setPeriodFilter] = useState("All");

  useEffect(() => {
    getAllContrats()
      .then((data) => {
        setContrats(data);
      })
      .catch((error) => {
        console.error("Error fetching contrats:", error);
      });
  }, [currentUser]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusSelect = (eventKey) => {
    setStatusFilter(eventKey);
  };

  const handlePeriodSelect = (eventKey) => {
    setPeriodFilter(eventKey);
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "FINISHED":
        return "success";
      case "CANCELED":
        return "danger";
      case "WAITING":
        return "warning";
      default:
        return "secondary";
    }
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredContrats);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contrats");
    XLSX.writeFile(wb, "contrats.xlsx");
  };

  const applyPeriodFilter = (contrat) => {
    
    const creationDate = new Date(contrat.creationDate);
    const now = new Date();

    switch (periodFilter) {
      case 'LastMonth':
        return creationDate >= new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      case 'Last3Months':
        return creationDate >= new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      case 'LastYear':
        return creationDate >= new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      default:
        return true;
    }
  };

  const filteredContrats = contrats.filter((contrat) => {
    const statusMatch = statusFilter === "All" || contrat.status === statusFilter;
    const searchTermMatch = contrat.missionTitle && contrat.missionTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const periodMatch = applyPeriodFilter(contrat);
    
    return statusMatch && searchTermMatch && periodMatch;
  });
  

  return (
    <div  className={`home-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Container fluid>
        {/* <Row>
          <Col>
            <h1>Les Contrats</h1>
          </Col>
        </Row> */}
        <Row className="mb-3">
          <Col xs="auto">
            <DropdownButton id="dropdown-status" title="Status" onSelect={handleStatusSelect}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="FINISHED">Valider</Dropdown.Item>
              <Dropdown.Item eventKey="CANCELED">Rejeter</Dropdown.Item>
              <Dropdown.Item eventKey="WAITING">En attente</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col xs="auto">
            <DropdownButton id="dropdown-period" title="Period" onSelect={handlePeriodSelect}>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="LastMonth">Last Month</Dropdown.Item>
              <Dropdown.Item eventKey="Last3Months">Last 3 Months</Dropdown.Item>
              <Dropdown.Item eventKey="LastYear">Last Year</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col className="text-end">
            <InputGroup>
              <FormControl placeholder="Search" aria-label="Search" onChange={handleSearchChange} />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Button variant="primary" className="me-2" onClick={() => alert("Créer un nouveau contrat")}>
              New
            </Button>
            <Button variant="success" onClick={handleExportExcel}>
              Export Excel
            </Button>
          </Col>
        </Row>
        <Row>
          <Table striped hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Folio No.</th>
                <th>Creation Date</th>
                <th>Developer</th>
                <th>Client</th>
                <th>Annonce Name</th>
                <th>Agenda Name ( pluta mettre l'url comme facturations)</th>
                <th>due Date</th>
                <th>Status</th>
                <th>Facturations</th>
              </tr>
            </thead>
            <tbody>
              {contrats.map((contrat) => (
                <tr key={contrat.id}>
                  <td>{contrat.id}</td>
                  <td>{contrat.creationDate}</td>
                  <td>{contrat.developerName}</td>
                  <td>{contrat.clientName}</td>
                  <td>{contrat.annonceTitle}</td>
                  <td>{contrat.agendaTitle}</td>
                  <td>{contrat.dueDate}</td>
                  <td>
                    <Badge bg={getStatusVariant(contrat.contratStatus)}>{contrat.contratStatus}</Badge>
                  </td>
                  <td>
                  <Link to="/missions">Voir Les missions</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
};

export default Contrats;
//  contrat -> des factures -> leurs details 