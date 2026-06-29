import React from "react";
import {
  FaBath,
  FaCar,
  FaCocktail,
  FaConciergeBell,
  FaShuttleVan,
  FaSwimmingPool,
} from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    icon: <FaShuttleVan size={28} />,
    title: "Pick Up & Drop",
    desc: "Convenient airport and city pick-up & drop services available on request.",
  },
  {
    icon: <FaCar size={28} />,
    title: "Parking Space",
    desc: "Secure and spacious on-site parking for all guests.",
  },
  {
    icon: <FaCocktail size={28} />,
    title: "Welcome Drink",
    desc: "Refreshing welcome drink served upon arrival",
  },
  {
    icon: <FaBath size={28} />,
    title: "Hot & Cold Water",
    desc: "24/7 hot and cold water supply in all rooms.",
  },
  {
    icon: <FaConciergeBell size={28} />,
    title: "Full Board",
    desc: "Complete meal plan including breakfast, lunch, and dinner.",
  },
  {
    icon: <FaSwimmingPool size={28} />,
    title: "Swimming Pool",
    desc: "Clean and well-maintained swimming pool for relaxation and leisure.",
  },
];

function Facility() {
  return (
    <div className="bg-gradient-to-b from-[#f8f0eb] to-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-lime-500 mb-2">
            Services
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Facilities & Services
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/60 backdrop-blur-md 
              border border-white/40 rounded-2xl p-6 
              shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Glow Effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
              transition duration-300 bg-lime-400/10 blur-xl"
              ></div>

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                className="relative z-10 w-14 h-14 flex items-center justify-center 
                bg-lime-400 text-black rounded-xl mb-4 shadow-md"
              >
                {service.icon}
              </motion.div>

              {/* Title */}
              <h3 className="relative z-10 text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-sm text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Facility;
