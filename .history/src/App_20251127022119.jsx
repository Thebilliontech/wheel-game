import { useState, useRef } from "react";

export default function App() {
  /* ------------------ QUESTIONS LIST ------------------ */
  const questions = [
    "Do 10 push ups",
    "Sing a song loudly",
    "Make a funny dance for 10 seconds",
    "Say a joke",
    "Imitate your favourite celebrity",
  ];

  /* -------- HIDDEN QUESTIONS (Triple-click mode) ------- */
  const hiddenQuestions = [
    "SECRET DARE: Call someone & speak in a movie villain voice",
    "SECRET DARE: Pretend to be a robot for 20 seconds",
    "SECRET DARE: Shout 'I AM THE KING' softly 😂",
  ];

  const [screen, setScreen] = useState("home"); // "home" | "result"
  const [result, setResult] = useState("");

  const clickTimes = useRef([]);

  const TRIPLE_CLICK_TIME = 800; // milliseconds for 3 fast clicks

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function handleStart() {
    const now = Date.now();

    clickTimes.current.push(now);

    clickTimes.current = clickTimes.current.filter(
      (t) => now - t < TRIPLE_CLICK_TIME
    );

    const isTriple = clickTimes.current.length >= 3;

    let chosen;

    if (isTriple) {
      chosen = pickRandom(hiddenQuestions);
      clickTimes.current = [];
    } else {
      chosen = pickRandom(questions);
    }

    setResult(chosen);
    setScreen("result");
  }

  function resetGame() {
    setScreen("home");
    setResult("");
    clickTimes.current = [];
  }

  return (
    <div className="flex flex-col items-center text-center w-full min-h-screen p-6">

      <h1 className="text-2xl font-bold text-purple-400 mb-2">
        DARK WHEEL DARE GAME
      </h1>

      {/* Home Screen */}
      {screen === "home" && (
        <div className="mt-20 flex flex-col items-center gap-6">

          <div className="w-52 h-52 rounded-full bg-gradient-to-br from-purple-700 to-gray-800 flex items-center justify-center shadow-xl">
            <span className="text-5xl">🎯</span>
          </div>

          <button
            onClick={handleStart}
            className="bg-purple-500 hover:bg-purple-600 text-black text-xl font-bold py-3 px-10 rounded-full shadow-lg transition active:scale-95"
          >
            START
          </button>

          <p className="text-gray-400 text-sm">
            Tap START to get a random dare.
          </p>

          <p className="text-gray-500 text-xs">
            Tip: Tap START fast 3 times to unlock secret dares 👀
          </p>
        </div>
      )}

      {/* Result Screen */}
      {screen === "result" && (
        <div className="mt-16 flex flex-col items-center gap-6 w-full max-w-md">

          <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">
              Your Dare
            </h2>
            <p className="text-lg text-gray-200">{result}</p>
          </div>

          <button
            onClick={resetGame}
            className="bg-transparent border border-gray-600 text-gray-300 py-2 px-6 rounded-xl hover:bg-gray-700/30 transition active:scale-95"
          >
            TRY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}
