// eslint-disable-next-line
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
// import { AuthProvider } from "./components/utils/api/AuthContext";

const root = document.getElementById("root");

createRoot(root).render(
  <Router>
    {/* <AuthProvider> */}
    <App />
    {/* </AuthProvider> */}
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
registerServiceWorker();
