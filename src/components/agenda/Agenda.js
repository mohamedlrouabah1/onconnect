// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import "./Agenda.scss";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import "devextreme/dist/css/dx.light.css";
import { Calendar } from "devextreme-react/calendar";
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  ViewSwitcher,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Chart,
  Series,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from "devextreme-react/chart";
import SelectBox from "devextreme-react/select-box";

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Importer les styles CSS
import { getAllUserScheduler } from "../utils/api/APIUtils";

const Agenda = ({ currentUser, isSidebarOpen }) => {
  const [currentDate, setCurrentDate] = useState(moment().toDate());
  const [currentViewName, setCurrentViewName] = useState("Month");
  const [scheduler, setScheduler] = useState([]);
  useEffect(() => {
    getAllUserScheduler()
      .then((data) => {
        const taskEvent = myTaskList(data);
        setScheduler(taskEvent);
        console.log("Scheduler task event :", JSON.stringify(taskEvent));
        console.log("Full Data : ", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching contrats:", error);
      });
  }, [currentUser]);

  const myTaskList = (d) => {
    return d
      .map((s) =>
        s.taches.map((tache) => ({
          startDate: moment(tache.creationDate).toDate(),
          endDate: moment(tache.dueDate).toDate(),
          title: tache.title,
          // Ici, vous pouvez inclure d'autres données utiles pour chaque événement
        }))
      )
      .flat();
  };
  const handleNewEventClick = () => {
    // Logique pour créer un nouvel événement
    console.log("Créer un nouvel événement");
  };
  const FlexibleSpace = ({ onNewEventClick }) => (
    <Toolbar.FlexibleSpace>
      <Button
        onClick={onNewEventClick}
        color="primary"
        variant="contained"
        style={{ marginRight: "20px" }}
      >
        Event
      </Button>
    </Toolbar.FlexibleSpace>
  );
  const SchedulerComponent = ({ scheduler }) => (
    <div className="scheduler-container">
      <Paper>
        <Scheduler data={scheduler} height={660}>
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentDateChange={setCurrentDate}
            onCurrentViewNameChange={setCurrentViewName}
          />
          <EditingState />
          <DayView startDayHour={0} endDayHour={24} />
          <WeekView startDayHour={0} endDayHour={24} />
          <MonthView />
          <Toolbar
            flexibleSpaceComponent={() => (
              <FlexibleSpace onNewEventClick={handleNewEventClick} />
            )}
          />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip showCloseButton showDeleteButton showOpenButton />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    </div>
  );
  const todayEvents = [
    { time: "10:00 AM", title: "Meeting with team" },
    { time: "01:00 PM", title: "Lunch with client" },
  ];
  const activities = [
    { time: "03:00 PM", title: "Design Review" },
    { time: "04:30 PM", title: "Code Refactoring Session" },
  ];
  const onCalendarValueChanged = (e) => {
    setCurrentDate(e.value);
  };
  const AgendaComponent = () => (
    <div className="agenda-container">
      <Row style={{ border: "1px solid gainsboro", borderRadius: "0.15rem;" }}>
        <Calendar
          onValueChange={onCalendarValueChanged}
          defaultValue={currentDate}
          style={{ width: "none" }}
        />
      </Row>

      <Row>
        <Card style={{ border: "none", marginTop: "1rem" }}>
          <Card.Header>
            <Card.Title>Today's Schedule</Card.Title>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              {todayEvents.map((event, index) => (
                <ListGroup.Item key={index}>
                  <strong>{event.time}</strong> {event.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Row>

      <Row>
        <Card style={{ border: "none" }}>
          <Card.Header>
            <Card.Title>Activities</Card.Title>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              {activities.map((activity, index) => (
                <ListGroup.Item key={index}>
                  <strong>{activity.time}</strong> {activity.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Row>
    </div>
  );
  const dummyData = {
    semaine: [
      { date: "Semaine 1", finish: 5, inProgress: 3, cancel: 1 },
      { date: "Semaine 2", finish: 7, inProgress: 4, cancel: 2 },
      { date: "Semaine 3", finish: 9, inProgress: 5, cancel: 3 },
      { date: "Semaine 4", finish: 12, inProgress: 6, cancel: 1 },
    ],
    mois: [
      { date: "Janvier", finish: 20, inProgress: 10, cancel: 5 },
      { date: "Février", finish: 22, inProgress: 15, cancel: 3 },
      { date: "Mars", finish: 25, inProgress: 12, cancel: 4 },
      { date: "Avril", finish: 30, inProgress: 18, cancel: 2 },
    ],
    annee: [
      { date: "2021", finish: 100, inProgress: 50, cancel: 20 },
      { date: "2022", finish: 150, inProgress: 60, cancel: 25 },
      { date: "2023", finish: 200, inProgress: 80, cancel: 30 },
      { date: "2024", finish: 250, inProgress: 100, cancel: 40 },
    ],
  };

  const [periode, setPeriode] = useState("mois");

  const ProjectDeliveriesComponent = () => (
    <div className="project-deliveries-container">
      <Row>
        <Col xs={12} md={10} className="left-content">
          Project Delivery
        </Col>
        <Col xs={12} md={2} className="right-content">
          <SelectBox
            items={["semaine", "mois", "annee"]}
            value={periode}
            onValueChanged={(e) => setPeriode(e.value)}
            width={120}
          />
        </Col>
      </Row>

      <Chart palette="Soft" dataSource={dummyData[periode]}>
        <ArgumentAxis argumentType="discrete" />
        <ValueAxis minValueMargin={0} />

        <Series
          valueField="finish"
          argumentField="date"
          name="Terminé"
          type="line"
        />
        <Series
          valueField="inProgress"
          argumentField="date"
          name="En cours"
          type="line"
        />
        <Series
          valueField="cancel"
          argumentField="date"
          name="Annulé"
          type="line"
        />

        <Legend verticalAlignment="top" horizontalAlignment="center" />
      </Chart>
    </div>
  );

  return (
    <div className={`home-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Container fluid>
        <Row>
          <Col xs={12} md={9}>
            <Row>
              <SchedulerComponent scheduler={scheduler} />
            </Row>
            <Row>
              <ProjectDeliveriesComponent />
            </Row>
          </Col>

          <Col xs={12} md={3}>
            <AgendaComponent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Agenda;
