import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FailedIdeas.css";

export default function FailedIdeas() {
  const navigate = useNavigate();
  const [nsfwOpen, setNsfwOpen] = useState(false);
  const videoRef = useRef(null);

  // ensure the same "loaded" class is added so opacity goes to 1
  useEffect(() => {
    const page = document.querySelector(".timeline-page");
    if (page) page.classList.add("loaded");
    return () => {
      if (page) page.classList.remove("loaded");
    };
  }, []);

  const toggleNsfw = () => setNsfwOpen((s) => !s);

  // Prevent true fullscreen / expansion and ensure 'contain' is used so media never distorts.
  useEffect(() => {
    const onFullscreenChange = () => {
      const el =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        null;

      if (el) {
        const exit =
          document.exitFullscreen ||
          document.webkitExitFullscreen ||
          document.mozCancelFullScreen ||
          document.msExitFullscreen ||
          null;
        if (exit) {
          try { exit.call(document); } catch (e) { /* ignore */ }
        }
      }

      document.querySelectorAll("video").forEach((v) => {
        v.style.objectFit = "contain";
        v.style.transform = "none";
      });
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    document.addEventListener("mozfullscreenchange", onFullscreenChange);
    document.addEventListener("MSFullscreenChange", onFullscreenChange);

    const onOrientation = () => {
      document.querySelectorAll("video").forEach((v) => {
        v.style.objectFit = "contain";
        v.style.transform = "none";
      });
    };
    window.addEventListener("orientationchange", onOrientation);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      document.removeEventListener("mozfullscreenchange", onFullscreenChange);
      document.removeEventListener("MSFullscreenChange", onFullscreenChange);
      window.removeEventListener("orientationchange", onOrientation);
    };
  }, []);

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
                    ref={videoRef}
                    className="failed-video"
                    src="/guitar.mp4"
                    poster="/guitar-poster.jpg"
                    controls
                    playsInline
                    preload="metadata"
                    aria-label="Guitar demo video"
                    controlsList="nodownload noremoteplayback nofullscreen"
                    disablePictureInPicture
                    disableRemotePlayback
                  />
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
                      style={{ objectFit: "contain" }}
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