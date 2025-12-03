// src/components/SmartInvestmentHero.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
const SmartInvestmentHero = () => {
  // Intersection Observer for bottom sections
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="bg-[#F7F1EC] dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:flex md:items-center md:justify-between relative">
        {/* Left: Heading & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight dark:text-white">
            Smart Investment Services for Your Financial Growth
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Smart strategies designed to secure your financial future.
          </p>
          <Link to="/investments2">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
              }}
              className="bg-[#8D5A3A] hover:bg-[#7a4b2f] text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300"
            >
              View Solutions
            </motion.button>
          </Link>
        </motion.div>

        {/* Right: Image with decorative shapes */}
        <div className="md:w-1/2 mt-12 md:mt-0 relative flex justify-center items-center">
          {/* Decorative abstract shapes */}
          <div className="absolute top-0 left-1/4 w-16 h-16 border-2 border-[#8D5A3A] rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-20 h-20 border-2 border-[#8D5A3A] rounded-full"></div>
          <img
            src="/images/investment.png"
            alt="Person stacking coins"
            className="relative z-10 w-full max-w-sm md:max-w-md rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Information Sections */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {/* Section 01 */}
        <motion.div
          ref={ref1}
          initial={{ opacity: 0, y: 40 }}
          animate={inView1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-[#FAF5F0] dark:bg-gray-800 rounded-lg p-8 space-y-4 shadow-md"
        >
          <div className="text-[#F7E5D9] bg-[#8D5A3A] rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
            01
          </div>
          <h2 className="text-2xl font-semibold dark:text-white">
            Retirement Planning
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            A structured financial plan to secure your future lifestyle after
            retirement.
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Calculation of future retirement corpus</li>
            <li>Monthly/annual contribution planning</li>
            <li>Risk-based investment allocation</li>
            <li>Inflation-adjusted financial projections</li>
            <li>Retirement goal tracking</li>
            <li>Pension planning options</li>
            <li>Tax saving strategies</li>
            <li>Portfolio review & annual performance report</li>
          </ul>
        </motion.div>

        {/* Section 02 */}
        <motion.div
          ref={ref2}
          initial={{ opacity: 0, y: 40 }}
          animate={inView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-[#FAF5F0] dark:bg-gray-800 rounded-lg p-8 space-y-4 shadow-md"
        >
          <div className="text-[#F7E5D9] bg-[#8D5A3A] rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
            02
          </div>
          <h2 className="text-2xl font-semibold dark:text-white">
            Wealth Building Plan
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Designed to help clients grow long-term wealth through smart,
            diversified investments.
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Risk profiling (Conservative / Moderate / Aggressive)</li>
            <li>Custom investment portfolio creation</li>
            <li>SIP strategies (saving for short, mid, long-term)</li>
            <li>
              Diversification across mutual funds, bonds, gold, and other safe
              assets
            </li>
            <li>Compound interest-focused financial strategy</li>
            <li>Automated quarterly portfolio monitoring</li>
            <li>Wealth growth projections</li>
            <li>Guidance on taxation & asset allocation</li>
          </ul>
        </motion.div>
      </section>
    </div>
  );
};

export default SmartInvestmentHero;
