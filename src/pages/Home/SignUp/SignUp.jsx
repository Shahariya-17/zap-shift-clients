import React from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router";

const SignUp = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-100 via-white to-lime-100 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white/30 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* Left - Form */}
        <div className="p-10 lg:p-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Create Account 🎉</h2>
          <p className="text-gray-600 mb-10">Join us today, it's quick and easy!</p>

          <form className="space-y-6">
            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-3 bg-white/60 text-gray-700 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-3 bg-white/60 text-gray-700 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400" />
              <input
                type="password"
                placeholder="Create Password"
                className="w-full pl-12 pr-4 py-3 bg-white/60 text-gray-700 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center text-gray-700 text-sm">
            Already have an account?{" "}
            <Link to='/signIn' className="text-teal-600 hover:underline cursor-pointer font-medium">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right - Image / Branding with new color and style */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-tr from-purple-800 via-indigo-700 to-blue-700">
          <div className="text-white text-center p-12 max-w-sm font-sans drop-shadow-lg">
            <h3 className="text-4xl font-extrabold mb-6 tracking-wide">ProFast</h3>
            <p className="text-lg leading-relaxed mb-8 font-light italic">
              Delivering trust at your door, every time.
            </p>
            <img
              src="https://cdn.dribbble.com/userupload/5119813/file/original-e7d5eb4ef84886644a1527d559310c3b.png?resize=768x576"
              alt="Illustration"
              className="mx-auto rounded-2xl shadow-2xl border-4 border-white/30"
              style={{ maxWidth: "280px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
