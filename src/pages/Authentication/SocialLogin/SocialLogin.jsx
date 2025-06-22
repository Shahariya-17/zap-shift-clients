import React from "react";
import useAuth from "../../../hooks/useAuth";

const SocialLogin = () => {

    const {signInWithGoogle} = useAuth();

    const handleGoogleSignIn = () =>{
        signInWithGoogle()
        .then(result =>{
            console.log(result.user);
        })
        .catch(error =>{
            console.log(error);
        })
    }
  return (
    <div className="w-full text-center mt-6 px-4">
      {/* OR Divider */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <hr className="flex-1 border-gray-300" />
        <span className="text-gray-500 text-sm font-medium">OR</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Google Login Button */}
      <button onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-medium"
      >
        <svg
          aria-label="Google logo"
          width="20"
          height="20"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="#fff" d="M0 0h512v512H0z" />
            <path
              fill="#EA4335"
              d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            />
            <path
              fill="#34A853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            />
            <path
              fill="#FBBC05"
              d="M90 341a208 200 0 010-171l63 49q-12 37 0 73"
            />
            <path
              fill="#4285F4"
              d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            />
          </g>
        </svg>
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
