import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LoginCard = () => {
  const [animateCard, setAnimateCard] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateCard(true), 150);
  }, []);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center 
      pt-28 md:pt-32  /* 👈 pushes content below navbar */
      bg-gradient-to-br from-[#8B4629] via-[#A0522D] to-[#4B2E19] 
      dark:from-[#2b1407] dark:via-[#3d1c10] dark:to-[#160a05] 
      font-sans px-4"
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={animateCard ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 rounded-2xl 
        bg-[#c7b199]/60 dark:bg-[#7b604e]/50 
        backdrop-blur-xl shadow-xl 
        border border-white/10 dark:border-black/20"
      >
        {/* Logo */}
        <div className="w-full flex justify-center mb-6">
          <img
            src="/images/logok.png"
            alt="logo"
            className="w-16 h-16 rounded-full shadow-lg object-cover"
          />
        </div>

        {/* Header text */}
        <h2
          className="text-center text-[18px] md:text-[20px] 
        font-medium text-[#2b1d16] dark:text-[#f5e8da] mb-8"
        >
          Hey, Enter your details to get sign in to your account
        </h2>

        {/* Inputs */}
        <div className="space-y-5">
          {/* Email / Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#2b1d16] dark:text-[#f5e8da]">
              Enter Mail/Phone No
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl 
              bg-white/30 dark:bg-black/20 
              outline-none text-[#2b1d16] dark:text-white
              placeholder:text-gray-700/60 dark:placeholder:text-gray-300/50
              focus:ring-2 focus:ring-orange-400 dark:focus:ring-yellow-500 
              transition-all duration-300"
              placeholder="example@gmail.com"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#2b1d16] dark:text-[#f5e8da]">
              Enter Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl 
              bg-white/30 dark:bg-black/20 
              outline-none text-[#2b1d16] dark:text-white
              placeholder:text-gray-700/60 dark:placeholder:text-gray-300/50
              focus:ring-2 focus:ring-orange-400 dark:focus:ring-yellow-500 
              transition-all duration-300"
              placeholder="••••••••"
            />
            <a
              href="#"
              className="text-right text-sm mt-1 text-[#5c3928] 
              hover:underline dark:text-[#ffdfb1]"
            >
              forgot password?
            </a>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          className="w-full mt-8 py-3 rounded-xl font-semibold text-white 
          bg-gradient-to-r from-[#d07a3e] via-[#e88d4f] to-[#c56c32] 
          hover:scale-105 hover:shadow-xl 
          transition-all duration-300 active:scale-95"
        >
          Sign in
        </button>

        {/* Sign Up */}
        <p className="text-center text-sm mt-6 text-[#2b1d16] dark:text-[#f5e8da]">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[#5c3928] dark:text-[#ffd59a] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginCard;
