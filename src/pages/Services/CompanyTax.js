// src/components/KadasthoLanding.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    id: "01",
    title: "Sole Proprietorship Registration",
    description:
      "A simple and cost-effective business structure for individuals.",
    includes:
      "Udyam Registration, GST Registration, ITR Filing, Shop & Establishment License.",
  },
  {
    id: "02",
    title: "Partnership Firm Registration",
    description: "A traditional business structure for 2 or more partners.",
    includes:
      "Registration Deed Preparation, Name Approval, Stamp Duty & Registration support, PAN/TAN/GST Registration, Optional GST Registration.",
  },
  {
    id: "03",
    title: "Private Limited (Pvt Ltd) Company Registration",
    description:
      "A highly trusted and scalable company structure recognized across the globe.",
    includes:
      "Digital Signature Certificate (DSC), Director Identification Number (DIN), Name Approval (RUN/Spice+), Memorandum (MoA), Certificate of Incorporation (CoI), PAN/TAN, Commencement of Business Filing.",
  },
  {
    id: "04",
    title: "One Person Company (OPC) Registration",
    description: "A special company type for single founders.",
    includes:
      "DIN, DSC + DIN, Name Approval, MOA/AOA, Incorporation Certificate, PAN/TAN.",
  },
  {
    id: "05",
    title: "GST Registration",
    description:
      "Fast and hassle-free GST Registration for businesses selling goods or services.",
    includes:
      "Document preparation, Application filing, Follow up with tax officers, ARN & GSTIN Issuance, Full implementation guidance.",
  },
  {
    id: "06",
    title: "Income Tax Return (ITR) Filing",
    description:
      "Professional ITR Filing for individuals, freelancers, businesses, and corporates.",
    includes:
      "TDS/TCS Certification, Deduction analysis, Tax Computation, Filing ITR for individuals, businesses, or rental income, Filing ITR for companies & partners.",
  },
];

const KadasthoLanding = () => {
  return (
    <div className="min-h-screen bg-[#F7F1EC] dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Spacer for fixed navbar */}
      <div className="h-20 md:h-24" />

      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 relative overflow-hidden">
        {/* Left Text */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Complete Company Registration & Tax Filing Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300"
          >
            Quick setup, accurate filing, and complete legal support.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
            }}
            className="bg-[#8D5A3A] hover:bg-[#7a4b2f] text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300"
          >
            <Link to="/register">Register</Link>
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative"
        >
          <motion.img
            src="/images/plain.png"
            alt="Business Team"
            className="w-full max-w-md rounded-lg shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </header>

      {/* Services Section */}
      <section className="px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                scale: 1.03,
                rotate: 0,
                boxShadow: "0px 15px 25px rgba(0,0,0,0.2)",
                borderBottom: "4px solid #B8860B", // gold accent
              }}
              className="border rounded-lg p-6 cursor-pointer border-transparent transition-all duration-300 bg-[#F7F1EC] dark:bg-gray-800"
            >
              <h2 className="text-3xl font-bold text-[#B8860B] mb-2">
                {service.id}
              </h2>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {service.description}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {service.includes}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default KadasthoLanding;
