// src/components/AboutUsSection.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import useTheme from "../hooks/useTheme";

// ------------------- AboutUsSection Component -------------------
const AboutUsSection = () => {
  const [darkMode] = useTheme();

  // ------------------- Animation Variants -------------------
  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const float = {
    animate: {
      y: [0, -10, 0, 10, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // ------------------- Color Classes -------------------
  const sectionBg = darkMode ? "bg-gray-900" : "bg-[#F7F1EC]";
  const headingColor = darkMode ? "text-green-400" : "text-green-800";

  return (
    <section
      className={`pt-32 md:pt-36 pb-16 transition-colors duration-500 ${sectionBg} min-h-screen`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* ------------------- About Us Heading ------------------- */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold transition-colors duration-500 text-[#8D5A3A]">
            About Us
          </h2>

          <div
            className={`w-24 h-1 mx-auto mt-2 rounded-full transition-colors duration-500 ${headingColor}`}
          ></div>
        </motion.div>

        {/* ------------------- About Us Content ------------------- */}
        <div className="grid md:grid-cols-2 gap-12 items-start md:items-center">
          <motion.div
            className="relative"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.img
              src="/images/team.jpg"
              alt="Team"
              className="w-full md:w-[90%] rounded-lg shadow-xl mb-8 relative z-10"
              variants={float}
              animate="animate"
            />
            <motion.p
              className={`mt-6 md:mt-10 text-base md:text-lg font-sans relative z-10 p-5 rounded-xl shadow-lg backdrop-blur-md border transition-all duration-500 ${
                darkMode
                  ? "bg-gray-900/40 border-gray-700 text-gray-100"
                  : "bg-white/50 border-gray-300 text-gray-800"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <span className="font-semibold text-[#8D5A3A]">
                KDASTSHO Fintech Solutions Private Limited
              </span>{" "}
              is a progressive technology firm committed to providing
              straightforward, astute, and creative digital solutions to SMEs,
              MSMEs, and individuals.
            </motion.p>
          </motion.div>

          <motion.div
            className={`p-6 md:p-8 rounded-lg shadow-xl leading-relaxed text-sm md:text-base transition-colors duration-500 ${
              darkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-stone-200 text-stone-900"
            }`}
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-[#8D5A3A]">Vision</h3>

            <p>
              Our goal is to provide easy access to technology and financial
              empowerment for everyone—regardless of business size or
              experience. We develop digital tools and services that solve real
              business and financial challenges, enabling efficient operations,
              confident money management, and sustainable financial growth. Our
              focus is on long-term value through software solutions, tax
              consultancy, digital automation, and future investment ecosystems.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
