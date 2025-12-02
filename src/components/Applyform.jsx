import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const JobApplicationForm = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(false);

  // Image carousel list
  const images = ["/images/job.png", "/images/job1.png", "/images/job2.png"];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, []);

  const formVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.4 },
    }),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setToast(true);
      setTimeout(() => setToast(false), 3200);
      e.target.reset();
    }, 1700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full min-h-[calc(100vh-64px)] flex items-start justify-center bg-neutral-900 dark:bg-neutral-950 text-white font-sans px-4 py-10 pt-24 md:pt-32"
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl shadow-2xl"
      >
        {/* ---------- LEFT IMAGE CAROUSEL ---------- */}
        <div className="relative bg-black dark:bg-gray-900 rounded-l-xl select-none">
          <img
            src={images[currentSlide]}
            alt="job"
            className="w-full h-full object-cover opacity-90 rounded-l-xl"
          />

          {/* Carousel arrows */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20">
            <button
              className="p-3 rounded-full bg-white/15 hover:bg-white/25 transition"
              onClick={prevSlide}
            >
              <FaArrowLeft className="text-white text-lg" />
            </button>
            <button
              className="p-3 rounded-full bg-white/15 hover:bg-white/25 transition"
              onClick={nextSlide}
            >
              <FaArrowRight className="text-white text-lg" />
            </button>
          </div>
        </div>

        {/* ------------ RIGHT FORM SECTION ------------ */}
        <div className="bg-amber-900/80 dark:bg-[#3c2d1f]/90 px-8 md:px-10 py-10 md:py-12 rounded-r-xl">
          <h2 className="text-3xl font-semibold mb-8 text-center text-white">
            Apply For Job
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {[
              "Full Name",
              "E-mail ID",
              "Contact Number",
              "Experience / Fresher",
              "Role Applying",
              "Year Of Passed",
            ].map((label, index) => (
              <motion.div
                key={label}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={formVariants}
                className="flex flex-col gap-1"
              >
                <label className="text-sm text-gray-200">
                  {label} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder={label}
                  required
                  className="bg-transparent border-b border-gray-300 focus:border-orange-400 transition outline-none text-white py-2 placeholder-gray-300"
                />
              </motion.div>
            ))}

            {/* File input */}
            <motion.div
              custom={6}
              initial="hidden"
              animate="visible"
              variants={formVariants}
              className="flex flex-col gap-1"
            >
              <label className="text-sm text-gray-200">
                Upload Your Resume <span className="text-red-400">*</span>
              </label>
              <input
                type="file"
                required
                className="bg-transparent border-b border-gray-300 focus:border-orange-400 transition file:bg-orange-700 file:text-white file:px-3 file:py-1 file:rounded-md cursor-pointer"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              custom={7}
              initial="hidden"
              animate="visible"
              variants={formVariants}
            >
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-700 font-medium tracking-wide transition transform ${
                  submitting
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-[1.03] hover:shadow-lg"
                }`}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* Toast Message */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-bounce">
          Application Submitted Successfully 🎉
        </div>
      )}
    </motion.div>
  );
};

export default JobApplicationForm;
