import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TimelinesPage.css";

const ITEMS = [
  { id: 1, file: "/FirstImage.jpg", title: "29th Feb, 2024", caption: "I think this was the first sign of a friendship growing over Whatsapp. Defintely could not have predicted the longitevity of it" },
  { id: 2, file: "/SecondImage.jpg", title: "20th Jun, 2024", caption: "Projects with you have always been a lot of fun. But this was a crazy bomb to receive from CT before a fun friday 😂" },
  { id: 3, file: "/ThirdImage.jpg", title: "14th Sept, 2024", caption: "Naive of us to be okay missing an opportunity to meet. Now it's all we talk about 😂" },
  { id: 4, file: "/ForthImage.jpg", title: "01st Jan, 2025", caption: "You innocently shared this picture. I've held on to it since (I hope this is not a creep alert 😂)" },
  { id: 5, file: "/FifthImage.jpg", title: "11th Jan, 2025", caption: "Definetly not a bad looking pair. Still a mystery that we have 0 nice pictures together facing the camera" },
  { id: 6, file: "/SixthImage.jpg", title: "12th Jan, 2025", caption: "Nothing here, just an empty room" },
  { id: 7, file: "/SeventhImage.jpg", title: "15th Jan, 2025", caption: "First long text. Many many more to come" },
  { id: 8, file: "/EighthImage.jpg", title: "04th Feb, 2025", caption: "These debates are so much fun. We almost never have them anymore. What happened? 😂" },
  { id: 9, file: "/NinthImage.jpg", title: "15th Feb, 2025", caption: "I was very close to texting you on valentines day. This text was a day-late compromise I made with myself 😂" },
  { id: 10, file: "/TenthImage.jpg", title: "26th Feb, 2025", caption: "By far, my most favourite thing about us" },
  { id: 11, file: "/Option2.jpg", title: "01 Jun, 2025", caption: "This text made my birthday. Thank you once againnn" },
  { id: 12, file: "/Option1.jpg", title: "15th Jul, 2025", caption: "Ummmmm, not sure why I am reminding you of this. Ignoreee" },
  { id: 13, file: "/EleventhImage.jpg", title: "30th Aug, 2025", caption: "The start to a trip" },
  { id: 14, file: "/TwelthImage.jpg", title: "2nd Sep", caption: "Beautiful picture captured. What unfolded were 2 days of 🤯😭😶😳" },
  { id: 15, file: "/ThirteenthImage.jpg", title: "23rd Sep", caption: "I live for this kind of content" },
  { id: 16, file: "/FourteenthImage.jpg", title: "9th Oct", caption: "and this!" },
  {
    id: 17,
    file: "/FifteenthImage.jpg",
    title: "Happy birthday Manushree!",
    caption: `
    You are already aware of how much you mean to me. I just wanted to remind you again.
    If anyone ever asks you what's the grand-est thing someone has ever done on your birthday, maybe this finds a spot. I hope you liked it and will cherish it on both good days and bad.
    From the 1000s of things spoken and unspoken between us, thank you for tolerating me. You are the best. Happy birthday!
    PS: This picture is too beautiful.
  `,
  },
];

export default function TimelinesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const page = document.querySelector(".timeline-page");
    if (page) page.classList.add("loaded");

    // IntersectionObserver for fade-ins
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { root: null, rootMargin: "0px 0px -15% 0px", threshold: 0.05 }
    );

    const observeItems = () => {
      document.querySelectorAll(".timeline-item").forEach((el) => io.observe(el));
    };
    observeItems();

    // Function that calculates the split point (px) — set based on the 10th item (index 9)
    const updateSplitPoint = () => {
      const tenItem = document.querySelectorAll(".timeline-item")[9]; // index 9 is 10th item
      if (tenItem) {
        // split at the top of the 10th item (relative to document)
        const rect = tenItem.getBoundingClientRect();
        const splitPx = Math.round(rect.top + window.scrollY);
        document.documentElement.style.setProperty("--split-point", `${splitPx}px`);
      } else {
        // fallback (approx): set split 60% down
        const fallback = Math.round(window.innerHeight * 0.6);
        document.documentElement.style.setProperty("--split-point", `${fallback}px`);
      }
    };

    // update on load/resize and after images load (images may change layout)
    const onResize = () => {
      updateSplitPoint();
    };
    window.addEventListener("resize", onResize);

    // images load: update split once each image loads
    const imgs = Array.from(document.querySelectorAll(".thumb img, .final-thumb img"));
    let imagesToListen = imgs.length;
    if (imagesToListen === 0) updateSplitPoint();

    imgs.forEach((img) => {
      if (img.complete) {
        imagesToListen -= 1;
      } else {
        img.addEventListener(
          "load",
          () => {
            imagesToListen -= 1;
            if (imagesToListen <= 0) {
              // ensure layout has settled
              requestAnimationFrame(updateSplitPoint);
            }
          },
          { once: true }
        );
      }
    });

    // initial call (in case items already in place)
    setTimeout(() => requestAnimationFrame(updateSplitPoint), 60);

    // cleanup
    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Prepare items: all except final (index last) used in alternating timeline
  const allButFinal = ITEMS.slice(0, ITEMS.length - 1);
  const finalItem = ITEMS[ITEMS.length - 1];

  return (
    <div className="timeline-page">
      <div className="timeline-wrapper">
        <header className="hero-header">
          <h1 className="hero-title">Small things that made it fun</h1>
          <p className="hero-sub">Tried to compile few of our favorite moments over 20000+ whatsapp texts & 3 meetings over the last 20 months</p>
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

        {/* final centered item BEFORE buttons (user requested) */}
        <div className="final-reveal" role="region" aria-label="final reveal" style={{ marginTop: 36 }}>
          <div className="final-card">
            <div className="final-thumb">
              <img src={finalItem.file} alt={finalItem.title} />
            </div>
            <h3 className="final-title">{finalItem.title}</h3>
            <p className="final-caption">{finalItem.caption}</p>
          </div>
        </div>

        {/* buttons come after final reveal */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          <button className="next-btn" onClick={() => navigate(-1)}>Main</button>
          <button className="next-btn" onClick={() => navigate("/failed")}>Other ideas I dropped 😂 </button>
        </div>
      </div>
    </div>
  );
}
