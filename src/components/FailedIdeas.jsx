// src/components/FailedIdeas.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TimelinesPage.css";

export default function FailedIdeas() {
  const navigate = useNavigate();
  const [nsfwOpen, setNsfwOpen] = useState(false);

  // ensure the same "loaded" class is added so opacity goes to 1
  useEffect(() => {
    const page = document.querySelector(".timeline-page");
    if (page) page.classList.add("loaded");
    return () => {
      if (page) page.classList.remove("loaded");
    };
  }, []);

  const toggleNsfw = () => setNsfwOpen((s) => !s);

  return (
    <div className="timeline-page">
      <div className="timeline-wrapper">
        <header className="hero-header">
          <h1 className="hero-title">Failed Ideas</h1>
          <p className="hero-sub">Attempts that turned into laughs. Swipe/scroll.</p>
        </header>

        <section className="failed-section">
          <div className="failed-grid" role="list">
            {/* Guitar Video Card */}
            <article className="failed-card" role="listitem" aria-label="Guitar idea">
              <div className="failed-media">
                <video
                  className="failed-video"
                  src="/guitar.mp4"
                  poster="/guitar-poster.jpg"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="Guitar demo video"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="failed-meta">
                <h3 className="failed-item-title">Attempt #1 — Guitar</h3>
                <p className="failed-item-sub">I thought serenading would win points.</p>
                <div className="card-actions">
                  <button
                    className="next-btn"
                    onClick={() => {
                      const v = document.querySelector(".failed-video");
                      if (v && v.paused) v.play();
                      else if (v) v.pause();
                    }}
                  >
                    Play / Pause
                  </button>
                </div>
              </div>
            </article>

            {/* NSFW Reveal Card */}
            <article className="failed-card" role="listitem" aria-label="NSFW idea">
              <div className="failed-media nsfw-media">
                {!nsfwOpen ? (
                  <button
                    className="nsfw-cover"
                    onClick={toggleNsfw}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") toggleNsfw();
                    }}
                    aria-pressed="false"
                    aria-label="Reveal NSFW image (opens on click)"
                  >
                    <div className="nsfw-text">NSFW - open w caution</div>
                    <div className="nsfw-sub">Click to reveal</div>
                  </button>
                ) : (
                  <img src="/KillCringe.jpg" alt="NSFW reveal" className="nsfw-image" />
                )}
              </div>

              <div className="failed-meta">
                <h3 className="failed-item-title">NSFW (reveal-on-click)</h3>
                <p className="failed-item-sub">
                  A cringe experiment hidden behind a cover. Click to reveal. (Refresh to hide again.)
                </p>
                <div className="card-actions">
                  <button className="next-btn" onClick={toggleNsfw}>
                    {nsfwOpen ? "Hide" : "Reveal"}
                  </button>
                  <button className="next-btn" onClick={() => setNsfwOpen(false)}>
                    Reset
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* footer-ish area for the NSFW standalone (kept small) */}
        </section>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          <button className="next-btn" onClick={() => navigate("/timelines")}>← Back to Timeline</button>
          <button className="next-btn" onClick={() => navigate("/")}>Finish</button>
        </div>
      </div>
    </div>
  );
}
