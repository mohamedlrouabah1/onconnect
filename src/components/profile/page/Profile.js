import React from "react";
import {
  Card,
  Table,
  ListGroup,
  Badge,
  Col,
  Row,
  Dropdown,
} from "react-bootstrap";
import "./Profile.scss";

const Profile = ({ currentUser, isSidebarOpen }) => {
  const handleDelete = () => {
    console.log(`Supprimer le projet avec l'ID : ${projects.id}`);
  };
  const handleEdit = () => {
    console.log(`Modifier le projet avec l'ID : ${projects.id}`);
  };

  const projects = [
    {
      id: 1,
      date: "21 Jun, 2021",
      title: "Marketing",
      description: "Every Marketing Plan Needs",
      status: "Pending",
      assignees: [
        "https://bootdey.com/img/Content/avatar/avatar1.png",
        "https://bootdey.com/img/Content/avatar/avatar1.png",
      ],
    },
    {
      id: 2,
      date: "13 Aug, 2021",
      title: "Website Design",
      description: "Creating the design and layout of a website.",
      status: "Completed",
      assignees: [
        "https://bootdey.com/img/Content/avatar/avatar1.png",
        "https://bootdey.com/img/Content/avatar/avatar2.png",
      ],
    },
    {
      id: 3,
      date: "08 Sep, 2021",
      title: "UI / UX Design",
      description: "Plan and conduct user research and analysis",
      status: "Progress",
      assignees: [
        "https://bootdey.com/img/Content/avatar/avatar3.png",
        "https://bootdey.com/img/Content/avatar/avatar5.png",
        "https://bootdey.com/img/Content/avatar/avatar6.png",
      ],
    },
    {
      id: 4,
      date: "20 Sep, 2021",
      title: "Testing",
      description: "The procurement specifications should describe",
      status: "Pending",
      assignees: ["https://bootdey.com/img/Content/avatar/avatar1.png"],
    },
    {
      id: 5,
      date: "12 April, 2021",
      title: "Typography",
      description: "Typography is the style or appearance of text.",
      status: "Completed",
      assignees: [
        "https://bootdey.com/img/Content/avatar/avatar1.png",
        "https://bootdey.com/img/Content/avatar/avatar5.png",
        "https://bootdey.com/img/Content/avatar/avatar1.png",
      ],
    },
  ];
  return (
    <div className={`home-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Row>
        <Col xl={8}>
          <div className="card">
            <div className="card-body pb-0">
              <Row className="align-items-center">
                <Col md={3}>
                  <div className="text-center border-end">
                    <img
                      src={currentUser.imageUrl}
                      className="img-fluid avatar-xxl rounded-circle"
                      alt=""
                    />
                    <h4 className="text-primary font-size-20 mt-3 mb-2">
                      {currentUser.name}
                    </h4>
                    <h5 className="text-muted font-size-13 mb-0">
                      {currentUser.jobSkills}
                    </h5>
                  </div>
                </Col>
                <Col md={9}>
                  <div className="ms-3">
                    <div>
                      <h4 className="card-title mb-2">Biography</h4>
                      <p className="mb-0 text-muted">
                        Hi I'm Jansh,has been the industry's standard dummy text
                        To an English person alteration text.
                      </p>
                    </div>
                    <div className="row my-4">
                      <Col md={12}>
                        <div>
                          <p className="text-muted mb-2 fw-medium">
                            <i className="mdi mdi-email-outline me-2"></i>
                            {currentUser.email}
                          </p>
                          <p className="text-muted fw-medium mb-0">
                            <i className="mdi mdi-phone-in-talk-outline me-2"></i>
                            +33-{currentUser.phone}
                          </p>
                        </div>
                      </Col>
                    </div>
                    <ul
                      className="nav nav-tabs nav-tabs-custom border-bottom-0 mt-3 nav-justfied"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link px-4 active"
                          data-bs-toggle="tab"
                          href="#projects-tab"
                          role="tab"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          <span className="d-block d-sm-none">
                            <i className="fas fa-home"></i>
                          </span>
                          <span className="d-none d-sm-block">Projects</span>
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link px-4"
                          data-bs-toggle="tab"
                          href="#tasks-tab"
                          role="tab"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          <span className="d-block d-sm-none">
                            <i className="mdi mdi-menu-open"></i>
                          </span>
                          <span className="d-none d-sm-block">Tasks</span>
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link px-4 "
                          data-bs-toggle="tab"
                          href="#team-tab"
                          role="tab"
                          aria-selected="false"
                          tabIndex="-1"
                        >
                          <span className="d-block d-sm-none">
                            <i className="mdi mdi-account-group-outline"></i>
                          </span>
                          <span className="d-none d-sm-block">Team</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <div className="card">
            <div className="tab-content p-4">
              <div
                className="tab-pane active show"
                id="projects-tab"
                role="tabpanel"
              >
                <Row>
                  {projects.map((project) => (
                    <Col md={6} key={project.id}>
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex mb-3">
                            <div className="flex-grow-1 align-items-start">
                              <div>
                                <h6 className="mb-0 text-muted">
                                  <i
                                    className={`mdi mdi-circle-medium ${
                                      project.status === "Pending"
                                        ? "text-danger"
                                        : "text-success"
                                    } fs-3 align-middle`}
                                  ></i>
                                  <span className="team-date">
                                    {project.date}
                                  </span>
                                </h6>
                              </div>
                            </div>
                            <div className="dropdown ms-2">
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="link"
                                  id={`dropdown-basic-${project.id}`}
                                  className="text-muted"
                                >
                                  <i className="mdi mdi-dots-horizontal"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() => handleEdit(project.id)}
                                  >
                                    Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => console.log("Share")}
                                  >
                                    Share
                                  </Dropdown.Item>
                                  <Dropdown.Divider />
                                  <Dropdown.Item
                                    className="delete-item"
                                    onClick={() => handleDelete(project.id)}
                                  >
                                    Delete
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h5 className="mb-1 font-size-17 team-title">
                              {project.title}
                            </h5>
                            <p className="text-muted mb-0 team-description">
                              {project.description}
                            </p>
                          </div>
                          <div className="d-flex">
                            <div className="avatar-group float-start flex-grow-1 task-assigne">
                              {project.assignees.map((assignee, index) => (
                                <div key={index} className="avatar-group-item">
                                  <img
                                    src={assignee}
                                    alt={`Assignee ${index}`}
                                    className="rounded-circle avatar-sm"
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="align-self-end">
                              <span
                                className={`badge badge-soft-${
                                  project.status === "Pending"
                                    ? "danger"
                                    : "success"
                                } p-2 team-status`}
                              >
                                {project.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        </Col>

        <Col xl={4}>
          <Card>
            <Card.Body>
              <div className="pb-2">
                <h4 className="card-title mb-3">About</h4>
                <p>
                  Hi I'm Jansh, has been the industry's standard dummy text To
                  an English person, it will seem like simplified.
                </p>
                <ul className="ps-3 mb-0">
                  <li>it will seem like simplified.</li>
                  <li>
                    To achieve this, it would be necessary to have uniform
                    pronunciation
                  </li>
                </ul>
              </div>
              <hr />
              <div className="pt-2">
                <h4 className="card-title mb-4">My Skill</h4>
                <div className="d-flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="p-2">
                    HTML
                  </Badge>
                  <Badge variant="secondary" className="p-2">
                    Bootstrap
                  </Badge>
                  <Badge variant="secondary" className="p-2">
                    Scss
                  </Badge>
                  <Badge variant="secondary" className="p-2">
                    Javascript
                  </Badge>
                  <Badge variant="secondary" className="p-2">
                    React
                  </Badge>
                  <Badge variant="secondary" className="p-2">
                    {currentUser.jobSkills}
                  </Badge>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h4 className="card-title mb-4">Personal Details</h4>
              <div className="table-responsive">
                <Table bordered className="mb-0">
                  <tbody>
                    <tr>
                      <th scope="row">Name</th>
                      <td>{currentUser.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Location</th>
                      <td>{currentUser.address}</td>
                    </tr>
                    <tr>
                      <th scope="row">Language</th>
                      <td>English</td>
                    </tr>
                    <tr>
                      <th scope="row">Website</th>
                      <td>{currentUser.website}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <h4 className="card-title mb-4">Work Experience</h4>
              <ListGroup variant="flush" className="work-activity mb-0">
                <ListGroup.Item className="work-item" action>
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="lh-base mb-0">ABCD Company</h6>
                    <small className="text-muted">2020-21</small>
                  </div>
                  <p className="font-size-13 mb-2">Web Designer</p>
                  <p>
                    To achieve this, it would be necessary to have uniform
                    grammar, and more common words.
                  </p>
                </ListGroup.Item>
                <ListGroup.Item className="work-item" action>
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="lh-base mb-0">XYZ Company</h6>
                    <small className="text-muted">2019-20</small>
                  </div>
                  <p className="font-size-13 mb-2">Graphic Designer</p>
                  <p className="mb-0">
                    It will be as simple as occidental in fact, it will be
                    Occidental person, it will seem like simplified.
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
