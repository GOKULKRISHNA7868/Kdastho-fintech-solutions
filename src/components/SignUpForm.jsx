import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Google native styled icon

const SignUpForm = () => {
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCard(true), 120);
  }, []);

  const [formData, setFormData] = useState({
    email1: "",
    email2: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center relative 
  bg-gradient-to-br from-[#8B4629] via-[#A0522D] to-[#4B2E19]
  dark:from-[#2b1407] dark:via-[#3d1c10] dark:to-[#160a05]
  px-4 pt-[90px] md:pt-[110px]"
    >
      {/* Sign In top right */}
      <button className="absolute top-6 right-6 text-white font-semibold border border-white/30 px-4 py-2 rounded-lg hover:bg-white/10 transition">
        Sign In
      </button>

      {/* Logo top left */}
      <img
        src="/images/logo.png"
        alt="logo"
        className="absolute top-6 left-6 w-14 h-14 rounded-full shadow-lg object-cover"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={showCard ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-full max-w-lg p-10 rounded-3xl 
        bg-[#c7b199]/60 dark:bg-[#7b604e]/50 
        backdrop-blur-xl shadow-2xl border border-white/10 dark:border-black/20"
      >
        {/* Header */}
        <h2 className="text-center text-[18px] md:text-[20px] font-medium text-[#2b1d16] dark:text-[#f5e8da] mb-10">
          Hey, Enter your details to get sign in to your account
        </h2>

        {/* Inputs */}
        <div className="space-y-6">
          {[
            { label: "Enter Mail/Phone No", name: "email1" },
            { label: "Enter Mail/Phone No", name: "email2" },
            { label: "Enter Password", name: "password", type: "password" },
            {
              label: "Re-Enter Password",
              name: "confirmPassword",
              type: "password",
            },
          ].map((input, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label className="text-sm text-[#2b1d16] dark:text-[#f5e8da]">
                {input.label}
              </label>
              <input
                type={input.type || "text"}
                name={input.name}
                value={formData[input.name]}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl 
                bg-white/30 dark:bg-black/20 outline-none 
                text-[#2b1d16] dark:text-white
                placeholder:text-gray-700/60 dark:placeholder:text-gray-300/50
                border border-transparent focus:border-orange-400 dark:focus:border-yellow-500
                transition-all shadow-sm focus:shadow-md"
                placeholder={input.label}
              />
            </div>
          ))}
        </div>

        {/* Sign Up Button */}
        <button
          className="w-full mt-8 py-3 rounded-xl font-semibold text-white
          bg-gradient-to-r from-[#d07a3e] via-[#e88d4f] to-[#c56c32]
          hover:scale-[1.03] hover:shadow-xl transition-all duration-300 active:scale-95"
        >
          Sign Up
        </button>

        {/* Separator */}
        <p className="text-center text-sm mt-5 text-[#2b1d16] dark:text-[#f5e8da]">
          or
        </p>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-6 mt-5">
          <div className="p-3 rounded-full bg-white hover:scale-110 transition shadow-md cursor-pointer">
            <FaFacebookF className="text-[#1773EA] text-xl" />
          </div>
          <div className="p-3 rounded-full bg-white hover:scale-110 transition shadow-md cursor-pointer">
            <FcGoogle className="text-2xl" />
          </div>
          <div className="p-3 rounded-full bg-white hover:scale-110 transition shadow-md cursor-pointer">
            <FaApple className="text-black text-2xl" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
