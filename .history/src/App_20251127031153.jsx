import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DareCardGame() {
  const [result, setResult] = useState(null);
  const [shuffling, setShuffling] = useState(false);

  // Normal dares
  const dares = [
    "Kiss your three favorite body parts of a partners body.",
    "You have ten seconds pick a partner and excite just by kissing. Hint: You're not limited to lips.",
    "Imitate your most flexible sex move.",
    "Play a song you’d like to have sex to.",
    "Using your fingers, find a way to give any partner of your choice goosebumps right now.",
    "Demonstrate a move on any partner of your choice that you saw and liked while watching porn.",
    "Give  any partner of your choice a sensual massage. Start at their feet and work your way up.",
    "For the next 60 seconds, touch yourself like you’d like to touch  any partner of your choice.",
    "play a round of Never Have I Ever. First person to put down all five fingers owes the dare owner a sexual favor of their choice.",
    "Spell out a short, sultry message on  any partner of your choice body…with your tongue.",
    "Initiate a role-play scenario and make  any partner of your choice guess what your character is.",
    "listen to the same audio porn on opposite sides of the room.",
    "pour alcohol in your mouth and go down on  any partner of your choice for 15 seconds.",
    "Remove a piece of clothing from another player without using your hands.",
    "Lick the earlobes of all the players of the opposite sex.",
    "Bite the tip of the tongue from the player of opposite sex in front of you.",
    "The player on your right gets to touch your bum for 30 seconds.",
    "Go to another room, take a sexy picture and send it to one of your co-players.",
    "Take a body shot, you may choose the person. ",
    "Lick the tip of the tongue of the player in front of you (OSex).",
    "Do a French kiss with the player sitting in front of you.(OSex).",
    "Kiss any player of your choice on the mouth.",
    "Give the player to you right a body-to-body massage (30 sec). (op).",
    "Pretend to have the worst sex ever with the player on your left. (OS).",
    "Lick the neck of all the players of the opposite sex.",
    "Kiss the player in front of you on the mouth.",
    "Take a pen and paper and draw your penis/vagina.",
    "Give the group your naughtiest look. ",
    "Massage the legs of the player on your left.", 
    "Look into the eyes of the player on your left and tell him/her: You make me horny/sick/sleepy.",
    "Sit on the lap of the player on your right for one round.",
    "Fake an orgasm, while simulating a sexual position.",
    "Perform a motorboat on somebody. If you are a girl let someone motorboat you.",
    "Give another player of the same sex a big kiss on the mouth.(girls only)",
    "Get blindfolded. All players of opposite sex have to kiss you and you have to guess who it is. Each wrong answer means a shot.",
    "Take one of your co-players into another room and give him/her a sensual massage. (60sec.)",
    "Seduce the player on your right.",
    "Call a sex club and apply for a job. Stay on the phone for at least 1 minute.",
    "Choose a female player and take off her bra using one hand.",
    "Suck a finger of the player in front of you, of the opposite sex. (15sec.)",
    "The player on your right has to spank you.",
    "Give the player on your right a professional erotic massage.",
  ];

  // Secret dares (hidden)
  const secretDares = [
    "pick a partner and do a quickie with them",
    "Go to a room with a partner and both of you should be naked",
    "pick two players, pick one to kiss you, another to rub your pussy/dick",
    "pick a partner to suck you",
    "pick a partner to fuck you",
  ];

  // Ref for hold timer and tracking
  const holdTimer = useRef(null);
  const holdStartTime = useRef(null);
  const secretDareActivated = useRef(false);

  const handleHoldStart = () => {
    secretDareActivated.current = false;
    holdStartTime.current = Date.now();
    
    holdTimer.current = setTimeout(() => {
      // 3 seconds have passed, trigger secret dare
      secretDareActivated.current = true;
      pickDare(true); // secret dare
      holdStartTime.current = null;
    }, 2000); // 3 seconds
  };

  const handleHoldEnd = () => {
    const holdDuration = holdStartTime.current ? Date.now() - holdStartTime.current : 0;
    
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    
    // If secret dare was already activated, don't trigger normal dare
    if (secretDareActivated.current) {
      secretDareActivated.current = false;
      holdStartTime.current = null;
      return;
    }
    
    // If held for less than 3 seconds, trigger normal dare
    if (holdStartTime.current && holdDuration < 3000) {
      pickDare(false); // normal dare
    }
    
    holdStartTime.current = null;
  };

  const pickDare = (secret = false) => {
    setShuffling(true);
    setResult(null);

    setTimeout(() => {
      let picked;

      if (secret) {
        picked = secretDares[Math.floor(Math.random() * secretDares.length)];
      } else {
        picked = dares[Math.floor(Math.random() * dares.length)];
      }

      setResult(picked);
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
        Success Dare Cards 🎴
      </motion.h1>

      {/* SHUFFLE BUTTON */}
      <motion.button
        onMouseDown={handleHoldStart}
        onTouchStart={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onMouseLeave={handleHoldEnd}
        onTouchEnd={handleHoldEnd}
        whileTap={{ scale: 0.95 }}
        className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-2xl shadow-xl text-lg font-semibold relative select-none"
      >
        If you Dare
        <span className="block text-xs mt-1 opacity-70">(click)</span>
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
