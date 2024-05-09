import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Tabs,
  Tab,
  Accordion,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Facturation.scss";
import logo from "../../images/sidebar/logo-no-background.svg";
const Facturation = () => {
  const [key, setKey] = useState("info");
  const [factureInfo, setFactureInfo] = useState({
    missionTitle: "",
    clientName: "",
    facturationStatus: "",
    creationDate: new Date().toLocaleDateString(),
    amount: 0,
    dueDate: new Date().toLocaleDateString(),
    logo: null,
    color: "#000000", // Default color
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFactureInfo({ ...factureInfo, [name]: value });
  };

  const handleFileChange = (event) => {
    setFactureInfo({ ...factureInfo, logo: event.target.files[0] });
  };

  const handleColorChange = (color) => {
    setFactureInfo({ ...factureInfo, color });
  };

  const handleBackClick = () => {
    if (key === "logo") setKey("info");
    if (key === "color") setKey("logo");
  };

  const handleNextClick = () => {
    if (key === "info") setKey("logo");
    if (key === "logo") setKey("color");
  };

  return (
    <Row>
      <Col xs={12} md={6}>
        <FactureForm
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onColorChange={handleColorChange}
          factureInfo={factureInfo}
          activeTab={key}
          setActiveTab={setKey}
          onBackClick={handleBackClick}
          onNextClick={handleNextClick}
        />
      </Col>
      <Col xs={12} md={6}>
        <FacturePreview factureInfo={factureInfo} />
      </Col>
    </Row>
  );
};
export default Facturation;

const FactureForm = ({
  onInputChange,
  onFileChange,
  onColorChange,
  factureInfo,
  onBackClick,
  onNextClick,
  activeTab,
  setActiveTab,
}) => {
  const handleSelect = (key) => {
    setActiveTab(key);
  };

  return (
    <Card className="facture-form">
      <Accordion
        activeKey={activeTab}
        onSelect={handleSelect}
      >
        <Accordion.Item eventKey="info">
          <Accordion.Header>Information</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group controlId="formMissionTitle">
                <Form.Label>Titre de la mission</Form.Label>
                <Form.Control
                  type="text"
                  name="missionTitle"
                  value={factureInfo.missionTitle}
                  onChange={onInputChange}
                  placeholder="Titre de la mission"
                />
              </Form.Group>
              <Form.Group controlId="formClientName">
                <Form.Label>Nom du client</Form.Label>
                <Form.Control
                  type="text"
                  name="clientName"
                  value={factureInfo.clientName}
                  onChange={onInputChange}
                  placeholder="Nom du client"
                />
              </Form.Group>
              <Form.Group controlId="formFacturationStatus">
                <Form.Label>Statut de la facturation</Form.Label>
                <Form.Control
                  as="select"
                  name="facturationStatus"
                  value={factureInfo.facturationStatus}
                  onChange={onInputChange}
                >
                  <option value="">Choisir...</option>
                  <option value="draft">Brouillon</option>
                  <option value="sent">Envoyée</option>
                  <option value="paid">Payée</option>
                  <option value="overdue">overdue</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formAmount">
                <Form.Label>Montant</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={factureInfo.amount}
                  onChange={onInputChange}
                  placeholder="Montant"
                />
              </Form.Group>
              <Form.Group controlId="formDueDate">
                <Form.Label>Date d'échéance</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={factureInfo.dueDate}
                  onChange={onInputChange}
                  placeholder="Date d'échéance"
                />
              </Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="logo">
          <Accordion.Header>Logo</Accordion.Header>
          <Accordion.Body>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Téléchargez votre logo</Form.Label>
              <Form.Control type="file" onChange={onFileChange} />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="color">
          <Accordion.Header>Couleur</Accordion.Header>
          <Accordion.Body>
            <Form.Group controlId="formColorPicker" className="mb-3">
              <Form.Label>Choisissez une couleur</Form.Label>
              <Form.Control
                type="color"
                defaultValue="#000000"
                title="Choose your color"
                onChange={(e) => onColorChange(e.target.value)}
              />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="tab-navigation">
        {activeTab !== "info" && <Button onClick={onBackClick}>Back</Button>}
        {activeTab !== "color" && <Button onClick={onNextClick}>Next</Button>}
      </div>
    </Card>
  );
};

const FacturePreview = ({ factureInfo }) => {
  return (
    <div className="preview-container">
      <div className="preview">
        <div class="invoice-title">
          <h1>INVOICE</h1>
          <p>{factureInfo.creationDate}</p>
        </div>
        <header class="invoice-header">
          <div class="company-info">
            <img src={logo} alt="Company Logo" class="company-logo" />
            <div class="company-address">
              <p>321B Baking Street, Classic Manor</p>
              <p>Phone Number</p>
              <p>(987) 654-3210</p>
            </div>
          </div>

          <div class="client-info">
            <p>To:</p>
            <p>Jonathan Holmes</p>
            <p>567 Furnish Lane, ModernManor</p>
            <p>(123) 456-7892</p>
          </div>
        </header>

        <main class="invoice-main">
          <table class="invoice-table">
            <thead>
              <tr>
                <th>Description of Services/Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>{factureInfo.missionTitle}</p>
                  <ul>
                    <li>Custom website design</li>
                    <li>Responsive layout</li>
                  </ul>
                </td>
                <td>1</td>
                <td>$500.00</td>
                <td>$500.00</td>
              </tr>
            </tbody>
          </table>

          <div class="invoice-summary">
            <p>Subtotal: $1,250.00</p>
            <p>Tax: 10%</p>
            <p>Tax Amount: $125.00</p>
            <div class="total-due">
              <p>Total Amount Due:</p>
              <p>$1,375.00</p>
            </div>
          </div>
        </main>
        <hr className="solid"></hr>
        <footer class="invoice-footer">
          <div class="row">
            <div class="additional-info col-sm">
              <p>Notes:</p>
              <p>
                For any inquiries or disputes, please contact our billing
                department at billing@flameservices.com.
              </p>
            </div>

            <div class="contact-info col-sm">
              <p>(987) 654-3210</p>
              <p>www.flameservices.com</p>
              <p>321B Baking Street, Classic Manor</p>
            </div>
          </div>
          <hr className="solid"></hr>
          <div class="company-representative">
            <p>
              Thank you for your business! Jane Smith Finance Manager Flame
              Services
            </p>
            <p> @Copyright 2023-2024</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
