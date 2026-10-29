import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import globeImg from "../Assets/images/Globe.webp";
import googleImg from "../Assets/images/Google.webp";
import logo from "../Assets/images/logo2.svg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getCurrentUser } from "../Api/api/Auth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(username, password);

      // Confirm that the token can access a protected endpoint.
      await getCurrentUser();

      navigate("/");
    } catch (err) {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");

      const data = err.response?.data;

      setError(
        data?.detail ||
        data?.username?.[0] ||
        data?.non_field_errors?.[0] ||
        "Login failed. Please Create An Account First."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="min-h-screen flex items-center justify-center bg-white md:bg-gray-100 p-4">
        <div className="w-full max-w-7xl bg-white rounded-3xl md:shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* LEFT SIDE (Gradient) */}
          <div className="hidden md:flex w-full md:w-[55%] bg-linear-to-br from-[#064E4A] via-[#0F766E] to-[#0D9488] p-6 md:p-10 text-white relative  flex-col">


            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center gap-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-emerald-100/70 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 dark:bg-white/95">
                <img
                  src={logo}
                  alt="JobConnect"
                  className="h-full w-full object-contain p-1"
                />
              </div>

              {/* Brand Name */}
              <span className="whitespace-nowrap text-xl font-bold tracking-tight text-white sm:text-4xl">
                Job<span className="text-teal-500 transition-colors duration-300 group-hover:text-teal-400">
                  Connect
                </span>
              </span>
            </Link>


            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">

              {/* Globe Image - Bigger & Centered */}
              <div className="relative mb-6">
                {/* Soft glow */}
                <div className="absolute inset-0 bg-teal-300/20 blur-3xl rounded-full scale-110"></div>

                <img
                  src={globeImg}
                  alt="Globe"
                  className="relative z-10 w-56 h-56 md:w-88 md:h-88 object-contain"
                />
              </div>

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
                  <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mb-2">
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
          <div
            onSubmit={handleSubmit}
            className="w-full md:w-[45%] p-8 md:p-10 flex flex-col justify-center"
          >
            {/* Logo - only visible on mobile */}
            <div className="md:hidden flex items-center justify-center gap-2 mb-4">
              <Link to="/" >
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center text-sm font-bold">
                  JC
                </div>
              </Link>
              <span className="text-lg font-semibold text-gray-800">
                Job<span className="text-teal-600">Connect</span>
              </span>
            </div>
            <h2 className="text-2xl text-teal-800 md:text-3xl font-bold  mb-7 text-center">
              Welcome to JobConnect
            </h2>

            {/* Mobile Sign In / Sign Up Tabs - hidden on desktop */}
            <div className="flex md:hidden bg-gray-100 rounded-full p-1 mb-6">
              <button className="flex-1 py-2.5 text-sm font-semibold text-gray-800 bg-white rounded-full shadow-sm">
                <Link to="/login">Sign In</Link>
              </button>
              <button className="flex-1 py-2.5 text-sm font-semibold text-gray-400 rounded-full">
                <Link to="/register">Sign Up</Link>
              </button>
            </div>

            <form className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                  User Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-lg"><IoPersonCircleOutline /></span>
                  </div>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="UserName Here"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>


              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff className="cursor-pointer" size={18} /> : <FiEye className="cursor-pointer" size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              {/* Continue Button */}
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                {loading ? "Signing in..." : "Continue"}
              </button>

              {/* Already have account */}
              <p className="hidden md:inline-block text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-teal-600 font-medium hover:underline">
                  Sign Up
                </Link>
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
                Continue with Google
              </button>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By signing in, you agree to our {" "}
                <Link to="/privacy-policy" className="text-teal-600 hover:underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link to="/terms-of-service" className="text-teal-600 hover:underline">
                  Terms of Service
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

