// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const [darkMode, setDarkMode] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const location = useLocation();
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Scroll to top when route changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navItems = [
    { name: "About", to: "/About" },
    { name: "Careers", to: "/Careers" },
    { name: "Blog", to: "/Blog" },
    {
      name: "Services",
      dropdown: [
        { name: "Software Development", to: "/services/software-development" },
        {
          name: "Company Registration & Tax Filing",
          to: "/services/company-tax",
        },
        { name: "Investments", to: "/services/investments" },
      ],
    },
    { name: "Contact Us", to: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.img
          src="/logok.png"
          alt="logo"
          className="w-16 h-16 rounded-full object-cover cursor-pointer"
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 bg-[#ceb197] px-16 py-5 rounded-full shadow-xl items-center">
          {navItems.map((item, idx) =>
            item.dropdown ? (
              <div key={idx} className="relative">
                <button
                  onMouseEnter={() => setServiceOpen(true)}
                  onMouseLeave={() => setServiceOpen(false)}
                  className="cursor-pointer text-lg font-semibold text-black"
                >
                  Services
                </button>

                <AnimatePresence>
                  {serviceOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bg-white dark:bg-black shadow-xl rounded-xl py-3 mt-2 w-60"
                      onMouseEnter={() => setServiceOpen(true)}
                      onMouseLeave={() => setServiceOpen(false)}
                    >
                      {item.dropdown.map((subItem, i) => (
                        <Link
                          key={i}
                          to={subItem.to}
                          className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 text-black dark:text-white rounded-md"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={idx}
                to={item.to}
                className="cursor-pointer text-lg font-semibold text-black"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Icons + Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <FaUserCircle
              size={40}
              className="text-gray-600 dark:text-gray-300 cursor-pointer hover:scale-110 transition-all duration-200"
            />
          </Link>

          <div
            className="cursor-pointer text-xl text-black dark:text-white"
            onClick={toggleDarkMode}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl text-black dark:text-white font-bold"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="md:hidden bg-[#ceb197] px-6 py-5 mt-3 mx-5 rounded-3xl shadow-xl"
          >
            {navItems.map((item, i) =>
              item.dropdown ? (
                <div key={i}>
                  <button
                    onClick={() => setServiceOpen(!serviceOpen)}
                    className="block py-3 text-lg font-semibold text-black w-full text-left"
                  >
                    Services ▾
                  </button>

                  <AnimatePresence>
                    {serviceOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="ml-5 mb-2"
                      >
                        {item.dropdown.map((sub, j) => (
                          <Link
                            key={j}
                            to={sub.to}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2 text-md text-black"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={i}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-lg font-semibold text-black"
                >
                  {item.name}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
