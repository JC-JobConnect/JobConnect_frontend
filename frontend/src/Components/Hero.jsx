import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";


const Hero = () => {
  return (
    <section className="bg-white pt-28 pb-16">
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
          <div className="relative">
            <div className="bg-[#0D9488] rounded-3xl h-105 relative overflow-hidden flex items-end justify-center">
              {/* Decorative circles */}
              <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10"></div>
              <div className="absolute bottom-20 left-8 w-24 h-24 rounded-full bg-white/10"></div>

              {/* Placeholder person area */}
              <div className="relative z-10 w-64 h-80 bg-[#10B981] rounded-t-full flex items-center justify-center">
                <div className="text-white text-6xl font-bold opacity-30">JC</div>
              </div>
            </div>

            {/* Floating Card 1 */}
            <div className="absolute top-16 -left-4 bg-white rounded-2xl shadow-lg p-4 w-56">
              <p className="text-sm font-semibold text-[#064E4A] mb-3">How satisfied are you?</p>
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-[#D1FAE5]">
                  <div className="h-2 rounded-full bg-[#10B981] w-[85%]"></div>
                </div>
                <div className="h-2 rounded-full bg-[#D1FAE5]">
                  <div className="h-2 rounded-full bg-[#0D9488] w-[60%]"></div>
                </div>
                <div className="h-2 rounded-full bg-[#D1FAE5]">
                  <div className="h-2 rounded-full bg-[#A7F3D0] w-[40%]"></div>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute bottom-10 -right-16 bg-white rounded-2xl shadow-lg p-4 w-60">
              <p className="text-sm font-semibold text-[#064E4A] mb-1">New Opportunity</p>
              <p className="text-xs text-[#0F766E]">
                Frontend Developer at a growing tech company. Apply now and take the next step.
              </p>
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