// eslint-disable-next-line
import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/authentification/login/Login";
import Signup from "../components/authentification/signup/Signup";
import Profile from "../components/profile/page/Profile";
import Accueil from "../components/accueil/Accueil";
import Annonce from "../components/annonce/Annonce";
import Dashboard from "../components/dashboard/Dashboard";
import Contrats from "../components/contrats/Contrats";
import Facturation from "../components/facturation/Facturation";
import Missions from "../components/missions/Missions";
import Agenda from "../components/agenda/Agenda";
import OAuth2RedirectHandler from "../components/authentification/oauth2/OAuth2RedirectHandler";
import NotFound from "../components/utils/common/NotFound";
import OnConnectBar from "../components/sidebar/OnConnectBar";
import AppHeader from "../components/landing/AppHeader";
import LoadingIndicator from "../components/utils/common/LoadingIndicator";
import { getCurrentUser } from "../components/utils/api/APIUtils";
import { ACCESS_TOKEN } from "../components/utils/constants";
import { PrivateRoute } from "../components/utils/common/PrivateRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
      isSidebarOpen: false,
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  toggleSidebar = () => {
    this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
  };

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    toast.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    const { authenticated, currentUser, loading } = this.state;

    if (loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="app">
        <ToastContainer
          stack={{ limit: 3 }}
          timeout={3000}
          position="top-right"
          effect="slide"
          offset={65}
        />
        {authenticated ? (
          <OnConnectBar
            authenticated={authenticated}
            onLogout={this.handleLogout}
            currentUser={currentUser}
            isSidebarOpen={this.state.isSidebarOpen}
            toggleSidebar={this.toggleSidebar}
          />
        ) : (
          <AppHeader
            authenticated={authenticated}
            onLogout={this.handleLogout}
          />
        )}
        <div className="app-top-box">
          <Routes >
            <Route path="/onconnect" element={<Home />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute
                  authenticated={this.state.authenticated}
                  currentUser={this.state.currentUser}
                >
                  <Profile isSidebarOpen={this.state.isSidebarOpen} />
                </PrivateRoute>
              }
            />
            <Route
              path="/accueil"
              element={
                <PrivateRoute
                  authenticated={this.state.authenticated}
                  currentUser={this.state.currentUser}
                >
                  <Accueil isSidebarOpen={this.state.isSidebarOpen} />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  authenticated={this.state.authenticated}
                  currentUser={this.state.currentUser}
                >
                  <Dashboard
                    currentUser={this.state.currentUser}
                    isSidebarOpen={this.state.isSidebarOpen}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/contrats"
              element={
                <PrivateRoute
                  authenticated={this.state.authenticated}
                  currentUser={this.state.currentUser}
                >
                  <Contrats
                    currentUser={this.state.currentUser}
                    isSidebarOpen={this.state.isSidebarOpen}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/agenda"
              element={
                <PrivateRoute
                  authenticated={this.state.authenticated}
                  currentUser={this.state.currentUser}
                >
                  <Agenda
                    authenticated={authenticated}
                    currentUser={currentUser}
                    isSidebarOpen={this.state.isSidebarOpen}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/annonces/:annonceId"
              element={
                <PrivateRoute
                  authenticated={this.state.authenticated}
                  currentUser={this.state.currentUser}
                >
                  <Annonce
                    currentUser={this.state.currentUser}
                    isSidebarOpen={this.state.isSidebarOpen}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/missions"
              element={
                <PrivateRoute
                  authenticated={this.state.authenticated}
                  currentUser={this.state.currentUser}
                >
                  <Missions
                    currentUser={this.state.currentUser}
                    isSidebarOpen={this.state.isSidebarOpen}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/facturation/:missionId"
              element={
                <PrivateRoute
                  authenticated={this.state.authenticated}
                  currentUser={this.state.currentUser}
                >
                  <Facturation
                    currentUser={this.state.currentUser}
                    isSidebarOpen={this.state.isSidebarOpen}
                    missionId={this.missionId}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/onconnect/login"
              element={
                this.state.authenticated ? (
                  <Navigate to="/onconnect" replace />
                ) : (
                  <Login authenticated={this.state.authenticated} />
                )
              }
            />
            <Route
              path="/onconnect/signup"
              element={
                this.state.authenticated ? (
                  <Navigate to="/onconnect" replace />
                ) : (
                  <Signup authenticated={this.state.authenticated} />
                )
              }
            />
            <Route
              path="/oauth2/redirect"
              element={
                this.state.authenticated ? (
                  <Navigate to="/onconnect" replace />
                ) : (
                  <OAuth2RedirectHandler />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
