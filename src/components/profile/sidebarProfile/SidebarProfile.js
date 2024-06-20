import React, { useState } from "react";
import { FaUser, FaSignOutAlt, FaCog, FaArrowCircleDown } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import './SidebarProfile.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
const SidebarProfile = ({ currentUser, onLogout, isExpanded }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const style = {
    marginRight: "0.1rem",
  };
  
  return (
    <div className={classNames('ProfileContainer', { expanded: isExpanded })}>
      {currentUser.imageUrl ? (
        <img className="ProfileImage" src={currentUser.imageUrl} alt={currentUser.name} />
      ) : (
        <div className="DefaultAvatar">
          <span>{currentUser.name && currentUser.name[0]}</span>
        </div>
      )}
      {isExpanded && (
        <div className="ProfileDetails">
          <div>
            <div className="ProfileName">{currentUser.name}</div>
            <div className="ProfileEmail">{currentUser.email}</div>
          </div>
          <Dropdown show={isDropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle as={CustomDropdownToggle}>
              <FaArrowCircleDown style={style} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={onLogout}>
                <FaSignOutAlt /> Déconnexion
              </Dropdown.Item>
              <Dropdown.Item>
                  <NavLink 
                      to="/onconnect/profile"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      activestyle={{ fontWeight: 'bold' }}
                >
                  <FaUser /> Profile
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
              <NavLink 
                  to="/onconnect/settings"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  activestyle={{ fontWeight: 'bold' }}
                >
                  <FaCog /> Settings
                </NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

const CustomDropdownToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="CustomDropdownToggle"
  >
    {children}
  </div>
));

export default SidebarProfile;
