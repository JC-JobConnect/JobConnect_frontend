import { CiSearch, CiLocationOn } from "react-icons/ci";
import modelimg from "../Assets/images/model.webp"
import { LuBriefcaseBusiness } from "react-icons/lu";
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FiLayers } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import profileImg from "../Assets/images/group_profile.webp"
import { Link } from "react-router-dom";

const Hero = () => {

  return (
    <section className="bg-[#F9FAFB] dark:bg-[#071A19] pt-28 pb-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        {/* Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Left Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className='inline-flex items-center gap-2 border border-teal-300 p-1 pr-4 rounded-full'>
              <img className='w-20' src={profileImg} alt="" />
              <p className='text-xs font-medium dark:text-slate-50' >Trusted by 10k+ people</p>
            </div>
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-slate-200 leading-[1.15] tracking-tight">
              Find work that{" "}
              <span className="text-[#0fa988] relative inline-block">
                fits
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
              where you want to go.
            </h1>
            {/* Subtitle */}
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover thousands of career opportunities from top global companies.
              Start your career journey today with the right match for your skills.
            </p>
            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="#search-section"
                className="px-7 py-3.5 rounded-full bg-[#0fa988] hover:bg-[#0d9488] text-white font-semibold text-base shadow-lg shadow-teal-600/20 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                Get Started
                <FaArrowRightLong className="w-5 h-5" />
              </Link>
              <Link
                to="#jobs"
                className="px-7 py-3.5 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-[#0fa988] dark:hover:border-[#0fa988] text-gray-700 dark:text-gray-200 font-semibold text-base hover:text-[#0fa988] dark:hover:text-[#0fa988] transition-all"
              >
                Explore Jobs
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative mx-auto w-full max-w-130 ">

            {/* Main Illustration Card */}
            <div className="relative isolate h-105 overflow-visible sm:h-115">

              {/* Background Shape */}
              <div className="absolute inset-x-2 bottom-0 top-5 -z-10 overflow-hidden rounded-4xl bg-linear-to-br from-[#e5faf6] via-[#d1f7ef] to-[#c2f0e9] dark:bg-[#071A19] dark:from-[#071A19] dark:via-[#0A2A28] dark:to-[#0D3D38] ">

                {/* Large Center Circle */}
                <div className="absolute left-1/2 top-[20%] h-90 w-90 -translate-x-1/2 rounded-full bg-linear-to-br from-[#a9eee0] to-[#8ce7d5] opacity-80 dark:from-[#0F766E]/30 dark:to-[#0D9488]/20 dark:opacity-60" />

                {/* Bottom Left Circle */}
                <div className="absolute -bottom-24 -left-20 h-70 w-70 rounded-full bg-linear-to-br from-[#43dfc3] to-[#a0f2e1] opacity-90 dark:from-[#0D9488]/25 dark:to-[#14B8A6]/15 dark:opacity-50" />

                {/* Decorative Circle */}
                <div className="absolute right-10 top-[52%] h-28 w-28 rounded-full bg-white/25 dark:bg-white/5" />

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
              <div className="absolute left-5 top-0 z-30 flex h-20.5 w-20.5 items-center justify-center rounded-[1.8rem] border border-teal-200/70 bg-white/90 dark:bg-[#0F2A28]/90 dark:border-teal-700/50 shadow-[0_12px_30px_rgba(13,148,136,0.12)] backdrop-blur-md sm:left-8 transition-transform duration-300 hover:scale-105">

                <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-linear-to-br from-[#0d9488] to-[#009e8e] text-2xl font-extrabold tracking-tight text-white shadow-md">
                  JC
                </div>

              </div>

              {/* Job Vacancies Card */}
              <div className="hidden absolute left-0 top-[25%] z-20 md:flex max-w-51.15 items-center gap-3 rounded-3xl border border-white/80 bg-white/95 dark:bg-[#0F2A28]/90 dark:border-teal-800/50 px-4 py-4 shadow-[0_12px_35px_rgba(15,118,110,0.10)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 sm:-left-1">

                {/* Briefcase Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-teal-50 to-emerald-100 text-teal-600 dark:from-teal-900/50 dark:to-emerald-900/40 dark:text-teal-300">

                  <LuBriefcaseBusiness className='text-3xl' />

                </div>

                <div className="font-bold leading-5  ">
                  <span className="text-lg text-teal-800 dark:text-teal-300">10k+</span>
                  <br />
                  <span className="text-sm text-slate-600 dark:text-slate-300">Job Vacancies</span>
                </div>

              </div>

              {/* Card */}
              <div className=" absolute -right-2 md:-right-8 top-[88%] z-20 flex max-w-82 items-center gap-3 rounded-3xl border border-white/80 bg-white/95 dark:bg-[#0F2A28]/90 dark:border-teal-800/50 px-4 py-4 shadow-[0_12px_35px_rgba(15,118,110,0.10)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 sm:-right-6">

                {/* Trending Up Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-teal-50 to-emerald-100 text-teal-600 dark:from-teal-900/50 dark:to-emerald-900/40 dark:text-teal-300">

                  <MdOutlineMarkEmailRead className='text-3xl' />

                </div>

                <div className="font-bold leading-5 text-[#164e4a]">
                  <span className="text-lg text-teal-800 dark:text-teal-300">Congratulation!</span>
                  <br />
                  <span className="text-sm text-slate-600 dark:text-slate-300">You're Invited For an Interview</span>
                </div>

              </div>


              {/* People Icon */}
              <div className="absolute bottom-[40%] right-5 z-20 flex h-19 w-19 items-center justify-center rounded-full border border-white/70 bg-white/90 text-teal-600 dark:bg-[#0F2A28]/90 dark:border-teal-800/50 dark:text-teal-300 shadow-[0_10px_30px_rgba(15,118,110,0.10)] backdrop-blur-md transition-transform duration-300 hover:scale-105 sm:right-8">

                <BsPersonBoundingBox className='text-3xl' />
              </div>
            </div>
          </div>
        </div>
        {/* Search Bar Section */}

        <div className="mt-14">
          <div className="bg-white dark:bg-[#102B2A] rounded-full shadow-md dark:shadow-black/20 border border-gray-100 dark:border-[#24504B] p-3 flex flex-col md:flex-row gap-2 items-center">

            {/* Job Title */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-full border border-gray-200 dark:border-[#28514D] bg-white dark:bg-[#102F2D] w-full">
              <CiSearch className="text-gray-500 dark:text-[#A7B5B4] text-xl shrink-0" />
              <input
                type="text"
                placeholder="Job Title, Skill Or Company"
                className="bg-transparent outline-none w-full text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-[#A7B5B4] text-base lg:text-lg"
              />
            </div>

            {/* Location */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-full border border-gray-200 dark:border-[#28514D] bg-white dark:bg-[#102F2D] w-full">
              <CiLocationOn className="text-gray-500 dark:text-[#A7B5B4] text-xl shrink-0" />
              <input
                type="text"
                placeholder="Location"
                className="bg-transparent outline-none w-full text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-[#A7B5B4] text-base lg:text-lg"
              />
            </div>

            {/* Category */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-full border border-gray-200 dark:border-[#28514D] bg-white dark:bg-[#102F2D] w-full">
              <FiLayers className="text-gray-600 dark:text-[#A7B5B4] text-xl shrink-0" />
              <select className="bg-transparent outline-none w-full text-gray-700 dark:text-gray-100 text-base lg:text-lg cursor-pointer">
                <option value="">All Categories</option>
                <option value="engineering" className="bg-white text-gray-900">Engineering</option>
                <option value="marketing" className="bg-white text-gray-900">Marketing</option>
                <option value="design" className="bg-white text-gray-900">Design</option>
                <option value="sales" className="bg-white text-gray-900">Sales</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="button"
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold px-8 py-4 rounded-full transition-colors w-full md:w-auto cursor-pointer text-base lg:text-lg"
            >
              Search
            </button>
          </div>

          {/* Popular Searches */}
          <div className="mt-10 text-center">
            <p className="text-[#0F766E] dark:text-[#2DD4BF] font-semibold mb-3 text-xl lg:text-2xl">
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
                  type="button"
                  className="flex items-center gap-1.5 text-sm cursor-pointer text-gray-500 dark:text-[#A7B5B4] hover:text-[#0D9488] dark:hover:text-[#5EEAD4] transition-colors"
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