
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jobsApi from "../Api/api/JobApi.js";

import {
  FaStar,
  FaRegUser,
  FaBriefcase,
  FaArrowRight,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

const TopCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch companies from the same API used by Companies.jsx
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await jobsApi.get("v1/companies/");

        // Support both normal and paginated DRF responses
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        setCompanies(data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching top companies:", err);
        setError("Unable to load companies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Handle company logo URL
  const getLogoUrl = (logo) => {
    if (!logo) return null;

    return logo.startsWith("http")
      ? logo
      : `http://127.0.0.1:8000${logo.startsWith("/") ? "" : "/"}${logo}`;
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 dark:bg-[#071A19] sm:py-20 lg:py-24">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-teal-400/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-emerald-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT: TOP COMPANIES */}
          <div className="space-y-8">

            {/* Heading */}
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:border-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                <FaChartLine />
                Career Opportunities
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                Top{" "}
                <span className="bg-linear-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                  Companies
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Explore leading companies and discover exciting career
                opportunities with employers looking for talented people
                like you.
              </p>
            </div>

            {/* Company List */}
            <div className="space-y-4">

              {/* Loading State */}
              {loading && (
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-[#0B2422]"
                    />
                  ))}
                </div>
              )}

              {/* Error State */}
              {!loading && error && (
                <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/20 dark:text-red-400">
                  {error}
                </p>
              )}

              {/* Empty State */}
              {!loading && !error && companies.length === 0 && (
                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-[#0B2422] dark:text-slate-400">
                  No companies available at the moment.
                </p>
              )}

              {/* Dynamic Company Cards */}
              {!loading &&
                !error &&
                companies.map((company, index) => (
                  <Link
                    key={company.id}
                    to="/companies"
                    className="group flex items-center gap-3 rounded-2xl border border-transparent p-3 transition-all duration-300 hover:border-teal-100 hover:bg-teal-50/60 hover:shadow-lg hover:shadow-teal-900/5 dark:hover:border-teal-800/70 dark:hover:bg-teal-950/40 sm:gap-5 sm:p-4"
                  >

                    {/* Number */}
                    <div className="w-12 shrink-0 text-2xl font-extrabold tracking-tight text-teal-500/80 transition-colors group-hover:text-emerald-500 sm:w-16 sm:text-3xl">
                      {String(index + 1).padStart(2, "0")}
                      <span className="text-teal-300 dark:text-teal-700">
                        .
                      </span>
                    </div>

                    {/* Company Card */}
                    <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition-all duration-300 group-hover:border-teal-100 group-hover:shadow-md dark:border-white/5 dark:bg-[#0B2422] dark:group-hover:border-teal-800 sm:gap-4 sm:p-4">

                      {/* Company Logo */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-teal-50 dark:bg-teal-900/30 sm:h-14 sm:w-14">
                        {company.logo ? (
                          <img
                            src={getLogoUrl(company.logo)}
                            alt={`${company.name} logo`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FaBriefcase className="text-xl text-teal-600 dark:text-teal-400" />
                        )}
                      </div>

                      {/* Company Information */}
                      <div className="min-w-0 flex-1">

                        <h3 className="truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300 sm:text-base">
                          {company.name}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                          {company.bio || company.location || "Company"}
                        </p>

                      </div>

                      {/* Jobs & Location */}
                      <div className="hidden shrink-0 flex-col items-end gap-2 text-xs text-slate-500 dark:text-slate-400 sm:flex">

                        <span className="flex items-center gap-1.5">
                          <FaRegUser className="text-teal-500" />
                          {company.location || "Location unavailable"}
                        </span>

                        <span className="flex items-center gap-1.5 font-semibold text-teal-700 dark:text-teal-300">
                          <FaBriefcase />
                          {company.vacancy ?? company.jobs?.length ?? 0} jobs open
                        </span>

                      </div>

                      {/* Arrow */}
                      <FaArrowRight className="shrink-0 text-sm text-teal-500 transition-transform duration-300 group-hover:translate-x-1" />

                    </div>
                  </Link>
                ))}
            </div>

            {/* View All */}
            <Link
              to="/companies"
              className="group inline-flex items-center gap-2 border-b-2 border-teal-500 pb-1 text-sm font-bold text-slate-800 transition-colors hover:text-teal-600 dark:text-slate-200 dark:hover:text-teal-400"
            >
              View All Top Companies
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

          </div>

          {/* RIGHT: PROMOTIONAL PANEL */}
          <div className="relative">

            <div className="group relative isolate min-h-120 overflow-hidden rounded-4xl bg-linear-to-br from-[#E5FAF5] via-[#D0F5EC] to-[#B7EDE0] p-7 dark:from-[#0C302B] dark:via-[#0A2925] dark:to-[#071A19] sm:p-10 lg:min-h-140 lg:p-12">

              {/* Decorative Background Shapes */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-teal-400/20 blur-2xl transition-transform duration-700 group-hover:scale-110" />

              <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

              <div className="pointer-events-none absolute right-8 top-24 h-56 w-56 rounded-full border border-teal-600/10 dark:border-teal-300/10 sm:right-12 sm:h-72 sm:w-72" />

              <div className="pointer-events-none absolute right-16 top-32 h-40 w-40 rounded-full border border-teal-600/10 dark:border-teal-300/10 sm:right-20 sm:h-56 sm:w-56" />

              {/* Content */}
              <div className="relative z-10 max-w-md">

                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/60 px-3 py-1.5 text-xs font-semibold text-teal-800 backdrop-blur-md dark:border-teal-700/50 dark:bg-teal-950/50 dark:text-teal-300">
                  <FaCheckCircle />
                  Your next opportunity awaits
                </div>

                {/* Heading */}
                <h3 className="max-w-sm text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[42px]">
                  Ready to take the next step in your{" "}
                  <span className="text-teal-600 dark:text-teal-400">
                    dream career?
                  </span>
                </h3>

                {/* Description */}
                <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                  Join JobConnect and explore exciting opportunities
                  from companies that value your skills, talent, and ambition.
                </p>

                {/* Buttons */}
                <div className="mt-7 flex flex-wrap gap-3">

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 dark:bg-teal-500 dark:text-[#05201D] dark:hover:bg-teal-400"
                  >
                    Contact Us
                    <FaArrowRight />
                  </Link>

                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center rounded-xl border border-teal-600/40 bg-white/60 px-5 py-3 text-sm font-bold text-teal-800 backdrop-blur-sm transition-all duration-300 hover:bg-white dark:border-teal-500/40 dark:bg-white/5 dark:text-teal-300 dark:hover:bg-white/10"
                  >
                    Learn More
                  </Link>

                </div>

              </div>

              {/* Decorative Company Illustration */}
              <div className="relative mx-auto mt-8 flex h-44 max-w-sm items-center justify-center sm:h-48 lg:mt-10 lg:h-52">

                {/* Glow */}
                <div className="absolute h-36 w-36 rounded-full bg-teal-400/20 blur-2xl sm:h-44 sm:w-44" />

                {/* Main Building */}
                <div className="relative flex h-32 w-28 flex-col items-center justify-end rounded-t-2xl border border-teal-600/20 bg-linear-to-b from-white/90 to-teal-100/80 p-3 shadow-xl shadow-teal-900/10 dark:from-teal-800/80 dark:to-teal-950/80 sm:h-36 sm:w-32">

                  <div className="absolute -top-5 left-1/2 h-5 w-20 -translate-x-1/2 rounded-t-lg border border-teal-600/20 bg-teal-500/80" />

                  <div className="grid w-full flex-1 grid-cols-3 gap-2 py-2">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-sm bg-teal-500/30 dark:bg-teal-300/30"
                      />
                    ))}
                  </div>

                  <div className="h-9 w-7 rounded-t-lg border border-teal-600/20 bg-teal-600 dark:bg-teal-400" />

                </div>

                {/* Left Building */}
                <div className="relative -mr-1 flex h-20 w-16 flex-col items-center justify-end rounded-t-xl border border-teal-600/15 bg-white/70 p-2 shadow-lg dark:bg-teal-900/70 sm:h-24 sm:w-20">
                  <div className="grid w-full flex-1 grid-cols-2 gap-1.5 py-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-sm bg-emerald-400/50"
                      />
                    ))}
                  </div>
                  <div className="h-5 w-4 rounded-t bg-teal-500/70" />
                </div>

                {/* Right Building */}
                <div className="relative -ml-1 flex h-24 w-20 flex-col items-center justify-end rounded-t-xl border border-teal-600/15 bg-white/80 p-2 shadow-lg dark:bg-teal-900/70 sm:h-28 sm:w-24">
                  <div className="grid w-full flex-1 grid-cols-2 gap-1.5 py-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-sm bg-teal-400/50"
                      />
                    ))}
                  </div>
                  <div className="h-6 w-5 rounded-t bg-teal-500/70" />
                </div>

                {/* Floating Briefcase Badge */}
                <div className="absolute left-2 top-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-white bg-white text-teal-600 shadow-lg dark:border-teal-700 dark:bg-[#103C35] dark:text-teal-300 sm:left-4">
                  <FaBriefcase className="text-xl" />
                </div>

                {/* Floating Chart Badge */}
                <div className="absolute right-2 top-0 flex h-12 w-12 items-center justify-center rounded-2xl border border-white bg-white text-emerald-600 shadow-lg dark:border-teal-700 dark:bg-[#103C35] dark:text-emerald-300 sm:right-4">
                  <FaChartLine className="text-xl" />
                </div>

              </div>

              {/* Bottom Floating Card */}
              <div className="absolute bottom-4 right-4 z-20 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md dark:border-teal-700/50 dark:bg-[#0B2422]/90 sm:flex">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300">
                  <FaCheckCircle className="text-xl" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Find Your Match
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your career starts here
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default TopCompanies;
