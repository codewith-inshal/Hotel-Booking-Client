import React from "react";
import { motion } from "framer-motion";

function WhyChooseUs() {
  const features = [
    {
      title: "Luxury Experience",
      desc: "Enjoy world-class rooms designed with elegance and comfort in mind.",
    },
    {
      title: "Prime Locations",
      desc: "Our hotels are located in the heart of the city for easy access.",
    },
    {
      title: "24/7 Support",
      desc: "Our staff is always ready to assist you anytime, anywhere.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Happy Guests" },
    { value: "500+", label: "Rooms Available" },
    { value: "4.8", label: "Average Rating" },
  ];

  return (
    <div className="py-20 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="why-us.jpg"
            alt="Luxury Hotel"
            className="rounded-2xl shadow-xl w-full object-cover"
          />

          {/* Floating Stats Card */}
          <div className="absolute bottom-[-20px] left-6 bg-white shadow-lg rounded-xl px-6 py-4 flex gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <h4 className="text-xl font-bold text-gray-900">
                  {stat.value}
                </h4>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-lime-500 mb-3">
            Why Choose Us
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            We Provide The Best Experience For You
          </h2>

          <p className="text-gray-600 mb-8">
            At Deluxe Stays, we combine luxury, comfort, and top-tier service to
            ensure your stay is nothing short of exceptional.
          </p>

          {/* Features */}
          <div className="space-y-5">
            {features.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 6 }}
                className="flex items-start gap-4"
              >
                <div className="w-3 h-3 mt-2 bg-lime-400 rounded-full"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(132,204,22,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-lime-400 text-black font-semibold px-7 py-3 rounded-full"
          >
            Discover More
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
