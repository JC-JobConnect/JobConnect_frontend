import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import Interview from "../Assets/images/test.webp";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const WhyChooseUs = () => {
    const features = [
        "Trusted & Quality Job",
        "Top Companies",
        "No Extra Charge",
    ];
    return (
        <section className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-24 dark:bg-[#071A19]">
            {/* Subtle background decoration */}
            <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />

            <div className="relative mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">

                    {/* Left Visual */}
                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">

                        {/* Background glow */}
                        <div className="absolute inset-8 rounded-4xl bg-emerald-400/20 blur-2xl dark:bg-emerald-400/10" />

                        {/* Main image frame */}
                        <div className="relative rounded-[1.75rem] border border-slate-200/80 bg-white p-2.5 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-[#0D2522] dark:shadow-black/20 sm:p-3">
                            <div className="overflow-hidden rounded-[1.25rem]">
                                <img
                                    src={Interview}
                                    alt="A professional job interview connecting candidates with employers"
                                    className="h-72 w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04] sm:h-80 lg:h-97.5"
                                />
                            </div>
                        </div>

                        {/* Search icon badge */}
                        <div className="absolute -right-3 -top-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600 shadow-lg shadow-slate-900/5 dark:border-emerald-400/20 dark:bg-[#12332D] dark:text-emerald-300 sm:-right-4 sm:h-12 sm:w-12">
                            <CiSearch className="text-2xl" />
                        </div>

                        {/* Location icon badge */}
                        <div className="absolute -bottom-4 -left-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600 shadow-lg shadow-slate-900/5 dark:border-emerald-400/20 dark:bg-[#12332D] dark:text-emerald-300 sm:-left-4 sm:h-12 sm:w-12">
                            <CiLocationOn className="text-2xl" />
                        </div>
                    </div>

                    {/* Right Text Content */}
                    <div className="space-y-6 text-center lg:text-left">

                        {/* Eyebrow label */}
                        <div className="flex items-center justify-center gap-2 lg:justify-start">
                            <span className="h-0.5 w-7 rounded-full bg-emerald-500" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-emerald-400 ">
                                Why JobConnect
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[2.65rem]">
                            Your Career, {" "}
                            <span className="text-teal-600 dark:text-emerald-400">
                                Our Priority
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="mx-auto max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 lg:mx-0">
                            JobConnect connects talented job seekers with the right career
                            opportunities. With an easy-to-use platform and convenient
                            application tracking, finding your next opportunity becomes
                            simpler, faster, and more accessible.
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2 lg:grid-cols-1">
                            {features.map((item) => (
                                <div
                                    key={item}
                                    className="group flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3 text-left transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50/70 dark:border-white/[0.07] dark:bg-white/3 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/6"
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white dark:bg-emerald-400/15 dark:text-emerald-300 dark:group-hover:bg-emerald-500">
                                        <FaCheckCircle className="text-sm" />
                                    </span>

                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 sm:text-base">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="flex flex-wrap justify-center gap-4 pt-2 lg:justify-start">
                            <Link
                                to="/jobs"
                                className="group inline-flex items-center gap-3 rounded-full bg-teal-600 dark:bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/25 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-[#071A19]"
                            >
                                Explore Jobs
                                <FaArrowRightLong className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs