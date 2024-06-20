import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../utils/api/APIUtils";
import { toast } from "react-toastify";
import "./RoleSelection.scss";
import corporatelogo from "../../../images/signup/corp.png";
import developerlogo from "../../../images/signup/dalian-metro-logo.png";

const RoleSelection = ({ userData }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const signupRequest = {
      ...userData,
      role: selectedRole,
    };

    signup(signupRequest)
      .then(() => {
        toast.success("You're successfully registered. You can Login now!");
        navigate("/onconnect/login");
      })
      .catch((error) => {
        toast.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  };

  return (
    <div className="role-selection-container">
      <div className="role-selection-content">
        <h1 className="role-selection-title">Sign up as...</h1>
        <form onSubmit={handleSubmit}>
          <button
            className="role-selection-button"
            onClick={() => setSelectedRole("D1")}
          >
            <img src={developerlogo} alt="DevsImg" className="img-button" />
            Sign-up as Developer
          </button>
          <button
            className="role-selection-button"
            onClick={() => setSelectedRole("C1")}
          >
            <img src={corporatelogo} alt="CorpImg" className="img-button" />
            Sign-up as Corporate
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoleSelection;
