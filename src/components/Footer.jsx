import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-black text-white pt-16 pb-8 px-6 md:px-16 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Logo + About */}
        <div>
          <h2 className="font-extrabold text-2xl mb-4 tracking-wide">
            DELUXE{" "}
            <span className="text-lime-400 drop-shadow-[0_0_6px_#84cc16]">
              STAYS
            </span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Experience luxury, comfort, and world-class hospitality. Your
            perfect stay begins here.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            {[FaFacebook, FaInstagram, FaYoutube, FaLinkedin].map(
              (Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -4,
                    scale: 1.1,
                    color: "#84cc16",
                  }}
                  className="text-xl cursor-pointer transition"
                >
                  <Icon />
                </motion.div>
              ),
            )}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Rooms", path: "/rooms" },
              { name: "Bookings", path: "/bookings" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
                className="cursor-pointer hover:text-lime-400 transition"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Extra */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-gray-400 text-sm mb-2">
            Email: support@deluxestays.com
          </p>
          <p className="text-gray-400 text-sm mb-2">Phone: +92 300 1234567</p>
          <p className="text-gray-400 text-sm">Location: Pakistan</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 pt-6 border-t border-white/10 text-center text-gray-500 text-sm">
        © 2026 DELUXE STAYS. All rights reserved.
      </div>
    </motion.footer>
  );
}

export default Footer;
