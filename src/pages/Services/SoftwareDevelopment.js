// src/pages/ComplexSolutionsPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
/**
 * ComplexSolutionsPage
 *
 * - Fully responsive
 * - Dark/Light mode support (Tailwind CSS)
 * - Pixel-perfect layout based on image_97bc20.jpg
 * - Uses brand colors:
 *      Primary/Teal: #1E4E45 (text-green-800 / dark:text-teal-400)
 *      Button/Dark Brown: #4F372C (bg-stone-800)
 *      Subtle Background: bg-stone-100 / dark:bg-stone-700
 *
 * - Animations powered by framer-motion
 * - Uses local images from public/images folder
 */

const ComplexSolutionsPage = () => {
  // ----------------------
  // Animation Variants
  // ----------------------
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };
  const slideLeft = {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };
  const slideUp = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };
  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  // ----------------------
  // Brand Color Classes
  // ----------------------
  const primaryHeadingClass =
    "text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-800 dark:text-teal-400 leading-tight";
  const darkButtonClass =
    "bg-stone-800 hover:bg-stone-700 text-white px-6 py-3 rounded-md font-semibold shadow-md";
  const subtleSectionBg = "bg-stone-100 dark:bg-stone-700";

  return (
    <div className="bg-[#F7F1EC] dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <main className="w-full">
        {/* =======================
          HERO BANNER
      ======================= */}
        <section className="w-full py-24 px-6 md:px-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {/* Left Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className={primaryHeadingClass}>
                End-to-End Software Solutions to Power Your Growth
              </h1>
              <p className="text-lg md:text-xl text-stone-700 dark:text-gray-300">
                Developing dependable, scalable, and feature-rich applications
                that have an impact. From idea to delivery — UI/UX, development,
                testing, deployment and continual support.
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
                }}
                className="bg-[#8D5A3A] hover:bg-[#7a4b2f] text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300"
              >
                <Link to="/softgetstart">View Solutions</Link>
              </motion.button>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative">
              <img
                src="/images/monitoring.png"
                alt="Team collaboration"
                className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 -translate-y-8 lg:translate-y-0"
              />
            </div>
          </motion.div>
        </section>

        {/* =======================
          APP DEVELOPMENT SECTION
      ======================= */}
        <section className="relative py-20">
          <div
            className="absolute inset-0 bg-blue-500 dark:bg-blue-800 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/BGD.jpeg')" }}
          ></div>
          <div className="absolute inset-0 bg-white/40 dark:bg-black/50 backdrop-blur-sm"></div>

          <motion.div
            className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideLeft}
          >
            {/* Left Image & Salary Badge */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start gap-4">
              <img
                src="/images/monitoring.png"
                alt="Phone mockup"
                className="w-48 h-56 object-cover rounded-lg shadow-lg border-2 border-white"
              />
              <div className="inline-flex items-baseline gap-2 bg-black/70 dark:bg-white/20 px-4 py-2 rounded-full text-white dark:text-black font-semibold">
                <span>App Salary</span>
                <span className="ml-2 text-lg md:text-xl font-bold">
                  50k — 5 Lakhs
                </span>
              </div>
            </div>

            {/* Right Text */}
            <div className="md:col-span-8 space-y-8 text-white dark:text-white">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Android App Development
                </h3>
                <p className="mt-2 text-sm md:text-base">
                  High-performance Android apps with secure architecture,
                  offline features, backend integration, and Play Store
                  deployment.
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  iOS App Development
                </h3>
                <p className="mt-2 text-sm md:text-base">
                  Premium iOS apps following Apple guidelines, delivering pure
                  performance, stunning UI, and long-term scalability.
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Hybrid / Flutter App Development
                </h3>
                <p className="mt-2 text-sm md:text-base">
                  Cross-platform apps using Flutter for native-like performance
                  on Android & iOS with a single codebase, reducing development
                  time.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* =======================
          WHY CHOOSE SECTION
      ======================= */}
        {/* WHY TO CHOOSE */}
        <motion.section
          className={`mt-12 py-10 rounded-2xl ${subtleSectionBg}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.h2
              variants={slideUp}
              className="text-2xl md:text-3xl font-bold text-green-800 dark:text-teal-400"
            >
              Why to choose ?
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  num: "01",
                  title: "Security Features",
                  desc: "Included in all apps: encryption at rest & transit, OWASP best practices, role-based access control, secure auth flows.",
                },
                {
                  num: "02",
                  title: "Maintenance & Support",
                  desc: "Ongoing maintenance, SLA-driven support, regular updates and monitoring to keep your product healthy and reliable.",
                },
                {
                  num: "03",
                  title: "Domain, Hosting & Server Features",
                  desc: "Managed hosting, automated backups, CDN, SSL/TLS and optimized deployments for performance and uptime.",
                },
              ].map((card, i) => (
                <motion.article
                  key={i}
                  variants={fadeIn}
                  custom={i * 0.2}
                  className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-700 font-bold text-stone-800 dark:text-stone-100">
                        {card.num}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-stone-800 dark:text-stone-100">
                        {card.title}
                      </h4>
                      <p className="mt-2 text-sm text-stone-600 dark:text-gray-300">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>
        {/* =======================
          FEATURE LIST SECTION
      ======================= */}
        <section className="py-20">
          <motion.div
            className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Left Circular Graphic */}
            <motion.div
              className="lg:col-span-5 flex justify-center lg:justify-start"
              variants={fadeIn}
            >
              <div className="w-96 h-96 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-2xl border-4 border-stone-100 dark:border-stone-700 overflow-hidden">
                <img
                  src="/images/security.jpg"
                  alt="shield graphic"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right Features List */}
            <motion.div
              className="lg:col-span-7 space-y-6"
              variants={staggerContainer}
            >
              <motion.h3
                className="text-3xl font-bold text-green-800 dark:text-teal-300"
                variants={slideUp}
              >
                Security Features
              </motion.h3>
              <ul className="list-disc ml-6 space-y-2 text-stone-700 dark:text-gray-200">
                <li>
                  Data encryption at rest and in transit (AES-256 / TLS 1.2+)
                </li>
                <li>OWASP top 10 mitigations and secure coding standards</li>
                <li>
                  Role-based access control (RBAC) and granular permissions
                </li>
                <li>
                  Secure authentication: OAuth2, JWT, multi-factor
                  authentication (optional)
                </li>
                <li>
                  Input validation and output encoding to prevent injection
                  attacks
                </li>
              </ul>

              <motion.h4
                className="text-2xl font-semibold text-green-800 dark:text-teal-300 mt-6"
                variants={slideUp}
              >
                Monthly Security Patch Updates
              </motion.h4>
              <ul className="list-disc ml-6 space-y-2 text-stone-700 dark:text-gray-200">
                <li>Scheduled dependency and platform updates</li>
                <li>Regular vulnerability scanning and remediation</li>
                <li>Patch notes and versioning for traceability</li>
              </ul>

              <motion.h4
                className="text-2xl font-semibold text-green-800 dark:text-teal-300 mt-6"
                variants={slideUp}
              >
                Domain Services & Hosting
              </motion.h4>
              <ul className="list-disc ml-6 space-y-2 text-stone-700 dark:text-gray-200">
                <li>Managed domain registration and renewal</li>
                <li>
                  CDN integration for global fast delivery (Cloudflare / AWS
                  CloudFront)
                </li>
                <li>Automated daily backups and restore processes</li>
                <li>SSL/TLS certificate management and renewal</li>
                <li>
                  Auto-scaling servers and containerized deployments (Docker /
                  Kubernetes)
                </li>
              </ul>

              <motion.div className="mt-6" variants={fadeIn}></motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default ComplexSolutionsPage;
