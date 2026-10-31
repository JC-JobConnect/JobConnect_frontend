import { Link } from "react-router-dom";
import { FaStar, FaUser } from "react-icons/fa";

const companies = [
  {
    id: 1,
    number: "01.",
    name: "TechWorks Incorporation",
    logo: "T",
    logoBg: "bg-yellow-400",
    rating: 4,
    employees: "1,235",
    jobsOpen: 8,
  },
  {
    id: 2,
    number: "02.",
    name: "Bright Future Solutions",
    logo: "B",
    logoBg: "bg-orange-400",
    rating: 5,
    employees: "3,567",
    jobsOpen: 20,
  },
  {
    id: 3,
    number: "03.",
    name: "SkyView Enterprises",
    logo: "S",
    logoBg: "bg-blue-400",
    rating: 4,
    employees: "7,824",
    jobsOpen: 14,
  },
];

const TopCompanies = () => {
  return (
    <section className="py-16 bg-white dark:bg-[#071A19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE - Company List */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Top Companies
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md">
              Explore and find the dream job opportunities with our best companies.
            </p>

            <div className="mt-10 space-y-5">
              {companies.map((company) => (
                <div key={company.id} className="flex items-center gap-5">
                  {/* Number */}
                  <span className="text-3xl font-bold text-teal-500 w-12 shrink-0">
                    {company.number}
                  </span>

                  {/* Card */}
                  <div className="flex-1 bg-white dark:bg-[#0F2A28] rounded-2xl border border-gray-100 dark:border-teal-900/40 shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                    {/* Logo */}
                    <div
                      className={`w-11 h-11 rounded-xl ${company.logoBg} text-white font-bold flex items-center justify-center shrink-0`}
                    >
                      {company.logo}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                        {company.name}
                      </h3>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-xs ${
                              i < company.rating
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaUser className="text-[10px]" />
                          {company.employees} employees
                        </span>
                        <span className="text-teal-600 font-medium">
                          {company.jobsOpen} jobs open
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/companies"
              className="inline-block mt-8 text-sm font-semibold text-gray-800 dark:text-white underline underline-offset-4 hover:text-teal-600 transition-colors"
            >
              View All Top Companies
            </Link>
          </div>

          {/* RIGHT SIDE - CTA Card */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-teal-50 to-emerald-100 dark:from-[#0A2A28] dark:to-[#0D3D38] p-8 md:p-10 min-h-[420px] flex flex-col justify-center">

              {/* Decorative circles */}
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-teal-200/40 dark:bg-teal-700/20" />
              <div className="absolute -right-5 bottom-10 w-28 h-28 rounded-full bg-emerald-200/40 dark:bg-emerald-700/20" />

              <div className="relative z-10 max-w-sm">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug">
                  Ready to take the next step in your dream career with us?
                </h3>

                <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Join JobConnect today and start exploring exciting job
                  opportunities with top companies.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/about"
                    className="border border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
                  >
                    Learn More
                  </Link>
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