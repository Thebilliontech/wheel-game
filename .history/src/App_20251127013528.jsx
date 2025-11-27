import React, { useState, useRef } from "react";

/*
  Single-page wheel/dare game
  - Replace the small sample arrays below with your full 100 questions and your hidden list
*/

const questions = [
  // replace these with the 100 dares/questions you will send
  "Do 10 jumping jacks",
  "Sing the chorus of your favorite song",
  "Tell a secret you haven't told anyone",
  "Impersonate your favorite celebrity for 30s",
  "Do a dramatic monologue about pizza",
  "Share your funniest childhood memory",
  "Text your crush 'Can we talk?'",
  "Make a weird face and hold it for 10s",
  "Dance without music for 30s",
  "Draw a smiley with your non-dominant hand"
];

const hiddenQuestions = [
  // secret list chosen when Start clicked rapidly 3 times
  "Hidden Dare: Eat a spoonful of hot sauce",
  "Hidden Dare: Call a friend and confess a silly made-up crime",
  "Hidden Dare: Post a dramatic emoji story",
  "Hidden Dare: Do a 1-minute improv speech about socks",
  "Hidden Dare: Wear a hat made of foil for 5 minutes"
];

export default function App() {
  const [state, setState] = useState("idle"); // idle | result
  const [current, setCurrent] = useState(null);
  const clickTimesRef = useRef([]);
  const lastPickedRef = useRef(null);

  // Parameters for the quick triple-click detection:
  // consider 3 clicks within 800ms to be "fast triple click"
  const TRIPLE_CLICK_WINDOW_MS = 800;

  function pickRandom(arr) {
    if (!arr || arr.length === 0) return "No dares available";
    const idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
  }

  function handleStartClick() {
    const now = Date.now();
    // keep last few timestamps
    clickTimesRef.current.push(now);
    // remove old entries outside the window
    clickTimesRef.current = clickTimesRef.current.filter(
      (t) => now - t <= TRIPLE_CLICK_WINDOW_MS
    );

    // if we have 3 or more timestamps in the window, trigger hidden list
    const triple = clickTimesRef.current.length >= 3;

    let pick;
    if (triple) {
      // pick from hidden list
      pick = pickRandom(hiddenQuestions);
      // clear timestamps so we don't re-trigger accidentally
      clickTimesRef.current = [];
    } else {
      // regular pick
      // ensure we don't repeat the immediate previous pick for a better UX
      let attempts = 0;
      do {
        pick = pickRandom(questions);
        attempts++;
      } while (pick === lastPickedRef.current && attempts < 10);
    }

    lastPickedRef.current = pick;
    setCurrent(pick);
    setState("result");
  }

  function handleTryAgain() {
    setState("idle");
    setCurrent(null);
    // clear click timestamps
    clickTimesRef.current = [];
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="title">Dark Wheel — Dare Game</h1>
        <p className="subtitle">Tap Start — or find the hidden list by clicking triple-fast ✨</p>
      </header>

      <main className="content">
        {state === "idle" && (
          <div className="start-area">
            <div className="wheel-mock" aria-hidden>
              {/* purely decorative wheel circle */}
              <div className="wheel-inner">🎯</div>
            </div>

            <button
              className="btn start-btn"
              onClick={handleStartClick}
              aria-label="Start the dare"
            >
              Start
            </button>

            <p className="hint">Tap Start to pull a random dare.</p>
            <small className="mobile-hint">Tip: Click Start 3 times fast for a secret list</small>
          </div>
        )}

        {state === "result" && (
          <div className="result-area">
            <div className="card">
              <h2 className="card-title">Your Dare</h2>
              <p className="card-text">{current}</p>
            </div>

            <div className="actions">
              <button className="btn ghost-btn" onClick={handleTryAgain}>
                Try Again
              </button>
              <button
                className="btn small-copy"
                onClick={() => {
                  if (!current) return;
                  navigator.clipboard?.writeText(current).then(() => {
                    // quick feedback
                    alert("Dare copied to clipboard");
                  }).catch(()=> {
                    alert("Could not copy. Select and copy manually.");
                  });
                }}
              >
                Copy Dare
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <small>Mobile-first • Dark-mode • Sleek</small>
      </footer>
    </div>
  );
}
