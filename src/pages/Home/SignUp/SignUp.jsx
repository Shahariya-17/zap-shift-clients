import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import illus from '../../../assets/illus.avif'

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-50 via-white to-lime-50 flex items-center justify-center px-4 py-8 overflow-hidden">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-6xl w-full bg-white/50 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden transition-all duration-300 hover:shadow-3xl"
      >
        {/* Left - Form */}
        <div className="p-8 lg:p-14">
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-5xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-teal-500 to-lime-500 bg-clip-text text-transparent">
              Create Account
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-lg"
            >
              Join our community today
            </motion.p>
          </motion.div>

          <motion.form variants={itemVariants} className="space-y-7">
            {/* Name */}
            <motion.div 
              variants={itemVariants}
              className="relative group"
              whileHover={{ scale: 1.02 }}
            >
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 group-focus-within:text-teal-600 transition-colors" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 bg-white/70 text-gray-800 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                required
              />
            </motion.div>

            {/* Email */}
            <motion.div 
              variants={itemVariants}
              className="relative group"
              whileHover={{ scale: 1.02 }}
            >
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 group-focus-within:text-teal-600 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-4 bg-white/70 text-gray-800 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div 
              variants={itemVariants}
              className="relative group"
              whileHover={{ scale: 1.02 }}
            >
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 group-focus-within:text-teal-600 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create Password"
                className="w-full pl-12 pr-4 py-4 bg-white/70 text-gray-800 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                required
              />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="pt-3"
              whileHover={{ scale: 1.01 }}
            >
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-lime-500 hover:from-teal-600 hover:to-lime-600 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Sign Up
                <motion.span
                  animate={{
                    x: isHovered ? 5 : 0
                  }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <FaArrowRight />
                </motion.span>
              </button>
            </motion.div>
          </motion.form>

          <motion.div 
            variants={itemVariants}
            className="mt-10 text-center"
          >
            <motion.div 
              className="relative mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </motion.div>

            <motion.div 
              className="flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {['google', 'facebook', 'twitter'].map((provider, index) => (
                <motion.button
                  key={provider}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  style={{ transitionDelay: `${0.8 + index * 0.1}s` }}
                >
                  <img 
                    src={`https://cdn-icons-png.flaticon.com/512/${provider === 'google' ? '2991/2991148' : provider === 'facebook' ? '733/733547' : '2111/2111463'}.png`} 
                    alt={provider} 
                    className="h-5 w-5" 
                  />
                </motion.button>
              ))}
            </motion.div>

            <motion.p 
              className="mt-8 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Already have an account?{" "}
              <Link
                to="/signIn"
                className="text-teal-600 hover:text-teal-700 font-medium transition-colors inline-flex items-center gap-1"
              >
                Sign In
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              </Link>
            </motion.p>
          </motion.div>
        </div>

        {/* Right - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')] opacity-10"></div>
          <motion.div 
            className="relative text-center p-12 max-w-sm z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <motion.h3 
              className="text-5xl font-extrabold mb-6 tracking-tight text-white"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.3)", "0 0 0px rgba(255,255,255,0)"]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 3
              }}
            >
              ProFast
            </motion.h3>
            <motion.p 
              className="text-xl leading-relaxed mb-8 font-light text-white/90 italic"
              animate={{
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 4
              }}
            >
              "Delivering trust at your door, every time."
            </motion.p>
            
            <motion.div 
              className="relative w-64 h-64 mx-auto mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring" }}
            >
              <motion.div 
                className="absolute inset-0 bg-teal-400/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3
                }}
              />
              <motion.img
                src={illus}
                alt="Illustration"
                className="relative z-10 rounded-2xl shadow-2xl border-4 border-white/20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              />
            </motion.div>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 text-white/80 text-sm">
                <motion.span 
                  className="h-px w-8 bg-white/50"
                  animate={{ width: ["0px", "32px", "0px"] }}
                  transition={{ delay: 0.8, duration: 1.5, repeat: Infinity }}
                />
                Trusted by thousands worldwide
                <motion.span 
                  className="h-px w-8 bg-white/50"
                  animate={{ width: ["0px", "32px", "0px"] }}
                  transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;