import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaUserCircle } from "react-icons/fa";

// Animation variants
const containerVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <motion.div
      className="bg-white/80 p-8 rounded-2xl shadow-xl w-full max-w-md"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center space-x-3"
        variants={itemVariant}
      >
        <span>Welcome Back!</span>
        <FaUserCircle className="text-lime-400 text-4xl" />
      </motion.h2>

      <motion.p
        className="mb-6 text-gray-600 text-center font-semibold"
        variants={itemVariant}
      >
        Login with ProFast
      </motion.p>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        variants={itemVariant}
      >
        {/* Email Input */}
        <motion.div className="relative" variants={itemVariant}>
          <label className="label font-semibold text-gray-700">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full pl-10 bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-lime-400"
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}
        </motion.div>

        {/* Password Input */}
        <motion.div className="relative" variants={itemVariant}>
          <label className="label font-semibold text-gray-700">Password</label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered w-full pl-10 bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-lime-400"
              placeholder="Enter your password"
            />
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm mt-1">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm mt-1">
              Password must be 6 characters or longer
            </p>
          )}
        </motion.div>

        <motion.div
          className="text-right"
          variants={itemVariant}
        >
          <a className="text-sm text-lime-600 hover:underline cursor-pointer">
            Forgot password?
          </a>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="btn bg-lime-400 hover:bg-lime-500 text-black w-full flex items-center justify-center space-x-2"
        >
          <FaUserCircle /> <span>Login</span>
        </motion.button>
      </motion.form>

      <motion.p
        className="text-sm mt-4 text-gray-700 text-center"
        variants={itemVariant}
      >
        Don’t have any account?{" "}
        <Link to="/register" className="text-lime-500 hover:underline font-semibold">
          Register
        </Link>
      </motion.p>

      {/* Social login animation wrapper */}
      <motion.div
        variants={itemVariant}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <SocialLogin />
      </motion.div>
    </motion.div>
  );
};

export default Login;
