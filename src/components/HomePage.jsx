import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css"; // move styling to a dedicated file

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <div className="content-box">
        <img
          src="/KillCringe.jpg"
          alt="Kill Cringe"
          className="cute-image"
        />
        <button
          className="next-button"
          onClick={() => navigate("/timelines")}
        >
          Best of luck (to both you & I 🤞) 
        </button>
      </div>
    </div>
  );
}

export default HomePage;
