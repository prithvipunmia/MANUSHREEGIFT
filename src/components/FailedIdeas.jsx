// src/components/FailedIdeas.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TimelinesPage.css";

export default function FailedIdeas() {
  const navigate = useNavigate();

  // ensure the same "loaded" class is added so opacity goes to 1
  useEffect(() => {
    const page = document.querySelector(".timeline-page");
    if (page) page.classList.add("loaded");
    return () => {
      if (page) page.classList.remove("loaded");
    };
  }, []);

  return (
    <div className="timeline-page">
      <div className="timeline-wrapper">
        <header className="hero-header">
          <h1 className="hero-title">Failed Ideas</h1>
          <p className="hero-sub">Attempts that turned into laughs. Swipe/scroll.</p>
        </header>

        <section className="failed-section">
          <h3 className="failed-title">Attempt #1 — Guitar</h3>
          <p className="failed-sub">I thought serenading would win points.</p>

          <div className="failed-grid">
            <div className="failed-card">
              <video controls playsInline src="/guitar.mp4" />
            </div>

            <div className="failed-card">
              <h3>Attempt #2 — Dance</h3>
              <video controls playsInline src="/dance.mp4" />
            </div>
          </div>

          <div style={{ marginTop: 14, textAlign: "center" }}>
            <div className="failed-card" style={{ display: "inline-block", maxWidth: 420 }}>
              <p style={{ margin: 8, fontWeight: 700 }}>NSFW (Very Cringe)</p>
              <img src="/KillCringe.jpg" alt="cringe" style={{ width: "100%", borderRadius: 10 }} />
            </div>
          </div>
        </section>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          <button className="next-btn" onClick={() => navigate("/timelines")}>← Back to Timeline</button>
          <button className="next-btn" onClick={() => navigate("/")}>Finish</button>
        </div>
      </div>
    </div>
  );
}
