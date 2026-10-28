import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { useEffect, useState } from "react";
import { logoutUser } from "../Api/api/Auth";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import logo from "../Assets/images/logo.svg"
import logo2 from "../Assets/images/logo2.svg"


const publicNavItems = [
    { id: "home", name: "Home", path: "/" },
    { id: "jobs", name: "Jobs", path: "/jobs" },
    { id: "about", name: "About", path: "/about" },
    { id: "contact", name: "Contact", path: "/contact" },
];

export default function Navbar() {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

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
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    const navItems = isLoggedIn
        ? [
            ...publicNavItems.slice(0, 2),
            {
                id: "my-applications",
                name: "My Applications",
                path: "/my-applications",
            },
            ...publicNavItems.slice(2),
        ]
        : publicNavItems;

    return (
        <header className="fixed inset-x-0 top-4 z-50 px-4 ">
            <div className="mx-auto max-w-7xl flex items-center justify-between bg-white/80 dark:bg-[#0E2928] backdrop-blur-md rounded-full px-4 py-2 shadow-sm border border-gray-100 dark:border-gray-800">

                {/* Logo */}
                <NavLink
                    to="/"
                    className="flex items-center gap-2 text-xl font-bold text-gray-900"
                >
                    <img src={darkMode ? logo : logo2} alt="" className="w-12 h-12" />

                    <div className="text-2xl font-bold">
                        <span className="dark:text-white">Job</span>
                        <span className="text-teal-700">Connect</span>
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

                        {/* Login */}
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
                                    Logout {""} <IoLogOutOutline className='text-xl' />
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
                    {/* Dark mode button */}
                    <button
                        onClick={toggleDarkMode}
                        className="px-4 py-2 text-sm font-medium rounded-full cursor-pointer border border-gray-200 hover:bg-gray-100 dark:hover:bg-teal-800 dark:border-teal-800 transition"
                    >
                        {darkMode ? <MdOutlineWbSunny className="text-lg dark:text-teal-100" /> : <MdOutlineDarkMode className="text-lg" />}
                    </button>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden text-2xl text-gray-800"
                >
                    <FiAlignJustify />
                </button>

            </div>

            {isOpen && (
                <div className="fixed inset-0 z-60 md:hidden">

                    {/* Background overlay */}
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 h-full w-full bg-black/40"
                    />

                    {/* White mobile menu panel */}
                    <div className="absolute left-3 right-3 top-3 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-5 text-gray-900 shadow-2xl">

                        {/* Menu header */}
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <NavLink
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 text-xl font-bold"
                            >     {/* logo will be here */}
                                <span>JC</span>
                                <span>
                                    Job<span className="text-teal-600">Connect</span>
                                </span>
                            </NavLink>

                            <button
                                type="button"
                                aria-label="Close navigation menu"
                                onClick={() => setIsOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-2xl transition hover:bg-gray-200"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Navigation links */}
                        <nav className="py-3">
                            <ul className="flex flex-col">
                                {navItems.map((item) => (
                                    <li key={item.id} className="border-b border-gray-100 last:border-0">
                                        <NavLink
                                            to={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) =>
                                                `block rounded-lg px-3 py-4 text-base font-medium transition-colors ${isActive
                                                    ? "bg-blue-50 text-teal-600"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-teal-600"
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
                        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">
                            {isLoggedIn ? (
                                <>
                                    <NavLink
                                        to="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-full border border-gray-200 px-4 py-3 text-center font-semibold transition hover:bg-gray-50"
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
                                        className="rounded-full border border-gray-200 px-4 py-3 text-center font-semibold transition hover:bg-gray-50"
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
                        <p className="pt-4 text-center text-xs text-gray-400">
                            Find your next opportunity with JobConnect.
                        </p>

                    </div>
                </div>
            )}

        </header>
    );
}
