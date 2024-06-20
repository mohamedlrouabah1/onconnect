/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../landing/AppHeader.scss";
import logo from "../../images/sidebar/logo-no-background.svg";

const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="container">
        <div className="app-branding">
          <Link to="/onconnect">
            <img src={logo} alt="OnConnect Logo" />
          </Link>
        </div>
        <div className="app-options">
          <nav className="app-nav">
            <ul>
              <li>
                <NavLink to="/onconnect/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/onconnect/signup">Signup</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
