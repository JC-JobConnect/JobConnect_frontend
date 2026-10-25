import { NavLink } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { useState } from "react";

const publicNavItems = [
    { id: "home", name: "Home", path: "/" },
    { id: "jobs", name: "Jobs", path: "/jobs" },
    { id: "about", name: "About", path: "/about" },
    { id: "contact", name: "Contact", path: "/contact" },
];

export default function Navbar({ isLoggedIn = true }) {
    const [isOpen, setIsOpen] = useState(false);
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
        <header className="fixed inset-x-0 top-3 z-50 px-4">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between rounded-full border border-gray-200 bg-white px-5 py-4 shadow-md sm:px-8 lg:px-10">
                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="flex shrink-0 items-center gap-2 text-2xl font-bold text-gray-900"
                    >JC
                        <div>
                            <span>Job</span>
                            <span className="text-blue-600">Connect</span>
                        </div>
                    </NavLink>
                    {/* Center Navigation */}

                    <nav className="hidden md:block ">
                        <ul className="flex items-center gap-8 lg:gap-12  ">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            ` transition-colors font-semibold text-xl duration-200   ${isActive
                                                ? "text-blue-600"
                                                : "text-gray-900 hover:text-blue-600  "
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    {/* Mobile Theme Button */}

                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden text-2xl text-zinc-700"
                    >
                        <FiAlignJustify />
                    </button>

                    {/* login & Create profile Button */}
                    <div className="hidden shrink-0 items-center gap-5 md:flex">
                        <NavLink
                            to="/login"
                            className="flex items-center gap-2 text-[16px] font-semibold text-gray-900 hover:text-blue-600"
                        >Login</NavLink>
                        <NavLink
                            to="/register"
                            className="rounded-full bg-linear-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-[16px] font-semibold text-white transition-all duration-200 hover:shadow-lg"
                        >
                            Create Profile
                        </NavLink>
                    </div>
                </div>
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
                                    Job<span className="text-blue-600">Connect</span>
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
                                                    ? "bg-blue-50 text-blue-600"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
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
                                className="rounded-full bg-linear-to-r from-blue-600 to-cyan-500 px-4 py-3 text-center font-semibold text-white transition hover:shadow-lg"
                            >
                                Create Profile
                            </NavLink>
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
