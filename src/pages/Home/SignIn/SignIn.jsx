import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router";

const SignIn = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-100 via-white to-lime-100 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white/30 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* Left - Form */}
        <div className="p-10 lg:p-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back 👋</h2>
          <p className="text-gray-600 mb-10">Login to continue your journey</p>

          <form className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-3 bg-white/60 text-gray-700 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-white/60 text-gray-700 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                required
              />
            </div>

            <div className="text-right text-sm text-teal-600 hover:underline cursor-pointer">
              Forgot password?
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-gray-700 text-sm">
            Don’t have an account?{" "}
            <Link to='/signUp'  className="text-teal-600 hover:underline cursor-pointer font-medium">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right - Image / Branding */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-tr from-teal-500 to-lime-400">
          <div className="text-white text-center p-8">
            <h3 className="text-3xl font-bold mb-4">ProFast</h3>
            <p className="text-lg">Fastest Delivery System in Your City</p>
            <img
              src="https://cdn.dribbble.com/users/2046015/screenshots/16572697/media/539d1672d58e226f5e9c2fc18b1f0e19.png?resize=768x576&vertical=center"
              alt="Illustration"
              className="mt-6 w-3/4 mx-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
