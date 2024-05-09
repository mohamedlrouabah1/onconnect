import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.scss";
import { Calendar } from "devextreme-react/calendar";
import Analytics from "./analytics/Analytics";
import RevenueChart from "./chart/RevenueChart";
import { MissionsCarousel } from "./mission/missionlayout/MissionsLayout";
import { MissionsList } from "./mission/missionlayout/MissionsLayout";
import corp from "../../images/signup/corp.png";
import { Lookup } from "devextreme-react/lookup";
function Dashboard({ currentUser, isSidebarOpen }) {
  // Dummy data to simulate fetched data
  const missionsData = [
    {
      id: 1,
      title: "Design&Co",
      tag: "GROOMING",
      startDate: "Dec 12",
      endDate: "Dec 14",
      balance: "$570",
      status: "unpaid",
      image: corp, // Replace with actual image path
    },
    {
      id: 2,
      title: "Button&Co",
      tag: "DAYCARE",
      startDate: "Feb 12",
      endDate: "Dec 14",
      balance: "$13000",
      status: "paid",
      image: corp, // Replace with actual image path
    },
    {
      id: 3,
      title: "TEST&Co",
      tag: "GROOMING",
      startDate: "Dec 12",
      endDate: "Dec 14",
      balance: "$570",
      status: "unpaid",
      image: corp, // Replace with actual image path
    },
    {
      id: 4,
      title: "test&Co",
      tag: "DAYCARE",
      startDate: "Feb 12",
      endDate: "Dec 14",
      balance: "$13000",
      status: "paid",
      image: corp, // Replace with actual image path
    },
    {
      id: 5,
      title: "test&Co",
      tag: "DAYCARE",
      startDate: "Feb 12",
      endDate: "Dec 14",
      balance: "$13000",
      status: "paid",
      image: corp, // Replace with actual image path
    },
    {
      id: 6,
      title: "test&Co",
      tag: "DAYCARE",
      startDate: "Feb 12",
      endDate: "Dec 14",
      balance: "$13000",
      status: "paid",
      image: corp, // Replace with actual image path
    },
    {
      id: 7,
      title: "test&Co",
      tag: "DAYCARE",
      startDate: "Feb 12",
      endDate: "Dec 14",
      balance: "$13000",
      status: "paid",
      image: corp, // Replace with actual image path
    },
    {
      id: 8,
      title: "test&Co",
      tag: "DAYCARE",
      startDate: "Feb 12",
      endDate: "Dec 14",
      balance: "$13000",
      status: "paid",
      image: corp, // Replace with actual image path
    },
    {
      id: 9,
      title: "test&Co",
      tag: "DAYCARE",
      startDate: "Feb 12",
      endDate: "Dec 14",
      balance: "$13000",
      status: "paid",
      image: corp, // Replace with actual image path
    },
    {
      id: 10,
      title: "test&Co",
      tag: "DAYCARE",
      startDate: "Feb 12",
      endDate: "Dec 14",
      balance: "$13000",
      status: "paid",
      image: corp, // Replace with actual image path
    },
  ];

  const revenueData = {
    data: [
      { month: "Oct 2021", value: 10000, color: "#4e73df" },
      { month: "Nov 2021", value: 15000, color: "#4e73df" },
      { month: "Dec 2021", value: 20000, color: "#4e73df" },
      { month: "Jan 2022", value: 25000, color: "#4e73df" },
      { month: "Feb 2022", value: 30000, color: "#1cc88a" },
    ],
  };

  return (
    <div className={`home-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={8}>
              <div
                className="slick-left"
                style={{
                  color: "#087592",
                  marginTop: "0.5rem",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                Missions
              </div>
            </Col>
            <Col
              md={4}
              className="slick-right"
              style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
            >
              <Button variant="secondary">+ Add Mission</Button>
            </Col>
          </Row>
          <Row>
            <Lookup></Lookup>
          </Row>
          <Row>
            <div className="dashboard-container">Incoming deadline</div>
            <MissionsCarousel missions={missionsData} />
          </Row>
          <Row>
            <div className="dashboard-container">Currents Missions</div>
            <MissionsList missions={missionsData} />
          </Row>
        </Col>
        <Col md={4} className="dashboard-background">
          <div className="dashboard-padding">
            <Row>
              <div className="dashboard-padding">
                <Calendar style={{ width: "100%" }} />
              </div>
            </Row>
            <Row>
              <div className="dashboard-container">Analytics</div>
              <Analytics progressRate={8} delayRate={25} />
            </Row>
            <Row>
              <div className="dashboard-container">Monthly Revenue</div>
              <RevenueChart data={revenueData.data} />
              <div style={{paddingTop:'5rem'}}>
                <Button variant="secondary">View Details</Button>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
