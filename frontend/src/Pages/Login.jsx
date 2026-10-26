import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import globeImg from "../Assets/images/Globe.webp";
import googleImg from"../Assets/images/Google.webp";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* LEFT SIDE (Gradient) */}
          <div className="w-full md:w-[55%] bg-linear-to-br from-blue-500 via-blue-400 to-cyan-300 p-6 md:p-10 text-white relative flex flex-col">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                JC
              </div>
              <div className="text-lg font-semibold">JobConnect</div>
            </a>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">

              {/* Globe Image - Bigger & Centered */}
              <img
                src={globeImg}
                alt="Globe"
                className="w-56 h-56 md:w-72 md:h-72 object-contain mb-6"
              />

              <div className="inline-block bg-white/20 backdrop-blur-sm text-xs px-3 py-1 rounded-full mb-4">
                Login To Continue
              </div>

              <h1 className="text-xl md:text-2xl font-bold leading-tight mb-3">
                Welcome back to your opportunity.
              </h1>

              <p className="text-white/80 text-sm mb-8 max-w-sm">
                Sign in to continue exploring thousands of curated jobs, track your application and grow your career .
              </p>

              {/* Steps - slightly smaller */}
              <div className="grid grid-cols-3 gap-2.5 w-full max-w-md">
                {/* Step 1 - Active */}
                <div className="bg-white text-gray-800 rounded-xl p-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mb-2">
                    1
                  </div>
                  <p className="text-xs font-medium leading-snug">
                    Login to Your Profile
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <div className="w-6 h-6 bg-white/30 text-white rounded-full flex items-center justify-center text-xs font-semibold mb-2">
                    2
                  </div>
                  <p className="text-xs font-semibold leading-snug text-white/90">
                    Search & Apply
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <div className="w-6 h-6 bg-white/30 text-white rounded-full flex items-center justify-center text-xs font-semibold mb-2">
                    3
                  </div>
                  <p className="text-xs font-semibold leading-snug text-white/90">
                    Track Your applications
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (Form) */}
          <div className="w-full md:w-[45%] p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-7 text-center">
              Join Us
            </h2>

            <form className="space-y-5">

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  User Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-lg"><IoPersonCircleOutline /></span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Your User Name Here"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff className="cursor-pointer" size={18} /> : <FiEye className="cursor-pointer" size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">
                  At least 12 characters, no more than 20 characters.
                  <br />
                  Uppercase letters, lowercase letters, numbers, and symbols.
                </p>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                Continue
              </button>

              {/* Already have account */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/register" className="text-blue-600 font-medium hover:underline">
                  Sign Up
                </a>
              </p>

              {/* Divider */}
              <div className="flex items-center gap-4 my-2">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-400">Or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Google Button */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-gray-200 cursor-pointer hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors"
              >
                <img
                  src={googleImg}
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By signing up I confirm that I carefully have read and agree to the JobConnect{" "}
                <a href="/privacy-policy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/terms-of-service" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login