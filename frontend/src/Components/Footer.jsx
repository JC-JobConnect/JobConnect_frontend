import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../Assets/images/logo.svg";
import logo2 from "../Assets/images/logo2.svg";


const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(sessionStorage.getItem("access_token"))
  );

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(Boolean(sessionStorage.getItem("access_token")));
    };

    window.addEventListener("authChanged", syncAuth);
    return () => window.removeEventListener("authChanged", syncAuth);
  }, []);
  return (
    <footer className="relative isolate overflow-hidden border-t border-emerald-100 bg-linear-to-b from-white to-emerald-50/70 text-slate-700 transition-colors duration-300 dark:border-emerald-900/50 dark:from-[#061714] dark:to-[#04110F] dark:text-slate-300">

      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/10" />

      <div className="pointer-events-none absolute -right-32 top-0 -z-10 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-500/10" />

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 lg:px-10 lg:pb-16 lg:pt-20">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">

          {/* Brand Section */}
          <div className="lg:col-span-5">

            <Link
              to="/"
              aria-label="JobConnect Home"
              className="group mb-6 inline-flex items-center gap-3"
            >
              <img
                src={logo2}
                alt=""
                className="h-12 w-12 object-contain dark:hidden"
              />

              <img
                src={logo}
                alt=""
                className="hidden h-12 w-12 object-contain dark:block"
              />

              <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Job<span className="text-teal-500 transition-colors group-hover:text-teal-600 dark:text-emerald-400 dark:group-hover:text-teal-400 ">Connect</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              Connecting talent with opportunity.
              <br />
              Discover new possibilities, connect with leading employers,
              and build your career with JobConnect.
            </p>

          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">

            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">
              Explore
            </h3>

            <ul className="space-y-4">

              {[
                { label: "Home", href: "/" },
                { label: "Browse Jobs", href: "/jobs" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-600 transition-colors duration-200 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-all group-hover:opacity-100" />
                    {item.label}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Job Seekers */}
          <div className="lg:col-span-2">

            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">
              Job Seekers
            </h3>

            <ul className="space-y-4">

              {[,
                isLoggedIn ? { label: "FAQ", href: "/about#FAQ" } : { label: "Create an Account", href: "/register" },
                isLoggedIn ? { label: "My Applications", href: "/my-applications" } : { label: "Sign In", href: "/login" },
                isLoggedIn ? { label: "My Profile", href: "/profile" } : { label: "FAQ", href: "/about#FAQ" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-600 transition-colors duration-200 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-500 opacity-0 transition-all group-hover:opacity-100" />
                    {item.label}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">

            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">
              Stay Connected
            </h3>

            <p className="mb-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Stay informed about new opportunities and career updates.
            </p>


          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200/80 bg-white/60 dark:border-white/10 dark:bg-black/10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-6 sm:px-8 md:flex-row lg:px-10">

          <p className="text-center text-xs text-slate-500 dark:text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} JobConnect. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">

            <Link
              to="/privacy"
              className="text-xs text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 sm:text-sm"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-slate-500 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 sm:text-sm"
            >
              Terms & Conditions
            </Link>

            {/* Back to Top */}
            <button
              type="button"
              aria-label="Back to top"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white dark:border-white/10 dark:bg-white/4 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-500 dark:hover:text-white"
            >
              ↑
            </button>

          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
