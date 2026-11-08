import { useState } from "react";
import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import globeImg from "../../Assets/images/Globe.webp";
import googleImg from "../../Assets/images/Google.webp";
import logo from "../../Assets/images/logo2.svg";

import {
  loginUser,
  getCurrentUser,
} from "../../Api/api/Auth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Redirect after successful login.
  const handleLoginSuccess = () => {
    const next = searchParams.get("next");

    // Allow only the intended internal application route.
    if (
      next &&
      next.startsWith("/apply_jobs") &&
      !next.startsWith("//")
    ) {
      navigate(next, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  // Login form submission.
  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await loginUser(username, password);

      // Verify that authentication succeeded.
      await getCurrentUser();

      // Return to the application page if requested.
      handleLoginSuccess();
    } catch (err) {
      const data = err.response?.data;

      setError(
        data?.detail ||
          data?.username?.[0] ||
          data?.non_field_errors?.[0] ||
          data?.password?.[0] ||
          "Login failed. Please check your username and password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="flex min-h-screen items-center justify-center bg-white p-4 md:bg-gray-100">
        <div className="flex w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white md:flex-row md:shadow-2xl">

          {/* LEFT SIDE */}
          <div className="relative hidden w-full flex-col bg-linear-to-br from-[#064E4A] via-[#0F766E] to-[#0D9488] p-6 text-white md:flex md:w-[55%] md:p-10">

            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-emerald-100/70 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
                <img
                  src={logo}
                  alt="JobConnect"
                  className="h-full w-full object-contain p-1"
                />
              </div>

              <span className="whitespace-nowrap text-xl font-bold tracking-tight text-white sm:text-4xl">
                Job
                <span className="text-teal-300 transition-colors duration-300 group-hover:text-teal-200">
                  Connect
                </span>
              </span>
            </Link>

            {/* Main Content */}
            <div className="flex flex-1 flex-col items-center justify-center text-center">

              {/* Globe Image */}
              <div className="relative mb-6">
                <div className="absolute inset-0 scale-110 rounded-full bg-teal-300/20 blur-3xl" />

                <img
                  src={globeImg}
                  alt="Global career opportunities"
                  className="relative z-10 h-56 w-56 object-contain md:h-72 md:w-72"
                />
              </div>

              <div className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
                Login To Continue
              </div>

              <h1 className="mb-3 text-xl font-bold leading-tight md:text-2xl">
                Welcome back to your opportunity.
              </h1>

              <p className="mb-8 max-w-sm text-sm text-white/80">
                Sign in to continue exploring thousands of curated jobs,
                track your applications, and grow your career.
              </p>

              {/* Login Steps */}
              <div className="grid w-full max-w-md grid-cols-3 gap-2.5">

                <div className="rounded-xl bg-white p-3 text-gray-800">
                  <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-xs font-semibold text-white">
                    1
                  </div>

                  <p className="text-xs font-medium leading-snug">
                    Login to Your Profile
                  </p>
                </div>

                <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                  <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/30 text-xs font-semibold text-white">
                    2
                  </div>

                  <p className="text-xs font-semibold leading-snug text-white/90">
                    Search & Apply
                  </p>
                </div>

                <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                  <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/30 text-xs font-semibold text-white">
                    3
                  </div>

                  <p className="text-xs font-semibold leading-snug text-white/90">
                    Track Your Applications
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE: LOGIN FORM */}
          <div className="flex w-full flex-col justify-center p-8 md:w-[45%] md:p-10">

            {/* Mobile Logo */}
            <div className="mb-4 flex items-center justify-center gap-2 md:hidden">
              <Link to="/">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
                  JC
                </div>
              </Link>

              <span className="text-lg font-semibold text-gray-800">
                Job
                <span className="text-teal-600">Connect</span>
              </span>
            </div>

            <h2 className="mb-7 text-center text-2xl font-bold text-teal-800 md:text-3xl">
              Welcome to JobConnect
            </h2>

            {/* Mobile Sign In / Sign Up Tabs */}
            <div className="mb-6 flex rounded-full bg-gray-100 p-1 md:hidden">
              <Link
                to="/login"
                className="flex-1 rounded-full bg-white py-2.5 text-center text-sm font-semibold text-gray-800 shadow-sm"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="flex-1 rounded-full py-2.5 text-center text-sm font-semibold text-gray-400"
              >
                Sign Up
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  User Name
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center text-lg text-gray-500">
                    <IoPersonCircleOutline />
                  </div>

                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    placeholder="Username Here"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-4 pr-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <button
                disabled={loading}
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-teal-700 py-3.5 font-semibold text-white transition-colors hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Continue"}
              </button>

              {/* Register Link */}
              <p className="hidden text-center text-sm text-gray-600 md:inline-block">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-teal-600 hover:underline"
                >
                  Sign Up
                </Link>
              </p>

              {/* Divider */}
              <div className="my-2 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-sm text-gray-400">Or</span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Google Button */}
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <img
                  src={googleImg}
                  alt=""
                  className="h-5 w-5"
                />

                Continue with Google
              </button>

              {/* Terms */}
              <p className="text-center text-xs leading-relaxed text-gray-500">
                By signing in, you agree to our{" "}
                <Link
                  to="/privacy-policy"
                  className="text-teal-600 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  to="/terms-of-service"
                  className="text-teal-600 hover:underline"
                >
                  Terms of Service
                </Link>
                .
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
