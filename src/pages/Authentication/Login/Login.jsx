import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaUserCircle } from "react-icons/fa";

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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center space-x-3">
        <span>Welcome Back!</span>
        <FaUserCircle className="text-lime-400 text-4xl" />
      </h2>
      <p className="mb-6 text-gray-600 text-center font-semibold">Login with ProFast</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input */}
        <div className="relative">
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
        </div>

        {/* Password Input */}
        <div className="relative">
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
        </div>

        <div className="text-right">
          <a className="text-sm text-lime-600 hover:underline cursor-pointer">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="btn bg-lime-400 hover:bg-lime-500 text-black w-full flex items-center justify-center space-x-2"
        >
          <FaUserCircle /> <span>Login</span>
        </button>
      </form>

      <p className="text-sm mt-4 text-gray-700 text-center">
        Don’t have any account?{" "}
        <Link to="/register" className="text-lime-500 hover:underline font-semibold">
          Register
        </Link>
      </p>

      <div className="divider">OR</div>
      <SocialLogin />
    </motion.div>
  );
};

export default Login;
