import React from "react";
import { motion } from "framer-motion";

// Subtle set of emojis (kept professional and minimal)
const emojis = ["📸", "🎞️", "🎥", "🖼️", "💫"];

const HeroSection = () => {
  return (
    <div className="relative h-[40vh] rounded-2xl flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-800 via-gray-750 to-gray-600">
      {/* Soft blurred overlay for depth */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Floating Emojis (subtle motion + low opacity, faster) */}
      <div className="absolute inset-0 overflow-hidden">
        {emojis.map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl sm:text-5xl select-none opacity-15"
            style={{
              fontFamily: "'Noto Color Emoji', sans-serif",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 12, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 3, // faster than before
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      {/* Centered Hero Text with subtle spotlight */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Spotlight behind text */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-96 h-96 bg-white/5 rounded-full filter blur-3xl z-0"></div>
        </div>

        <h1
          className="relative text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight z-10"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Image Gallery
        </h1>
        <p
          className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto z-10"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <h4 class="text-white text-lg leading-relaxed">
  <strong>Discover Your Moments.</strong> Every image and video captures a story. Our gallery offers a sleek, immersive space to explore and relive your favorite memories effortlessly.
</h4>
        </p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
