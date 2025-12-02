import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import SoftwareDevelopment from "./pages/Services/SoftwareDevelopment";
import CompanyTax from "./pages/Services/CompanyTax";
import Investments from "./pages/Services/Investments";
import RegistrationForm from "./components/RegistrationForm";
import LoginCard from "./components/LoginCard";
import SignUpForm from "./components/SignUpForm";
import Applyform from "./components/Applyform";
function App() {
  // global dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? true : false;
  });

  // apply theme to html root
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/Blog" element={<Blog darkMode={darkMode} />} />
        <Route path="/about" element={<About darkMode={darkMode} />} />
        <Route path="/Careers" element={<Careers darkMode={darkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/Applyform" element={<Applyform />} />
        <Route
          path="/services/software-development"
          element={<SoftwareDevelopment />}
        />
        <Route path="/services/company-tax" element={<CompanyTax />} />
        <Route path="/services/investments" element={<Investments />} />

        <Route path="/login" element={<LoginCard />} />
      </Routes>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
