// src/components/TimelinesPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TimelinesPage.css";

const ITEMS = [
  { id: 1, file: "/FirstImage.jpg", title: "29th Feb, 2024", caption: "Who knew this was going to start a fun journey!" },
  { id: 2, file: "/SecondImage.jpg", title: "20th Jun, 2024", caption: "Projects with you were extra fun. Case in point" },
  { id: 3, file: "/ThirdImage.jpg", title: "14th Sept, 2024", caption: "Naive of us to be okay missing an opportunity to meet" },
  { id: 4, file: "/ForthImage.jpg", title: "01st Jan, 2025", caption: "You innocently shared this picture with me. I've held it with me since" },
  { id: 5, file: "/FifthImage.jpg", title: "11th Jan, 2025", caption: "Definetly not a bad looking pair (imo)" },
  { id: 6, file: "/SixthImage.jpg", title: "12th Jan, 2025", caption: "Nothing here, just an empty room" },
  { id: 7, file: "/SeventhImage.jpg", title: "15th Jan, 2025", caption: "First long text. Many many more to come" },
  { id: 8, file: "/EighthImage.jpg", title: "04th Feb, 2025", caption: "Convincing you has been the hardest, but a super fun task" },
  { id: 9, file: "/NinthImage.jpg", title: "15th Feb, 2025", caption: "I was very close to texting you on valentines. This text was a day-late compromise" },
  { id: 10, file: "/TenthImage.jpg", title: "26th Feb, 2025", caption: "By far, my favourite thing" },
  { id: 11, file: "/Option2.jpg", title: "01 Jun, 2025", caption: "This made my day. Period." },
  { id: 12, file: "/Option1.jpg", title: "15th Jul, 2025", caption: "This taught me to put my money where my mouth is" },
  { id: 13, file: "/EleventhImage.jpg", title: "30th Aug, 2025", caption: "The start to an awesome trip" },
  { id: 14, file: "/TwelthImage.jpg", title: "2nd Sep", caption: "Start to dramatic 3 days of our lives captured perfectly" },
  { id: 15, file: "/ThirteenthImage.jpg", title: "23rd Sep", caption: "I live for this kind of content" },
  { id: 16, file: "/FourteenthImage.jpg", title: "9th Oct", caption: "and this!" },
  // Note: final centered image (the birthday reveal) IS EXCLUDED from the alternating timeline below.
  // We'll render it separately as the final CENTERED card.
  { id: 17, file: "/FifteenthImage.jpg", title: "Happy birthday Manushree!", caption: "This is most romantic thing I have done, and I hope it brings you some xxx" },
];

export default function TimelinesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const page = document.querySelector(".timeline-page");
    if (page) page.classList.add("loaded");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { root: null, rootMargin: "0px 0px -15% 0px", threshold: 0.05 }
    );

    const items = document.querySelectorAll(".timeline-item");
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Use all except the last item (index last) for alternating timeline
  const allButFinal = ITEMS.slice(0, ITEMS.length - 1);
  const finalItem = ITEMS[ITEMS.length - 1];

  return (
    <div className="timeline-page">
      <div className="timeline-wrapper">
        <header className="hero-header">
          <h1 className="hero-title">little moments</h1>
          <p className="hero-sub">Happy birthday — each of these reminded me of you.</p>
        </header>

        <div className="timeline">
          <div className="timeline-line" />

          {allButFinal.map((it, idx) => {
            const side = idx % 2 === 0 ? "left" : "right";
            return (
              <article key={it.id} className={`timeline-item ${side}`} tabIndex="0" aria-label={`timeline item ${idx + 1}`}>
                <div className="timeline-marker" aria-hidden="true" />
                <div className="content">
                  <div className="thumb">
                    <img src={it.file} alt={it.title} />
                  </div>
                  <div className="meta">
                    <div className="label">{it.title}</div>
                    <p className="caption">{it.caption}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          <button className="next-btn" onClick={() => navigate(-1)}>Back</button>
          <button className="next-btn" onClick={() => navigate("/failed")}>Next → Failed Ideas</button>
        </div>

        {/* Final centered item (not part of the alternating journey) */}
        <div className="final-reveal" role="region" aria-label="final reveal" style={{ marginTop: 48 }}>
          <div className="final-card">
            <div className="final-thumb">
              <img src={finalItem.file} alt={finalItem.title} />
            </div>
            <h3 className="final-title">{finalItem.title}</h3>
            <p className="final-caption">{finalItem.caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
