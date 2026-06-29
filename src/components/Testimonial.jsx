import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Michael Anderson",
    role: "Business Traveler",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Exceptional hospitality and luxurious rooms. Everything was perfect from check-in to check-out.",
  },
  {
    id: 2,
    name: "Sophia Williams",
    role: "Tourist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Absolutely loved the ambience and premium services. The rooms were elegant and very comfortable.",
  },
  {
    id: 3,
    name: "Daniel Brown",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    review:
      "One of the best hotel experiences I've had. Clean rooms, amazing food, and outstanding staff.",
  },
];

function Testimonials() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-[#f8f0eb]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-lime-500 mb-3">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What Our Guests Say
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 
                bg-lime-400/5 blur-2xl transition duration-500"
              ></div>

              {/* User */}
              <div className="flex items-center gap-4 mb-5 relative z-10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-lime-400"
                />

                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                "{item.review}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
