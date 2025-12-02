import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({ darkMode }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className={`w-full pt-10 pb-6 px-6 lg:px-16 relative transition-all duration-700
      ${loaded ? "opacity-100" : "opacity-0"}
      ${
        darkMode
          ? "bg-[#0b0b0b] text-gray-200"
          : "bg-gradient-to-r from-[#A55D19] to-[#5D3A09] text-white"
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-60 h-60 rounded-full blur-[80px]
        ${darkMode ? "bg-white/5" : "bg-white/10"}`}
      ></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* LOGO + INTRO */}
        <div className="flex flex-col items-start gap-4">
          <img
            src="/images/logok.png"
            alt="KDastsho Logo"
            className="w-24 md:w-28 rounded-full shadow-md hover:scale-105 transition-transform"
          />
          <h2 className="text-2xl font-bold">Kdastsho Fintech Solutions</h2>
          <p
            className={`${
              darkMode ? "text-gray-400" : "text-gray-200"
            } text-base leading-relaxed`}
          >
            KDASTSHO Fintech Solutions Private Limited delivers simple, smart &
            innovative digital solutions to SMEs, MSMEs, and individuals.
          </p>

          {/* SOCIALS */}
          <div className="flex gap-3 mt-2">
            {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <div
                key={i}
                className={`w-8 h-8 flex justify-center items-center rounded-full border cursor-pointer
                transition duration-300
                ${
                  darkMode
                    ? "border-white/40 hover:bg-white hover:text-black"
                    : "border-white/40 hover:bg-white hover:text-black"
                }`}
              >
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* COMPANY */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold mb-1">Company</h3>

          <Link
            to="/Blog"
            className={`cursor-pointer text-base transition-all hover:translate-x-1
            ${darkMode ? "hover:text-white" : "hover:text-gray-300"}`}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className={`cursor-pointer text-base transition-all hover:translate-x-1
            ${darkMode ? "hover:text-white" : "hover:text-gray-300"}`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`cursor-pointer text-base transition-all hover:translate-x-1
            ${darkMode ? "hover:text-white" : "hover:text-gray-300"}`}
          >
            Contact Us
          </Link>
          <Link
            to="/Careers"
            className={`cursor-pointer text-base transition-all hover:translate-x-1
            ${darkMode ? "hover:text-white" : "hover:text-gray-300"}`}
          >
            Career
          </Link>
        </div>

        {/* SERVICES */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold mb-1">Services</h3>

          <Link
            to="/services/software-development"
            className={`cursor-pointer text-base transition-all hover:translate-x-1
            ${darkMode ? "hover:text-white" : "hover:text-gray-300"}`}
          >
            Software Development
          </Link>
          <Link
            to="/services/company-tax"
            className={`cursor-pointer text-base transition-all hover:translate-x-1
            ${darkMode ? "hover:text-white" : "hover:text-gray-300"}`}
          >
            Company Registration & Tax Filing
          </Link>
          <Link
            to="/services/investments"
            className={`cursor-pointer text-base transition-all hover:translate-x-1
            ${darkMode ? "hover:text-white" : "hover:text-gray-300"}`}
          >
            Investment Service
          </Link>
        </div>

        {/* ADDRESS */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-1">Address</h3>

          <div>
            <p className="font-semibold">Head Office</p>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-100"
              } text-base leading-relaxed`}
            >
              KDASTSHO Fintech Solutions Pvt Ltd <br />
              Opp SAIBABA Temple, Ramapuram, Nandyal District, AP 518122 <br />
              Mobile: 9113831872 <br />
              <a
                href="mailto:info@kdasthofintechsolutions.com"
                className="underline cursor-pointer hover:text-white"
              >
                info@kdasthofintechsolutions.com
              </a>
            </p>
          </div>

          <div>
            <p className="font-semibold">Branch Office</p>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-100"
              } text-base leading-relaxed`}
            >
              52, 5th Cross, Manjunadha Layout, Marathahalli, Bangalore 560037
              <br />
              <a
                href="mailto:info@kdasthofintechsolutions.com"
                className="underline cursor-pointer hover:text-white"
              >
                info@kdasthofintechsolutions.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div
        className={`text-center text-lg mt-6 font-medium
        ${darkMode ? "text-gray-400" : "text-gray-200"}`}
      >
        Kdastshofintechsolutionspvt.ltd 2025 &nbsp;|&nbsp;
        <Link to="/terms" className="cursor-pointer hover:text-white">
          Terms & Conditions
        </Link>
        &nbsp;|&nbsp;
        <Link to="/privacy" className="cursor-pointer hover:text-white">
          Privacy Policy
        </Link>
      </div>

      {/* SCROLL TOP */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 shadow-lg w-11 h-11 rounded-full flex justify-center items-center
        transition-all duration-300
        ${
          darkMode
            ? "bg-white/90 text-black hover:bg-white"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        <FaArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
