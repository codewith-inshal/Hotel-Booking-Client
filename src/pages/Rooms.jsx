import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWifi,
  FaSwimmingPool,
  FaConciergeBell,
  FaSpa,
} from "react-icons/fa";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000";

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/rooms`);
      setRooms(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch rooms");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f0eb] via-white to-gray-100">
      {/* HERO */}
      <div className="relative h-[55vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop')",
          }}
        ></motion.div>

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.35em] text-lime-400 text-sm mb-3"
          >
            Premium Suites
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-4xl md:text-6xl font-extrabold mb-5"
          >
            Discover Luxury Rooms
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl text-gray-300 text-sm md:text-lg"
          >
            Experience premium comfort, elegant interiors, and world-class
            hospitality tailored for unforgettable stays.
          </motion.p>
        </div>
      </div>

      {/* ROOMS */}
      <div className="py-20 px-4">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-lime-500 mb-3">
            Our Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Available Rooms
          </h2>

          <div className="w-28 h-1 bg-lime-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room._id}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card
                  className="border-0 overflow-hidden rounded-3xl 
                  bg-white/70 backdrop-blur-md shadow-lg 
                  hover:shadow-2xl transition-all duration-500"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={`${API_URL}/uploads/${room.image}`}
                      alt={room.title}
                      className="w-full h-[260px] object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* PRICE */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        bg=""
                        className="bg-lime-400 text-black px-3 py-2 rounded-full text-sm shadow-md"
                      >
                        ${room.price} / Night
                      </Badge>
                    </div>

                    {/* TITLE */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">{room.title}</h3>

                      <div className="flex items-center gap-2 text-sm text-gray-200">
                        <FaMapMarkerAlt />
                        <span>Luxury Hotel Suite</span>
                      </div>
                    </div>
                  </div>

                  {/* BODY */}
                  <Card.Body className="p-5">
                    <Card.Text className="text-gray-600 text-sm leading-relaxed mb-4">
                      {room.desc}
                    </Card.Text>

                    {/* FEATURES */}
                    <div className="flex items-center justify-between mb-5 text-sm">
                      <div className="flex items-center gap-2 text-yellow-500 font-medium">
                        <FaStar />
                        <span>{room.rating} Rating</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500">
                        <FaWifi />
                        <span>Free Wifi</span>
                      </div>
                    </div>

                    {/* BUTTON */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Button
                        variant=""
                        onClick={() => {
                          const user = JSON.parse(localStorage.getItem("user"));

                          if (!user) {
                            navigate("/user-login", {
                              state: {
                                from: `/book-room/${room._id}`,
                              },
                            });
                          } else {
                            navigate(`/book-room/${room._id}`);
                          }
                        }}
                        className="w-100 border-0 rounded-full py-3 
                        bg-lime-400 text-black fw-semibold
                        shadow-md hover:shadow-lime-300 
                        transition-all duration-300"
                      >
                        Book Room
                      </Button>
                    </motion.div>
                  </Card.Body>

                  {/* GLOW */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 
                    transition duration-500 pointer-events-none"
                  >
                    <div
                      className="absolute -inset-1 bg-lime-400/10 
                      blur-2xl rounded-3xl"
                    ></div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* EXTRA SECTION */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-lime-500 mb-3">
              Why Choose Us
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Experience Luxury & Comfort
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaSwimmingPool size={30} />,
                title: "Infinity Pool",
                desc: "Relax in our luxurious infinity pool with breathtaking views.",
              },
              {
                icon: <FaConciergeBell size={30} />,
                title: "24/7 Service",
                desc: "Enjoy premium room service and hospitality any time of the day.",
              },
              {
                icon: <FaSpa size={30} />,
                title: "Spa & Wellness",
                desc: "Refresh your body and mind with our wellness treatments.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-b from-[#f8f0eb] to-white 
                rounded-3xl p-8 shadow-lg hover:shadow-2xl 
                transition-all duration-300 text-center group"
              >
                <div
                  className="w-16 h-16 mx-auto mb-5 flex items-center justify-center 
                  rounded-2xl bg-lime-400 text-black shadow-md
                  group-hover:scale-110 transition duration-300"
                >
                  {item.icon}
                </div>

                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
