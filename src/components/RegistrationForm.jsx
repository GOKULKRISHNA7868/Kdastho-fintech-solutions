import React from "react";
import { motion } from "framer-motion";
import { CalendarIcon } from "@heroicons/react/24/solid";

const RegistrationForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3A1F0B] via-[#5C2D0C] to-[#8D5A3A] flex flex-col items-center justify-center text-gray-900 dark:text-gray-100 font-sans">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold text-[#FFA500] mb-12 text-center px-4"
      >
        Register with your details
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 md:p-12 w-full max-w-4xl"
      >
        <p className="text-gray-800 dark:text-gray-200 text-lg md:text-xl mb-8 text-center">
          Become a part of our growing community.
        </p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFA500] dark:bg-gray-700 dark:text-gray-100 transition"
            />
          </div>
          {/* Last Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFA500] dark:bg-gray-700 dark:text-gray-100 transition"
            />
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Enter E-mail id</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFA500] dark:bg-gray-700 dark:text-gray-100 transition"
            />
          </div>
          {/* Phone */}
          <div className="flex flex-col relative">
            <label className="mb-2 font-medium">Phone Number</label>
            <div className="flex items-center">
              <span className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-l-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200">
                +91
              </span>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                className="flex-1 rounded-r-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFA500] dark:bg-gray-700 dark:text-gray-100 transition"
              />
            </div>
          </div>
          {/* Date */}
          <div className="flex flex-col relative">
            <label className="mb-2 font-medium">Select Date</label>
            <div className="relative">
              <CalendarIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400 dark:text-gray-300" />
              <input
                type="date"
                placeholder="dd/mm/yy"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFA500] dark:bg-gray-700 dark:text-gray-100 transition"
              />
            </div>
          </div>
          {/* Time */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Enter Time</label>
            <input
              type="time"
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFA500] dark:bg-gray-700 dark:text-gray-100 transition"
            />
          </div>
          {/* Service Details */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 font-medium">
              Enter your service details
            </label>
            <textarea
              rows="4"
              placeholder="Describe your service details..."
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFA500] dark:bg-gray-700 dark:text-gray-100 transition resize-none"
            ></textarea>
          </div>
        </form>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-b from-[#5C2D0C] to-[#FFA500] text-white px-10 py-3 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
