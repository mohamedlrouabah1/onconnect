import React, { useState } from "react";
import "../login/Login.scss";
import "../../../index.scss";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  ACCESS_TOKEN,
} from "../../utils/constants/index";
import { login } from "../../utils/api/APIUtils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import fbLogo from "../../../images/oauth2/fb-logo.svg";
import googleLogo from "../../../images/oauth2/google-logo.svg";
import githubLogo from "../../../images/oauth2/github-logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ authenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (authenticated) {
    navigate("/onconnect", { state: { from: location } });
  }

  // Handle the error if it exists
  if (location.state && location.state.error) {
    setTimeout(() => {
      toast.error(location.state.error, {
        timeout: 5000,
      });
      navigate(location.pathname, { state: {} });
    }, 100);
  }

  return (
    <div className="home-container">
    {/* <div className="login-container"> */}
      <div className="login-content">
      <div className="or-separator">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">test user name : devuser@example.com</p>
        <p className="login-subtitle">test user password: 1234</p>
        <p className="login-subtitle">if redirect doesn't work : <br/> Please set url to https://mohamedlrouabah1.github.io/onconnect/ <br/> it's due to github static page</p>
        </div>
        <LoginForm />
        <div className="or-separator">
          <small className="or-text">Or Continue With</small>
        </div>
        <SocialLogin />
        <span className="signup-link">
          Don't have an account? <Link to="/onconnect/signup">Sign up</Link>
        </span>
      </div>
    {/* </div> */}
    </div>
  );
};

const SocialLogin = () => {
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

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginRequest = { email, password };

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        toast.success("You're successfully logged in!");
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        toast.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <button type="submit" className="login-btn">
          Continue
        </button>
      </div>
    </form>
  );
};

export default Login;
