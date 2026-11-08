import { NavLink, useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { useEffect, useState } from "react";
import { logoutUser } from "../../Services/Auth";
import { IoLogOutOutline,IoLogInOutline } from "react-icons/io5";
import { MdOutlineWbSunny,MdOutlineDarkMode } from "react-icons/md";
import logo from "../../Assets/images/logo.svg";
import logo2 from "../../Assets/images/logo2.svg";

const publicNavItems = [
  { id: "home", name: "Home", path: "/" },
  { id: "jobs", name: "Jobs", path: "/jobs" },
  { id: "companies", name: "Companies", path: "/companies" },
  { id: "about", name: "About", path: "/about" },
  { id: "contact", name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(sessionStorage.getItem("access_token"))
  );

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(Boolean(sessionStorage.getItem("access_token")));
    };

    window.addEventListener("authChanged", syncAuth);

    return () => {
      window.removeEventListener("authChanged", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    window.dispatchEvent(new Event("authChanged"));
    setIsOpen(false);
    navigate("/login");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = isLoggedIn
    ? [
      ...publicNavItems.slice(0, 3),
      {
        id: "my-applications",
        name: "My Applications",
        path: "/my-applications",
      },
      ...publicNavItems.slice(3),
    ]
    : publicNavItems;

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between bg-white/80 dark:bg-[#0E2928] backdrop-blur-md rounded-full px-4 py-2 shadow-sm border border-gray-100 dark:border-gray-800">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center group gap-2 text-xl font-bold text-gray-900"
        >
          <img src={darkMode ? logo : logo2} alt="" className="w-12 h-12" />

          <div className="font-bold">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Job</span>
            <span className="text-teal-500 transition-colors group-hover:text-teal-600 dark:text-emerald-400 dark:group-hover:text-teal-400 text-2xl sm:text-3xl">Connect</span>
          </div>
        </NavLink>

        {/* Right side - Dark pill navbar */}
        <div className="hidden md:flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 rounded-full bg-gray-900 px-3 py-2 shadow-lg">
            {/* Nav Links */}
            <nav>
              <ul className="flex items-center">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `px-4 py-2 text-sm font-semibold rounded-full transition-colors ${isActive
                          ? "text-white bg-white/10"
                          : "text-gray-300 hover:text-white"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Login / Logout */}
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/profile"
                  className="px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white"
                >
                  My Profile
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-red-500 relative inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white cursor-pointer transition hover:bg-red-600"
                >
                  Logout <IoLogOutOutline className="text-xl" />
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="relative inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-teal-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  <IoLogInOutline className="text-xl" /> Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="ml-1 rounded-full bg-linear-to-r from-teal-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:scale-105"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Dark mode button (desktop) */}
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 text-sm font-medium rounded-full cursor-pointer border border-gray-200 hover:bg-gray-100 dark:hover:bg-teal-800 dark:border-teal-800 transition"
          >
            {darkMode ? (
              <MdOutlineWbSunny className="text-lg dark:text-teal-100" />
            ) : (
              <MdOutlineDarkMode className="text-lg" />
            )}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-2xl text-gray-800 dark:text-white"
        >
          <FiAlignJustify />
        </button>
      </div>

      {/* ==================== MOBILE MENU ==================== */}
      {isOpen && (
        <div className="fixed inset-0 z-60 md:hidden">
          {/* Background overlay */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 h-full w-full bg-black/40"
          />

          {/* Mobile menu panel - now supports dark mode */}
          <div className="absolute left-3 right-3 top-3 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0E2928] p-5 text-gray-900 dark:text-gray-100 shadow-2xl">
            {/* Menu header */}
            <div className="flex  items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex group items-center gap-2 text-xl font-bold"
              >
                <img src={darkMode ? logo : logo2} alt="" className="w-12 h-12" />
                <div>
                  <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Job</span>
                  <span className="text-emerald-600 transition-colors group-hover:text-teal-500 dark:text-emerald-400 dark:group-hover:text-teal-300">Connect</span>
                </div>
              </NavLink>

              <div className="flex items-center gap-2">
                {/* Theme toggle - moved here for better position */}
                <button
                  onClick={toggleDarkMode}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-teal-700 hover:bg-gray-100 dark:hover:bg-teal-800 transition"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <MdOutlineWbSunny className="text-lg text-teal-100" />
                  ) : (
                    <MdOutlineDarkMode className="text-lg text-gray-700" />
                  )}
                </button>

                {/* Close button */}
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-2xl transition hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="py-3">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li
                    key={item.id}
                    className="border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-4 text-base font-medium transition-colors ${isActive
                          ? "bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-teal-600 dark:hover:text-teal-300"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile account actions */}
            <div className="flex flex-col gap-3 border-t border-gray-100 dark:border-gray-700 pt-4">
              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full border border-gray-200 dark:border-gray-600 px-4 py-3 text-center font-semibold transition hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    My Profile
                  </NavLink>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full bg-red-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full border border-gray-200 dark:border-gray-600 px-4 py-3 text-center font-semibold transition hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-linear-to-r from-teal-600 to-cyan-500 px-4 py-3 text-center font-semibold text-white transition hover:shadow-lg"
                  >
                    Create Profile
                  </NavLink>
                </>
              )}
            </div>

            {/* Optional footer */}
            <p className="pt-4 text-center text-xs text-gray-400 dark:text-gray-500">
              Find your next opportunity with JobConnect.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}