// src/components/SmartInvestmentHero.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import {
  FaUmbrellaBeach,
  FaChartLine,
  FaPhoneAlt,
  FaCheck,
} from "react-icons/fa";

import { db, auth } from "../../firebase"; // go up two levels to reach src
// adjust the path
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
const SmartInvestmentHero = () => {
  // Intersection Observer for bottom sections
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const ranges = ["50 lakhs", "75 lakhs", "1 cr+"];
  const [selectedRange, setSelectedRange] = useState(ranges[0]);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callForm, setCallForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [currentPlan, setCurrentPlan] = useState({
    title: "",
    description: "",
  });

  // Open Plan Modal
  function openPlan(range) {
    setSelectedRange(range);
    setPlanModalOpen(true);
    setSuccessMsg("");
  }

  // Submit Plan (simulated)
  function submitPlan() {
    setSuccessMsg(
      `Your request for a "${selectedRange}" plan has been received.`
    );
    setTimeout(() => setPlanModalOpen(false), 1400);
  }

  // Submit Call with Firebase
  async function submitCall(e) {
    e.preventDefault();
    try {
      const currentUser = auth.currentUser; // get currently signed-in user

      await addDoc(collection(db, "Calls_from_investments"), {
        uid: currentUser ? currentUser.uid : null, // store UID or null if not logged in
        name: callForm.name,
        phone: callForm.phone,
        email: callForm.email,
        note: callForm.note,
        planTitle: currentPlan.title,
        planDescription: currentPlan.description,
        status: "pending", // default status
        createdAt: serverTimestamp(),
      });

      setSuccessMsg(
        `Thanks ${callForm.name || "there"} — we'll contact you shortly.`
      );
      setCallForm({ name: "", phone: "", email: "", note: "" });
      setTimeout(() => setCallModalOpen(false), 1400);
    } catch (error) {
      console.error("Error saving contact:", error);
      setSuccessMsg("Something went wrong, please try again.");
    }
  }

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
            {/*<motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
              }}
              className="bg-[#8D5A3A] hover:bg-[#7a4b2f] text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300"
            >
              View Solutions
            </motion.button>*/}
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
      <section
        id="financial-plans"
        className="pt-[calc(var(--navbar-height,80px)+2rem)] scroll-mt-[var(--navbar-height,80px)] bg-gray-100 dark:bg-gray-900 py-16 transition-all"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white"
            >
              Investments & Retirement — Build Wealth with Confidence
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-4 text-gray-600 dark:text-gray-300 text-lg"
            >
              Choose a plan range or book a call with our advisors. We provide
              tailored plans focused on long-term security, growth, and legacy
              building.
            </motion.p>
          </div>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Retirement Planning */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-tr from-[#ffe9d6] to-[#f7d4b6] dark:from-[#2b2b2b] dark:to-[#3a3a3a]">
                  <FaUmbrellaBeach className="text-2xl text-[#8D5A3A] dark:text-[#f3c99a]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Retirement Planning
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Why Retirement Planning is Important
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <FaCheck className="mt-1 text-green-600 dark:text-green-400" />
                  <span>Ensures financial security after you stop working</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="mt-1 text-green-600 dark:text-green-400" />
                  <span>
                    Protects you from inflation and increasing living costs
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="mt-1 text-green-600 dark:text-green-400" />
                  <span>
                    Provides medical and emergency support in later life
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="mt-1 text-green-600 dark:text-green-400" />
                  <span>
                    Reduces dependency on family, loans, or government schemes
                  </span>
                </li>
              </ul>

              {/* Range Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                {ranges.map((r) => (
                  <button
                    key={r}
                    onClick={() => openPlan(r)}
                    className="px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm font-medium bg-white dark:bg-gray-800 hover:scale-105 transform transition"
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex gap-3 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => openPlan(selectedRange)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#8D5A3A] hover:bg-[#7a4b2f] text-white shadow"
                >
                  Plan Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => {
                    if (!auth.currentUser) {
                      alert("Please login to book a call");
                      return;
                    }

                    setCurrentPlan({
                      title: "Retirement Planning",
                      description: "Why Retirement Planning is Important",
                    });
                    setCallModalOpen(true);
                    setSuccessMsg("");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-[#8D5A3A] text-[#8D5A3A] dark:text-[#e6c9b0] hover:bg-[#f9f3ef] dark:hover:bg-gray-700 transition"
                >
                  <FaPhoneAlt /> Book a Call
                </motion.button>
              </div>
            </motion.article>

            {/* Wealth Building */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-tr from-[#e8f9ff] to-[#cfefff] dark:from-[#222] dark:to-[#2f2f2f]">
                  <FaChartLine className="text-2xl text-[#0b63a3] dark:text-[#7ec8ff]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Wealth Building
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Why Wealth Building is Important
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <FaCheck className="mt-1 text-green-600 dark:text-green-400" />
                  <span>Accelerates your financial growth and net worth</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="mt-1 text-green-600 dark:text-green-400" />
                  <span>Creates multiple income streams and assets</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="mt-1 text-green-600 dark:text-green-400" />
                  <span>Provides financial freedom and lifestyle upgrade</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheck className="mt-1 text-green-600 dark:text-green-400" />
                  <span>
                    Builds long-term wealth for family, legacy, and business
                  </span>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                {ranges.map((r) => (
                  <button
                    key={r + "-w"}
                    onClick={() => openPlan(r)}
                    className="px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm font-medium bg-white dark:bg-gray-800 hover:scale-105 transform transition"
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex gap-3 flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => openPlan(selectedRange)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#0b63a3] hover:bg-[#095480] text-white shadow"
                >
                  Plan Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => {
                    if (!auth.currentUser) {
                      alert("Please login to book a call");
                      return;
                    }

                    setCurrentPlan({
                      title: "Wealth Building",
                      description: "Why Wealth Building is Important",
                    });
                    setCallModalOpen(true);
                    setSuccessMsg("");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-[#0b63a3] text-[#0b63a3] dark:text-[#8ccaff] hover:bg-[#f0fbff] dark:hover:bg-gray-700 transition"
                >
                  <FaPhoneAlt /> Book a Call
                </motion.button>
              </div>
            </motion.article>
          </div>
        </div>

        {/* Modal: Plan Now */}
        {planModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setPlanModalOpen(false)}
            />
            <motion.div
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.22 }}
              className="relative z-10 max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border dark:border-gray-700"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Start your plan — {selectedRange}
              </h4>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                We'll prepare a personalized plan based on your chosen range and
                reach out to discuss details & investment instruments.
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={submitPlan}
                  className="px-4 py-2 rounded-lg bg-[#8D5A3A] text-white hover:bg-[#7a4b2f]"
                >
                  Confirm & Proceed
                </button>
                <button
                  onClick={() => setPlanModalOpen(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
              </div>

              {successMsg && (
                <div className="mt-4 text-sm text-green-700 dark:text-green-300">
                  {successMsg}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Modal: Book a Call */}
        {callModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setCallModalOpen(false)}
            />
            <motion.form
              onSubmit={submitCall}
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 0.22 }}
              className="relative z-10 max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border dark:border-gray-700"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Book a Call — {currentPlan.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {currentPlan.description}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <input
                  className="px-3 py-2 rounded-md border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Name"
                  value={callForm.name}
                  onChange={(e) =>
                    setCallForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                />
                <input
                  className="px-3 py-2 rounded-md border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Phone"
                  value={callForm.phone}
                  onChange={(e) =>
                    setCallForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  required
                />
                <input
                  className="px-3 py-2 rounded-md border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Email (optional)"
                  value={callForm.email}
                  onChange={(e) =>
                    setCallForm((p) => ({ ...p, email: e.target.value }))
                  }
                />
                <textarea
                  className="px-3 py-2 rounded-md border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm"
                  placeholder="Brief note (your goals / best time to call)"
                  value={callForm.note}
                  onChange={(e) =>
                    setCallForm((p) => ({ ...p, note: e.target.value }))
                  }
                  rows={3}
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#8D5A3A] text-white"
                >
                  Request Call
                </button>
                <button
                  type="button"
                  onClick={() => setCallModalOpen(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
              </div>

              {successMsg && (
                <div className="mt-4 text-sm text-green-700 dark:text-green-300">
                  {successMsg}
                </div>
              )}
            </motion.form>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default SmartInvestmentHero;
