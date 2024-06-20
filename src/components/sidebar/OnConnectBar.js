import React, { useState } from "react";
import classNames from "classnames";
import "./OnConnectBar.scss";
// import '../home/Home.scss'
import logo from "../../images/sidebar/logo-no-background.svg";
import Home from "../../images/sidebar/home-solid.svg";
import Team from "../../images/sidebar/social.svg";
import Calender from "../../images/sidebar/sceduled.svg";
import Documents from "../../images/sidebar/draft.svg";
import Settings from "../../images/sidebar/settings.svg";
import GetStarted from "../../images/sidebar/starred.svg";
import SidebarProfile from "../profile/sidebarProfile/SidebarProfile.js";
import { NavLink, useLocation } from "react-router-dom";
// import Header from '../header/Header.js';
const OnConnectBar = ({
  onLogout,
  currentUser,
  toggleSidebar,
  handleFilterChange,
}) => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
    toggleSidebar();
  };

  const location = useLocation();
  const currentPath = location.pathname;

  const getPageText = () => {
    switch (currentPath) {
      case "/onconnect/accueil":
        return "Accueil";
      case "/onconnect/dashboard":
        return "Dashboard";
      case "/onconnect/agenda":
        return "Agenda";
      case "/onconnect/contrats":
        return "Contrats";
      case "/onconnect/getstarted":
        return "Get Started";
      case "/onconnect/settings":
        return "Settings";
      case "/onconnect/profile":
        return "Profile";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Le header avec la bar de recherche */}

      <div className="outer-container">
              <button
                className={classNames("button", { clicked: click })}
                onClick={handleClick}
              ></button>  
            <div className="logo">
                <img src={logo} alt="logo" />
                <span className="active-page-text">{getPageText()}</span>

            </div>

            <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      <div className="separator"></div>

      {/* La sidebar Onconnect */}
      <>
        <ul className={classNames("slickbar", { clicked: click })}>
          <NavLink activeclassname="active" to="/onconnect/accueil" className="item">
            <img src={Home} alt="Home" />
            <span className={classNames("text", { clicked: click })}>
              Accueil
            </span>
          </NavLink>
          <NavLink activeclassname="active" to="/onconnect/dashboard" className="item">
            <img src={Team} alt="Team" />
            <span className={classNames("text", { clicked: click })}>
              Dashboard
            </span>
          </NavLink>
          <NavLink activeclassname="active" to="/onconnect/agenda" className="item">
            <img src={Calender} alt="Calender" />
            <span className={classNames("text", { clicked: click })}>
              Agenda
            </span>
          </NavLink>
          <NavLink activeclassname="active" to="/onconnect/contrats" className="item">
            <img src={Documents} alt="Documents" />
            <span className={classNames("text", { clicked: click })}>
              Contrats
            </span>
          </NavLink>
          {click && <h2 className="support">Support</h2>}
          <NavLink activeclassname="active" to="/onconnect/getstarted" className="item">
            <img src={GetStarted} alt="Get Started" />
            <span className={classNames("text", { clicked: click })}>
              Get Started
            </span>
          </NavLink>
          <NavLink activeclassname="active" to="/onconnect/settings" className="item">
            <img src={Settings} alt="Settings" />
            <span className={classNames("text", { clicked: click })}>
              Settings
            </span>
          </NavLink>

          <SidebarProfile
            currentUser={currentUser}
            onLogout={onLogout}
            isExpanded={click}
          />
        </ul>
      </>
    </>
  );
};

export default OnConnectBar;
