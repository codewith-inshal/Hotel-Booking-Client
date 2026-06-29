import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Zoom Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      ></motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6">
        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm md:text-base tracking-[0.4em] uppercase text-lime-400 mb-4"
        >
          Where Luxury Meets Comfort
        </motion.h2>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold tracking-wide mb-6 leading-tight"
        >
          DELUXE STAYS
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="max-w-xl text-sm md:text-lg text-gray-300 mb-8"
        >
          Experience world-class comfort, luxury rooms, and unforgettable stays
          tailored just for you.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <Link to="/rooms">
            <motion.button
              whileHover={{
                scale: 1.07,
                boxShadow: "0px 0px 20px rgba(132,204,22,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-lime-400 text-black font-semibold 
              px-8 py-3 rounded-full text-sm md:text-base
              shadow-md transition-all duration-300"
            >
              Explore Rooms
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[22px] h-[36px] border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-[4px] h-[6px] bg-white mt-2 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroSection;
