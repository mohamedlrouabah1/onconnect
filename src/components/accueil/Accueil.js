import React, { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Card,
  Button,
  Form,
  Dropdown,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import {
  FaTwitter,
  FaTelegramPlane,
  FaWhatsapp,
  FaEnvelope,
  FaLink,
  FaEllipsisH,
} from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import {
  getAllAnnonces,
  createAnnonce,
  updateAnnonce,
  deleteAnnonce,
} from "../utils/api/APIUtils";
import { useNavigate } from 'react-router-dom';

import "./Accueil.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import moreIcon from "../../images/accueil/more-details-annonce.svg";
import shareIcon from "../../images/accueil/more-info-annonce.svg";
import Header from "../header/Header";
const Accueil = ({ isSidebarOpen, currentUser }) => {
  const [annonces, setAnnonces] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAnnonce, setNewAnnonce] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    // ... autres champs
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentAnnonce, setCurrentAnnonce] = useState({});
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // const cachedAnnonces = localStorage.getItem("annonces");

    // if (cachedAnnonces) {
    //   setAnnonces(JSON.parse(cachedAnnonces));
    // } else {
      getAllAnnonces()
        .then((data) => {
          setAnnonces(data);
          console.log("Annonces:", data);
          // localStorage.setItem("annonces", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des annonces:", error);
        });
    // }
    filterAnnonces();
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filterAnnonces = () => {
    const currentDate = new Date();

    // Logique de filtrage en fonction de 'filter'
    const filteredAnnonces = annonces.filter((annonce) => {
      switch (filter) {
        case 'short':
          // Filtrer les annonces dont la période est inférieure à 24 heures
          return (
            annonce.deadline &&
            (new Date(annonce.deadline) - currentDate) / (1000 * 60 * 60) <= 24
          );
        case 'medium':
          // Filtrer les annonces dont la période est entre 24 et 72 heures
          return (
            annonce.deadline &&
            (new Date(annonce.deadline) - currentDate) / (1000 * 60 * 60) > 24 &&
            (new Date(annonce.deadline) - currentDate) / (1000 * 60 * 60) <= 72
          );
        case 'long':
          // Filtrer les annonces dont la période est supérieure à 72 heures
          return (
            annonce.deadline &&
            (new Date(annonce.deadline) - currentDate) / (1000 * 60 * 60) > 72
          );
        default:
          // 'all' - Aucun filtre, afficher toutes les annonces
          return true;
      }
    });

    // Mettre à jour les annonces filtrées
    setAnnonces(filteredAnnonces);
  };

  const [showShareModal, setShowShareModal] = useState(false);
  const [link] = useState(
    "https://www.figma.com/file/NIFVhYyR9mAQasassdsada/Share..."
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const annonceData = {
      ...newAnnonce,
      creatorAccountId: currentUser.id,
    };

    createAnnonce(annonceData)
      .then((data) => {
        const updatedAnnonces = [...annonces, data];
        setAnnonces(updatedAnnonces);
        localStorage.setItem("annonces", JSON.stringify(updatedAnnonces)); // Mise à jour du localStorage
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'annonce:", error);
      });
  };
  const openDetailModal = (annonce) => {
    setCurrentAnnonce(annonce);
    setShowDetailModal(true);
  };
  const handleUpdate = (e) => {
    e.preventDefault();

    if (selectedAnnonce.creatorAccountId !== currentUser.id) {
      alert(
        "Vous n'êtes pas le créateur de cette annonce et ne pouvez donc pas la mettre à jour."
      );
      return;
    }

    const updatedAnnonce = {
      title: selectedAnnonce.title,
      description: selectedAnnonce.description,
    };

    updateAnnonce(updatedAnnonce, selectedAnnonce.id)
      .then((data) => {
        const updatedAnnonces = annonces.map((annonce) =>
          annonce.id === data.id ? data : annonce
        );
        setAnnonces(updatedAnnonces);
        localStorage.setItem("annonces", JSON.stringify(updatedAnnonces));
        setShowUpdateModal(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'annonce:", error);
      });
  };

  const handleDelete = () => {
    if (selectedAnnonce.creatorAccountId !== currentUser.id) {
      alert(
        "Vous n'êtes pas le créateur de cette annonce et ne pouvez donc pas la supprimer."
      );
      return;
    }

    deleteAnnonce(selectedAnnonce.id)
      .then(() => {
        const updatedAnnonces = annonces.filter(
          (annonce) => annonce.id !== selectedAnnonce.id
        );
        setAnnonces(updatedAnnonces);
        localStorage.setItem("annonces", JSON.stringify(updatedAnnonces));
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'annonce:", error);
        alert(
          "Erreur lors de la suppression de l'annonce. Veuillez réessayer."
        );
      });
  };
  let navigate = useNavigate();

  const linkToDetails = (annonceId) => {
    console.log('Annonce ID before navigating:', annonceId);
    navigate(`/onconnect/annonces/${annonceId}`);
      // window.location.href = `/annonces`;
  };
  return (
    <div className={`home-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* <h2>Welcome to Accueil!</h2>
      <Button onClick={() => setShowForm(true)}>Créer une nouvelle annonce</Button> */}
      {/* <Header handleFilterChange={handleFilterChange} /> */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Créer une nouvelle annonce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                value={newAnnonce.title}
                onChange={(e) =>
                  setNewAnnonce({ ...newAnnonce, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newAnnonce.description}
                onChange={(e) =>
                  setNewAnnonce({
                    ...newAnnonce,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            {/* ... autres champs du formulaire */}
            <Button type="submit">Soumettre</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="annonces-container ">
        <Row xs={1} md={3} lg={4} className="g-4">
          {annonces.map((annonce, index) => (
            <Col key={index}>
              <Card
                className="card-hover"
                onClick={() => linkToDetails(annonce.id)}
              >
                <div
                  className="card-background"
                  style={{ backgroundImage: `url(${annonce.image})` }}
                ></div>
                <Card.Img
                  variant="top"
                  src={annonce.image}
                  className="card-img-custom"
                />
                <div onClick={(e) => e.stopPropagation()}>
                  <Card.Body className="left-content-accueil text-light">
                    <Card.Title>{annonce.title}</Card.Title>
                    <Card.Text className="text-white-50">Nom de la marque</Card.Text>
                  </Card.Body>
                  <Card.Footer >
                      <Row>
                        <Col sm={10} className="left-content-accueil text-light">
                          <Row>
                            <Card.Subtitle>text</Card.Subtitle>
                          </Row>
                          <Row>
                            <Card.Text className="text-white-50">Subtitle</Card.Text>
                          </Row>
                        </Col>
                        <Col sm={2}>
                          <Dropdown>
                            <Dropdown.Toggle
                              as="a"
                              bsPrefix="p-0"
                              className="dropdown-button"
                            >
                              <img
                                src={moreIcon}
                                alt="More"
                                className="actions-image"
                              />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => {
                                  setSelectedAnnonce(annonce);
                                  setShowUpdateModal(true);
                                }}
                              >
                                Update
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  setSelectedAnnonce(annonce);
                                  setShowDeleteModal(true);
                                }}
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <Dropdown>
                            <Dropdown.Toggle
                              as="a"
                              bsPrefix="p-0"
                              className="dropdown-button"
                            >
                              <img
                                src={shareIcon}
                                alt="More"
                                className="actions-image"
                              />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => setShowShareModal(true)}
                              >
                                Share
                              </Dropdown.Item>
                              {/* Autres items de la dropdown */}
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>
                      </Row>
                  </Card.Footer>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {/* Modal pour les détails de l'annonce */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        centered
        size="lg"
        className="detail-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new button to application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-top-section">
            <img
              src={currentAnnonce.image}
              alt="Annonce"
              className="modal-annonce-image"
            />
            <h5>{currentAnnonce.title}</h5>
            <p className="text-muted">Published {currentAnnonce.publishDate}</p>
            <p>{currentAnnonce.description}</p>
            {/* Ajouter plus de détails de l'annonce ici si nécessaire */}
          </div>
          <div className="modal-bottom-section">
            {/* Ici, ajoutez des actions ou d'autres informations complémentaires */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary">Back</Button> */}
          <Button variant="primary">Let's do it!</Button>
        </Modal.Footer>
      </Modal>

      {/* SHARE ANNONCE MODAL  */}
      <Modal show={showShareModal} onHide={() => setShowShareModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Share with</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center">
            <Col xs={4} md={2} className="social-icon">
              <IoChatbubbles />
            </Col>
            <Col xs={4} md={2} className="social-icon">
              <FaTelegramPlane />
            </Col>
            <Col xs={4} md={2} className="social-icon">
              <FaTwitter />
            </Col>
            <Col xs={4} md={2} className="social-icon">
              <FaWhatsapp />
            </Col>
            <Col xs={4} md={2} className="social-icon">
              <FaEnvelope />
            </Col>
            <Col xs={4} md={2} className="social-icon">
              <FaEllipsisH />
            </Col>
          </Row>
          <div className="text-center mt-3 mb-2">Or share with link</div>
          <InputGroup className="mb-3">
            <FormControl value={link} readOnly />
            <InputGroup.Text className="copy-link-icon">
              <FaLink onClick={() => navigator.clipboard.writeText(link)} />
            </InputGroup.Text>
          </InputGroup>
        </Modal.Body>
      </Modal>
      {/* UPDATE ANNONCE MODAL  */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Annonce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group>
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                value={selectedAnnonce?.title || ""}
                onChange={(e) =>
                  setSelectedAnnonce((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={selectedAnnonce?.description || ""}
                onChange={(e) =>
                  setSelectedAnnonce((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Button type="submit">Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* MODAL DE CONFIRMATION DE SUPPRESSION */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cette annonce ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Accueil;
