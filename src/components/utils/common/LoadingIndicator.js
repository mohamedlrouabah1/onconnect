import React from "react";
import ReactLoading from "react-loading";

export default function LoadingIndicator(props) {
  return (
    <div
      className="loading-indicator"
      style={{ display: "block", textAlign: "center", marginTop: "30px" }}
    >
      <ReactLoading type="spin" color="#ffffff" height={50} width={50} />
    </div>
  );
}
