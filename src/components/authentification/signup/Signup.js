import React, { useState } from "react";
import "../signup/Signup.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
} from "../../utils/constants/index";
import fbLogo from "../../../images/oauth2/fb-logo.svg";
import googleLogo from "../../../images/oauth2/google-logo.svg";
import githubLogo from "../../../images/oauth2/github-logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoleSelection from "../role/RoleSelection";

const Signup = ({ authenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [signupRequest, setSignupRequest] = useState(null);
  const handleFormSubmit = (request) => {
    setSignupRequest(request);
    setSubmitted(true);
  };

  if (authenticated) {
    return navigate("/onconnect", { state: { from: location } });
  }
  if (submitted) {
    toast.success("Choose your Role and Complete your registration!");
    return <RoleSelection userData={signupRequest} />;
  }
  return (
    <div className="home-container">
    {/* <div className="signup-container"> */}
      <div className="signup-content">
      <div className="or-separator">
        <h1 className="signup-title">Signup with AppConnect</h1>
        </div>
        <SignupForm handleFormSubmit={handleFormSubmit} />
        <div className="or-separator">
          <small className="or-text">Or Continue With</small>
        </div>
        <SocialSignup />
        <span className="login-link">
          Already have an account? <Link to="/onconnect/login">Login</Link>
        </span>
      </div>
    {/* </div> */}
    </div>
  );
};

const SocialSignup = () => {
  return (
    <div className="social-login">
      <a className="social-btn facebook" href={FACEBOOK_AUTH_URL}>
        <img src={fbLogo} alt="Facebook" /> Facebook
      </a>
      <a className="social-btn google" href={GOOGLE_AUTH_URL}>
        <img src={googleLogo} alt="Google" /> Google
      </a>
      <a className="social-btn github" href={GITHUB_AUTH_URL}>
        <img src={githubLogo} alt="Github ID" /> Github ID
      </a>
      
    </div>
  );
};

const SignupForm = ({ handleFormSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const signupRequest = { name, email, password };
    handleFormSubmit(signupRequest);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <div className="form-item">
        <button type="submit" className="signup-btn">
          Continue
        </button>
      </div>
    </form>
  );
};

export default Signup;
