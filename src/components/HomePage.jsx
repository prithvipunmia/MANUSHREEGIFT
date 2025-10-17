// src/components/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // optional global styling

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1 className="title">Welcome to KillCringe 🌈</h1>
      <img
        src="/KillCringe.jpg"
        alt="Kill Cringe"
        className="cute-image"
      />
      <button
        className="next-button"
        onClick={() => navigate("/next")}
      >
        Let’s Go ➡️
      </button>
    </div>
  );
}

export default HomePage;
