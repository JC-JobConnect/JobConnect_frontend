import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiBriefcase } from "react-icons/fi";
import Model from "../../Assets/images/model.webp"



function CareerCTA() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-teal-100 bg-linear-to-br from-teal-50 via-white to-emerald-100 shadow-lg shadow-teal-900/5 dark:border-teal-900/60 dark:from-[#0B2421] dark:via-[#0D302A] dark:to-[#10483C]">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl dark:bg-teal-400/10" />
        <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-400/10" />

        <div className="relative grid items-center gap-8 px-6 py-10 sm:px-10 md:grid-cols-2 md:px-14 lg:gap-12 lg:px-16 lg:py-12">

          {/* Left content */}
          <div className="relative z-10 text-center md:text-left">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-3.5 py-2 text-sm font-medium text-teal-700 shadow-sm dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-300">
              <FiBriefcase className="h-4 w-4" />
              Your next opportunity starts here
            </div>

            <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              One application could change{" "}
              <span className="text-teal-600 dark:text-teal-400">
                your future.
              </span>
            </h2>



            {/* Benefits */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-slate-600 dark:text-slate-300 md:justify-start">
              <span className="inline-flex items-center gap-2">
                <FiCheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                Easy applications
              </span>

              <span className="inline-flex items-center gap-2">
                <FiCheckCircle className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                Career opportunities
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-teal-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/30 dark:bg-teal-500 dark:hover:bg-teal-400 dark:hover:text-slate-950"
              >
                Create Free Account
                <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/jobs"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-6 py-3.5 font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 dark:border-teal-800 dark:bg-white/5 dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-300"
              >
                Explore Jobs
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Start building your next career chapter with JobConnect.
            </p>
          </div>

          {/* Right model image */}
          <div className="relative mx-auto flex w-full max-w-md items-end justify-center md:min-h-88 md:self-stretch">

            {/* Image backdrop */}
            <div className="absolute bottom-0 h-56 w-56 rounded-full bg-linear-to-br from-teal-200 to-emerald-300/70 dark:from-teal-700/60 dark:to-emerald-500/20 sm:h-72 sm:w-72" />

            {/* Decorative circles */}
            <div className="absolute right-8 top-10 h-12 w-12 rounded-2xl border border-teal-200 bg-white/60 dark:border-teal-700 dark:bg-teal-900/40" />
            <div className="absolute left-5 top-24 h-7 w-7 rounded-full bg-emerald-300/70 dark:bg-teal-500/30" />

            {/* Replace this path with your own transparent model image */}
            <img
              src={ Model }
              alt="Professional looking forward to new career opportunities"
              className="relative z-10 max-h-85 w-auto max-w-full object-contain object-bottom drop-shadow-xl sm:max-h-97 md:absolute md:bottom-0 md:max-h-98"
              loading="lazy"
            />

            {/* Floating opportunity card */}
            <div className="absolute bottom-5 left-0 z-20 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl shadow-slate-900/10 dark:border-teal-700/60 dark:bg-[#0B2421] sm:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300">
                <FiBriefcase className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Your career, your future
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Make your next move
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CareerCTA;