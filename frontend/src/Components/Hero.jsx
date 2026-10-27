import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import modelimg from "../Assets/images/model.webp"
import { LuBriefcaseBusiness } from "react-icons/lu";
import { BsPersonBoundingBox } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";

const Hero = () => {

  return (
    <section className="bg-[#f5f5f5] pt-22 pb-16">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">

        {/* Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D1FAE5] text-[#064E4A] text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
              Your Next Opportunity Awaits
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#064E4A] leading-tight tracking-tight">
              Find Your{" "}
              <span className="text-[#0D9488]">Dream Job</span>
              <br />
              Build Your{" "}
              <span className="text-[#0D9488]">Future</span>
            </h1>

            <p className="mt-5 text-lg text-[#0F766E] max-w-lg leading-relaxed">
              Discover thousands of job opportunities from top companies.
              Start your career journey today with the right opportunity.
            </p>

            <button className="mt-8 inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold px-6 py-3.5 rounded-full transition-colors">
              Get Started
              <span className="text-lg">→</span>
            </button>

            {/* Trusted by */}
            <div className="mt-10">
              <p className="text-sm text-[#0F766E] mb-3">Trusted by leading companies</p>
              <div className="flex items-center gap-6 opacity-70">
                <span className="font-bold text-[#064E4A]">SAMSUNG</span>
                <span className="font-bold text-[#064E4A]">Uber</span>
                <span className="font-bold text-[#064E4A]">adidas</span>
                <span className="font-bold text-[#064E4A]">Google</span>
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