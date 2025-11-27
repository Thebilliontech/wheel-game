import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DareCardGame() {
  const [result, setResult] = useState(null);
  const [shuffling, setShuffling] = useState(false);

  // ✨ YOUR DARE LIST — REPLACE OR ADD MORE
  const dares = [
    "Do 10 pushups",
    "Call someone and sing",
    "Dance for 10 seconds",
    "Say the alphabet backward",
    "Do a funny face",
    "Prank message a friend",
    "Spin around 5 times",
    "Do a celebrity imitation",
    "Tell an embarrassing story",
    "Act like a robot"
  ];

  const shuffleCard = () => {
    setShuffling(true);
    setResult(null);

    setTimeout(() => {
      const random = dares[Math.floor(Math.random() * dares.length)];
      setResult(random);
      setShuffling(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-800 to-black flex flex-col items-center justify-center p-6 text-white font-sans">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Dare Card Shuffler 🎴
      </motion.h1>

      {/* SHUFFLE BUTTON */}
      <motion.button
        onClick={shuffleCard}
        whileTap={{ scale: 0.95 }}
        className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-2xl shadow-xl text-lg font-semibold"
      >
        Shuffle Dare
      </motion.button>

      {/* SHUFFLING TEXT */}
      <AnimatePresence>
        {shuffling && (
          <motion.div
            key="shuffle"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="mt-8 text-xl font-light tracking-wide"
          >
            Picking a dare...
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESULT CARD */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-10 w-72 min-h-[170px] bg-gradient-to-br from-purple-500 to-black rounded-3xl flex items-center justify-center text-2xl font-bold shadow-2xl border border-purple-300 p-6 text-center"
          >
            {result}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
