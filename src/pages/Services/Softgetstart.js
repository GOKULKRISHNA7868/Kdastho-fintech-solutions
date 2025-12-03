import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";
import { FaRocket, FaBuilding, FaIndustry } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const NAVBAR_HEIGHT = 80;

const solutions = [
  {
    name: "For Startups",
    icon: (
      <FaRocket className="text-blue-500 dark:text-blue-300 text-5xl mx-auto mb-3" />
    ),
    short:
      "Ideal for early-stage founders looking for websites and mobile apps",
    features: [
      "End-to-end guidance from design to deployment",
      "Hosting & domain setup + secure monitoring",
      "Security & compliance with cyber threat protection",
      "Maintenance & upgrades with performance improvements",
      "Cost-effective & scalable solutions for early growth",
    ],
    color: "blue",
  },
  {
    name: "For Medium-Size Businesses",
    icon: (
      <FaBuilding className="text-purple-500 dark:text-purple-300 text-5xl mx-auto mb-3" />
    ),
    short:
      "Structured execution and scalable digital products for growing companies",
    features: [
      "End-to-end execution for redesign & new development",
      "Hosting & infrastructure with performance monitoring",
      "Security & risk management for reliable operations",
      "Maintenance & optimization with feature upgrades",
      "Growth-driven solutions for automation & scaling",
    ],
    color: "purple",
  },
  {
    name: "For Enterprises",
    icon: (
      <FaIndustry className="text-yellow-500 dark:text-yellow-300 text-5xl mx-auto mb-3" />
    ),
    short: "Enterprise-grade digital transformation & mission-critical systems",
    features: [
      "Strategic digital transformation & governance models",
      "Hybrid / cloud infrastructure with global performance",
      "Advanced enterprise security & regulatory compliance",
      "SLA-based maintenance & real-time incident management",
      "Systems built for large teams & high-volume data",
    ],
    color: "yellow",
  },
];

export default function BusinessSolutions() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <section
      id="business-solutions"
      className="pt-[calc(var(--navbar-height,80px)+2rem)] scroll-mt-[var(--navbar-height,80px)] bg-gray-100 dark:bg-gray-900 py-16 transition-all"
    >
      <div className="max-w-7xl w-[92%] mx-auto text-center">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-snug"
        >
          End-to-End Software Solutions to Power Your Growth
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="mt-4 text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-lg"
        >
          Scalable and secure applications tailored for startups, mid-size
          businesses, and enterprises — helping you innovate across every stage.
        </p>
      </div>

      {/* 3 Solutions Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl w-[92%] mx-auto">
        {solutions.map((plan, index) => (
          <motion.div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col"
          >
            {plan.icon}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
              {plan.name}
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
              {plan.short}
            </p>

            <button
              className="mt-6 mx-auto p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <IoIosArrowUp
                className={`text-gray-700 dark:text-gray-300 text-2xl transition ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-5 space-y-3 text-gray-700 dark:text-gray-300"
              >
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start text-sm">
                    ✦ <span className="ml-1">{f}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            {/* CTA Buttons */}
            <div className="mt-8 flex gap-3 justify-center">
              <button className="px-5 py-2.5 text-sm font-medium rounded-xl bg-[#8D5A3A] text-white hover:bg-[#7a4b2f] transition">
                {plan.name === "For Retirees" ? "50L – 1Cr+ Plan" : "Plan Now"}
              </button>

              <button className="px-5 py-2.5 text-sm font-medium rounded-xl border border-[#8D5A3A] text-[#8D5A3A] dark:text-[#C8A48F] dark:border-[#C8A48F] hover:bg-[#f4e9e2] dark:hover:bg-[#5a3c28] transition">
                Book a Call
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
