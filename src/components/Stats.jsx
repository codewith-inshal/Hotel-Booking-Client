import React from "react";
import { motion } from "framer-motion";
import { FaHotel, FaUsers, FaAward, FaConciergeBell } from "react-icons/fa";

const stats = [
  {
    icon: <FaHotel size={34} />,
    number: "120+",
    title: "Luxury Rooms",
  },
  {
    icon: <FaUsers size={34} />,
    number: "10k+",
    title: "Happy Guests",
  },
  {
    icon: <FaAward size={34} />,
    number: "15+",
    title: "Awards Won",
  },
  {
    icon: <FaConciergeBell size={34} />,
    number: "24/7",
    title: "Room Service",
  },
];

function ExperienceSection() {
  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=1600&auto=format&fit=crop')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-lime-400 mb-3">
            Luxury Experience
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Redefining Hospitality
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-md border border-white/10
              rounded-3xl p-8 text-center text-white
              hover:bg-white/15 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 mx-auto mb-5 flex items-center justify-center
                rounded-2xl bg-lime-400 text-black shadow-lg"
              >
                {item.icon}
              </div>

              {/* Number */}
              <h3 className="text-4xl font-bold mb-2">{item.number}</h3>

              {/* Title */}
              <p className="text-gray-300">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;
