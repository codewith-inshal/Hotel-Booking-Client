import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cardData = [
  {
    id: 1,
    title: "Presidential",
    desc: "The Presidential Room represents the pinnacle of luxury and sophistication.",
    price: "Price: 160$",
    rating: "Rating: ⭐⭐⭐⭐⭐ (4.9)",
    review: "Absolutely outstanding! The best room I have ever stayed in.",
    img: "Presidential.jpg",
  },
  {
    id: 2,
    title: "Vip",
    desc: "The VIP Room is designed for guests who value comfort, privacy, and elegance.",
    price: "Price: 90$",
    rating: "Rating: ⭐⭐⭐⭐☆ (4.7)",
    review: "Loved the privacy and comfort. Definitely worth booking again.",
    img: "Vip.jpg",
  },
  {
    id: 3,
    title: "Executive",
    desc: "The Executive Room is ideal for business travelers and professionals seeking comfort with functionality.",
    price: "Price: 65$",
    rating: "Rating: ⭐⭐⭐⭐☆ (4.5)",
    review: "Very convenient for business travel. Quiet and comfortable.",
    img: "Executive.jpg",
  },
  {
    id: 4,
    title: "Double",
    desc: "The Double Room is a comfortable and practical choice for couples, friends, or small families.",
    price: "Price: 45$",
    rating: "Rating: ⭐⭐⭐⭐☆ (4.2)",
    review: "Nice room and very comfortable bed. Great value for money.",
    img: "Double.jpg",
  },
];

function StaticRooms() {
  return (
    <div className="bg-gray-50 py-20">
      <Container>
        {/* Section Header */}
        <div className="mb-14 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-lime-500 mb-2">
            Our Rooms
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Rooms & Suites
          </h2>
        </div>

        <Row className="g-4">
          {cardData.map((item, index) => (
            <Col key={item.id} xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[300px] object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90"></div>

                {/* Content */}
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>

                  <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                    {item.desc}
                  </p>

                  <div className="text-sm text-gray-300 space-y-1 mb-4">
                    <p>{item.price}</p>
                    <p>{item.rating}</p>
                  </div>

                  {/* Button */}
                  <Link to="/rooms">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 0px 20px rgba(132,204,22,0.6)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-lime-400 text-black text-sm font-semibold px-6 py-2 rounded-full"
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default StaticRooms;
