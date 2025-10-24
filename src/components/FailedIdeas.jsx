import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FailedIdeas.css";

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
          <h1 className="hero-title">Bonus Content</h1>
          <p className="hero-sub">Other things I tried for your birthday 😂</p>
        </header>

        <section className="failed-section">
          <div className="failed-grid" role="list">
            {/* Guitar Video Card */}
            <article className="failed-card" role="listitem" aria-label="Guitar idea">
              <div className="failed-media">
                <div className="media-inner">
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
              </div>

              <div className="failed-meta">
                <h3 className="failed-item-title">I thought I'll get brownie points for the singing attempt 😂</h3>
                <div className="card-actions" />
              </div>
            </article>

            {/* NSFW Reveal Card (image toggles on click) */}
            <article className="failed-card" role="listitem" aria-label="NSFW idea">
              <div className="failed-media nsfw-media">
                <div className="media-inner">
                  {!nsfwOpen ? (
                    <button
                      className="nsfw-cover"
                      onClick={toggleNsfw}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") toggleNsfw();
                      }}
                      aria-pressed={nsfwOpen}
                      aria-label="Reveal image (click or press Enter)"
                      type="button"
                    >
                      <div className="nsfw-text">NSFW - click w caution 🥵⛔</div>
                    </button>
                  ) : (
                    <img
                      src="/Cringe.JPEG"
                      alt="NSFW reveal"
                      className="nsfw-image"
                      onClick={toggleNsfw}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") toggleNsfw();
                      }}
                      role="button"
                      tabIndex={0}
                    />
                  )}
                </div>
              </div>

              <div className="failed-meta">
                <h3 className="failed-item-title">Thirst trap enough? 😂</h3>
              </div>
            </article>
          </div>
        </section>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          <button className="next-btn" onClick={() => navigate("/")}>Re-cringe?</button>
        </div>
      </div>
    </div>
  );
}