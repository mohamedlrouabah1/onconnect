import React from "react";
import "../home/Home.scss";

const Home = ({isSidebarOpen}) => {
  return (
    <div className={`home-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="container">
        <div className="graf-bg-container">
          <div className="graf-layout">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="graf-circle"></div>
            ))}
          </div>
        </div>
        <h1 className="home-title">Home</h1>
      </div>
    </div>
  );
};

export default Home;
