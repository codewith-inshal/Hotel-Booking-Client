import React from "react";
import HeroSection from "../components/HeroSection";
import ExperienceSection from "../components/Stats";
import Facility from "../components/Facility";
import StaticRooms from "../components/StaticRooms";
import WhyChooseUs from "../components/ChooseUs";
import Testimonials from "../components/Testimonial";

function Homepage() {
  return (
    <div>
      <HeroSection />
      <ExperienceSection />
      <StaticRooms />
      <Facility />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}

export default Homepage;
