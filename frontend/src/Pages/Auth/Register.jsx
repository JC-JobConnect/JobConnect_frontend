import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/Auth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import globeImg from "../../Assets/images/Globe.webp";
import googleImg from "../../Assets/images/Google.webp";
import logo from "../../Assets/images/logo2.svg";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser(formData);

      navigate("/login", {
        state: { message: "Registration successful! Please log in." },
      });
    } catch (err) {
      const data = err.response?.data;

      if (data && typeof data === "object") {
        const messages = Object.values(data).flat();
        setError(messages.join(" "));
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <div className="min-h-screen flex items-center justify-center bg-white md:bg-gray-100 p-4 ">
        <div className="w-full max-w-7xl bg-white md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* LEFT SIDE (Gradient) */}
          <div className="w-full hidden md:w-[55%] bg-linear-to-br from-[#064E4A] via-[#0F766E] to-[#0D9488] p-6 md:p-10 text-white relative md:flex flex-col">

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

              {/* Globe Image */}
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
                Join Us Today
              </div>

              <h1 className="text-xl md:text-2xl font-bold leading-tight mb-3">
                Start your career journey.
              </h1>

              <p className="text-white/80 text-sm mb-8 max-w-sm">
                Create a free account and unlock thousands of jobs. Follow these simple steps to set up your Journey.
              </p>

              {/* Steps - slightly smaller */}
              <div className="grid grid-cols-3 gap-2.5 w-full max-w-md">
                {/* Step 1 - Active */}
                <div className="bg-white text-gray-800 rounded-xl p-3">
                  <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mb-2">
                    1
                  </div>
                  <p className="text-xs font-medium leading-snug">
                    Register your account
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <div className="w-6 h-6 bg-white/30 text-white rounded-full flex items-center justify-center text-xs font-semibold mb-2">
                    2
                  </div>
                  <p className="text-xs font-medium leading-snug text-white/90">
                    Set up your profile information
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <div className="w-6 h-6 bg-white/30 text-white rounded-full flex items-center justify-center text-xs font-semibold mb-2">
                    3
                  </div>
                  <p className="text-xs font-medium leading-snug text-white/90">
                    Search & Apply, Get Hired!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (Form) */}
          <div className="w-full md:w-[45%] p-6 md:p-10 flex flex-col justify-center">
            {/* Logo - only visible on mobile */}
            <div className="md:hidden flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center text-sm font-bold">
                JC
              </div>
              <span className="text-lg font-semibold text-gray-800">
                Job<span className="text-teal-600">Connect</span>
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-teal-800 mb-7 text-center">
              Create Your Free Account
            </h2>
            {/* Mobile Sign In / Sign Up Tabs - hidden on desktop */}
            <div className="flex md:hidden bg-gray-100 rounded-full p-1 mb-6">
              <button className="flex-1 py-2.5 text-sm font-semibold text-gray-400 rounded-full">
                <Link to="/login">Sign In</Link>
              </button>
              <button className="flex-1 py-2.5 text-sm font-semibold text-gray-800 bg-white rounded-full shadow-sm ">
                <Link to="/register">Sign Up</Link>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/*Username */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="Choose a username"
                    required
                    autoComplete="username"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-lg">
                    ✓
                  </span>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-lg"><MdOutlineMarkEmailRead /></span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="your.email@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff className='cursor-pointer' size={18} /> : <FiEye className='cursor-pointer' size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff className='cursor-pointer' size={18} /> : <FiEye className='cursor-pointer' size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              {success && (
                <p role="status" className="text-sm text-green-600">
                  {success}
                </p>
              )}

              {/* Continue Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-700 hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

              {/* Already have account */}
              <p className="hidden md:inline-block text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-teal-600 font-medium hover:underline"
                >
                  Log in
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
                Sign up with Google
              </button>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center leading-relaxed mb-0">
                By signing up I confirm that I carefully have read and agree to the JobConnect{" "}
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

export default Register