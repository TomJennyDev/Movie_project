import React from "react";
import logo from "../../logo.png";
import "./loading.css";

function LoadingHome() {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="waves-block">
          <div className="waves wave-1"></div>
          <div className="waves wave-2"></div>
          <div className="waves wave-3"></div>
          <div className="logo">
            <img src={logo} alt="logo" width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingHome;
