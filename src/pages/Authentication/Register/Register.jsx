import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <motion.div
      className="bg-white/80 p-8 rounded-2xl shadow-xl w-full max-w-md"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center space-x-3">
        <span>Create an Account!</span>
        <FaUser className="text-lime-400 text-4xl" />
      </h2>
      <p className="mb-6 text-gray-600 text-center font-semibold">Register with ProFast</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Input */}
        <div className="relative">
          <label className="label font-semibold text-gray-700">Name</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full pl-10 bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-lime-400"
              placeholder="Enter your Name"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">Name is required</p>
          )}
        </div>

        {/* Email Input */}
        <div className="relative">
          <label className="label font-semibold text-gray-700">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full pl-10 bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-lime-400"
              placeholder="Enter your Email"
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
              placeholder="Enter Password"
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

        <button
          type="submit"
          className="btn bg-lime-400 hover:bg-lime-500 text-black w-full flex items-center justify-center space-x-2"
        >
          <FaUser /> <span>Register</span>
        </button>
      </form>

      <p className="text-sm mt-4 text-gray-700 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-lime-500 hover:underline font-semibold">
          Login
        </Link>
      </p>

      <div className="divider">OR</div>
      <SocialLogin />
    </motion.div>
  );
};

export default Register;
