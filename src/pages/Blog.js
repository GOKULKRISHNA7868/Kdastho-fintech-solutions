// src/pages/Blog.js
import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import useTheme from "../hooks/useTheme";

// Separate BlogCard component
const BlogCard = ({ post, darkMode, delay }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX - rect.width / 2);
    y.set(mouseY - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cardBg = darkMode ? "bg-gray-800" : "bg-[#F7F1EC]";
  const cardText = darkMode ? "text-gray-100" : "text-gray-900";

  return (
    <motion.div
      className={`rounded-lg overflow-hidden shadow-lg ${cardBg} flex flex-col cursor-pointer`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Blog Image */}
      <motion.img
        src={post.img}
        alt={post.title}
        className="w-full h-64 object-cover"
        whileHover={{ scale: 1.05, rotate: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Blog Content */}
      <div className={`p-6 ${cardText} flex flex-col justify-between h-full`}>
        <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
        <p className="text-sm md:text-base mb-4">{post.description}</p>
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
          }}
          className={`self-start px-4 py-2 rounded ${
            darkMode ? "bg-green-600 text-white" : "bg-stone-800 text-white"
          } transition-all duration-300`}
        >
          Read More
        </motion.button>
      </div>
    </motion.div>
  );
};

const BlogPage = () => {
  const [darkMode] = useTheme();

  const sectionBg =
    "bg-[#F7F1EC] dark:bg-gray-900 text-gray-900 dark:text-gray-100";
  const headingColor = darkMode ? "text-green-400" : "text-green-800";

  const blogPosts = [
    {
      title: "Digital Transformation for SMEs",
      description:
        "KDASTSHO Fintech Solutions helps SMEs and MSMEs leverage technology for efficient operations, secure financial transactions, and robust digital solutions tailored to their business needs.",
      img: "https://source.unsplash.com/600x400/?technology,office",
    },
    {
      title: "Future of Financial Automation",
      description:
        "We develop automated financial tools and services to help businesses and individuals manage money confidently, reduce errors, and optimize investment strategies with AI-driven insights.",
      img: "https://source.unsplash.com/600x400/?finance,ai",
    },
    {
      title: "Innovative Tax Consultancy Solutions",
      description:
        "Our expert tax consultancy services simplify compliance, optimize taxation strategies, and provide transparent guidance for sustainable financial growth.",
      img: "https://source.unsplash.com/600x400/?tax,business",
    },
    {
      title: "Empowering Businesses Through Technology",
      description:
        "Our goal is to provide accessible digital tools that solve real-world business challenges, enabling sustainable growth, streamlined operations, and enhanced customer experience.",
      img: "https://source.unsplash.com/600x400/?digital,tools",
    },
    {
      title: "Smart Investments for Future",
      description:
        "We guide clients to make data-driven investment decisions, utilizing modern tools for portfolio management, risk assessment, and wealth creation.",
      img: "https://source.unsplash.com/600x400/?investment,stocks",
    },
    {
      title: "UI/UX Design Excellence",
      description:
        "Creating visually stunning and intuitive interfaces for web and mobile applications, ensuring delightful user experiences.",
      img: "https://source.unsplash.com/600x400/?ui,ux,design",
    },
  ];

  return (
    <section
      className={`pt-32 md:pt-36 pb-16 transition-colors duration-500 relative overflow-hidden ${sectionBg} font-sans`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Page Heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h1 className={`text-4xl md:text-5xl font-bold ${headingColor}`}>
            Our Blog
          </h1>
          <div
            className={`w-24 h-1 mx-auto mt-2 rounded-full ${headingColor}`}
          ></div>
        </motion.div>

        {/* Intro Section */}
        <motion.div
          className="mb-16 text-center max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg md:text-xl leading-relaxed">
            <span className="font-semibold text-green-500">
              KDASTSHO Fintech Solutions Private Limited
            </span>{" "}
            is a progressive technology firm providing innovative digital
            solutions for SMEs, MSMEs, and individuals.
          </p>
          <p className="text-lg md:text-xl leading-relaxed">
            We create AI-driven digital tools that solve real business
            challenges, streamline operations, optimize financial processes, and
            enable sustainable growth for companies of all sizes.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              post={post}
              darkMode={darkMode}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
