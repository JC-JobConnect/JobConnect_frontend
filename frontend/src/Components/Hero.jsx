import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import modelimg from "../Assets/images/model.webp"
import { LuBriefcaseBusiness } from "react-icons/lu";
import { BsPersonBoundingBox } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";

const Hero = () => {

  return (
    <section className="bg-white dark:bg-[#06122B] pt-28 pb-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        {/* Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Left Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Opportunity Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/50 text-[#0fa988] font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-[#0fa988] animate-ping" />
              <span> Your Next Opportunity Awaits</span>
            </div>
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.15] tracking-tight">
              Find Your{" "}
              <span className="text-[#0fa988] relative inline-block">
                Dream Job
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#0fa988]/30"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,15 Q50,0 100,15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={6}
                  />
                </svg>
              </span>{" "}
              <br className="hidden sm:inline" />
              Build Your Future
            </h1>
            {/* Subtitle */}
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover thousands of career opportunities from top global companies.
              Start your career journey today with the right match for your skills.
            </p>
            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#search-section"
                className="px-7 py-3.5 rounded-full bg-[#0fa988] hover:bg-[#0d9488] text-white font-semibold text-base shadow-lg shadow-teal-600/20 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                Get Started
                <i data-lucide="arrow-right" className="w-5 h-5" />
              </a>
              <a
                href="#jobs"
                className="px-7 py-3.5 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-[#0fa988] dark:hover:border-[#0fa988] text-gray-700 dark:text-gray-200 font-semibold text-base hover:text-[#0fa988] dark:hover:text-[#0fa988] transition-all"
              >
                Explore Jobs
              </a>
            </div>
            {/* Trusted Companies Bar */}
            <div className="pt-8 border-t border-gray-100 dark:border-gray-800/80">
              <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold mb-4">
                Trusted by leading companies
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 opacity-70 grayscale hover:grayscale-0 transition-all">
                <span className="text-xl font-bold tracking-tight text-gray-700 dark:text-gray-300 font-sans">
                  SAMSUNG
                </span>
                <span className="text-xl font-black tracking-tighter text-gray-700 dark:text-gray-300">
                  Uber
                </span>
                <span className="text-xl font-extrabold tracking-wider text-gray-700 dark:text-gray-300 lowercase italic">
                  adidas
                </span>
                <span className="text-xl font-semibold tracking-normal text-gray-700 dark:text-gray-300">
                  Google
                </span>
                <span className="text-xl font-bold text-gray-700 dark:text-gray-300">
                  Microsoft
                </span>
              </div>
            </div>
          </div>



          {/* Right Visual */}
          <div className="relative mx-auto w-full max-w-130">

            {/* Main Illustration Card */}
            <div className="relative isolate h-105 overflow-visible sm:h-115">

              {/* Background Shape */}
              <div className="absolute inset-x-2 bottom-0 top-5 -z-10 overflow-hidden rounded-4xl bg-linear-to-br from-[#e5faf6] via-[#d1f7ef] to-[#c2f0e9]">

                {/* Large Center Circle */}
                <div className="absolute left-1/2 top-[20%] h-90 w-90 -translate-x-1/2 rounded-full bg-linear-to-br from-[#a9eee0] to-[#8ce7d5] opacity-80" />

                {/* Bottom Left Circle */}
                <div className="absolute -bottom-24 -left-20 h-70 w-70 rounded-full bg-linear-to-br from-[#43dfc3] to-[#a0f2e1] opacity-90" />

                {/* Decorative Circle */}
                <div className="absolute right-10 top-[52%] h-28 w-28 rounded-full bg-white/25" />

                {/* Soft Light */}
                <div className="absolute inset-0 bg-linear-to-t from-white/10 via-transparent to-white/20" />
              </div>

              {/* Main Model Image */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex h-full items-end justify-center overflow-hidden rounded-4xl">

                <img
                  src={modelimg}
                  alt="JobConnect job seeker"
                  className="h-[108%] w-full max-w-none object-contain object-bottom drop-shadow-sm"
                />

              </div>

              {/* JC Logo Badge */}
              <div className="absolute left-5 top-0 z-30 flex h-20.5 w-20.5 items-center justify-center rounded-[1.8rem] border border-teal-200/70 bg-white/90 shadow-[0_12px_30px_rgba(13,148,136,0.12)] backdrop-blur-md sm:left-8">

                <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-linear-to-br from-[#0d9488] to-[#009e8e] text-2xl font-extrabold tracking-tight text-white shadow-md">
                  JC
                </div>

              </div>

              {/* Find Your Perfect Job Card */}
              <div className="absolute left-0 top-[39%] z-20 flex max-w-51.15 items-center gap-3 rounded-3xl border border-white/80 bg-white/95 px-4 py-4 shadow-[0_12px_35px_rgba(15,118,110,0.10)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 sm:-left-1">

                {/* Briefcase Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-teal-50 to-emerald-100 text-teal-600">

                  <LuBriefcaseBusiness className='text-3xl' />

                </div>

                <span className="text-sm font-bold leading-5 text-[#164e4a]">
                  Find Your
                  <br />
                  Perfect Job
                </span>

              </div>

              {/* Better Career Opportunities Card */}
              <div className="absolute right-0 top-[22%] z-20 flex max-w-55 items-center gap-3 rounded-3xl border border-white/80 bg-white/95 px-4 py-4 shadow-[0_12px_35px_rgba(15,118,110,0.10)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 sm:-right-1">

                {/* Trending Up Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-teal-50 to-emerald-100 text-teal-600">

                  <FaArrowTrendUp className='text-3xl' />

                </div>

                <span className="text-sm font-bold leading-5 text-[#164e4a]">
                  Better Career
                  <br />
                  Opportunities
                </span>

              </div>


              {/* People Icon */}
              <div className="absolute bottom-[20%] right-5 z-20 flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/70 bg-white/90 text-teal-600 shadow-[0_10px_30px_rgba(15,118,110,0.10)] backdrop-blur-md transition-transform duration-300 hover:scale-105 sm:right-8">

                <BsPersonBoundingBox className='text-3xl' />
              </div>
            </div>
          </div>
        </div>
        {/* Search Bar Section */}
        <div className="mt-14">
          <div className="bg-white rounded-2xl shadow-lg border border-[#A7F3D0] p-3 flex flex-col md:flex-row gap-3 items-center">

            {/* Job Title */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#A7F3D0] w-full">
              <span className="text-[#064E4A]"><CiSearch className="text-base" /></span>
              <input
                type="text"
                placeholder="Job Title, Skill Or Company"
                className="bg-transparent outline-none w-full text-[#064E4A] placeholder:text-[#0F766E]/60"
              />
            </div>

            {/* Location */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#A7F3D0] w-full">
              <span className="text-[#064E4A]"><CiLocationOn className="text-base" /></span>
              <input
                type="text"
                placeholder="Location"
                className="bg-transparent outline-none w-full text-[#064E4A] placeholder:text-[#0F766E]/60"
              />
            </div>

            {/* Category */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#A7F3D0] w-full">
              <select className="bg-transparent outline-none w-full text-[#064E4A]">
                <option>All Categories</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Design</option>
                <option>Sales</option>
              </select>
            </div>

            {/* Search Button */}
            <button className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors w-full md:w-auto cursor-pointer">
              Search
            </button>
          </div>

          {/* Popular Searches */}
          <div className="mt-10 text-center">
            <p className="text-[#0F766E] font-semibold mb-3 text-2xl">
              Popular Searches By Categories
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {[
                "Data Science",
                "Teacher",
                "Internship",
                "Lecturer",
                "Analyst",
                "Marketing",
                "Receptionist/Front Office Desk",
                "Fresher",
                "Engineering",
                "Graphic Designer",
                "Call Center",
                "Sales",
              ].map((item) => (
                <button
                  key={item}
                  className="flex items-center gap-1.5 text-sm cursor-pointer text-gray-500 hover:text-[#0D9488] transition-colors"
                >
                  <CiSearch className="text-base" />
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Hero