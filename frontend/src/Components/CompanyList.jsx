import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiCreditCard,
  FiUsers,
  FiBriefcase,
} from "react-icons/fi";

// ===== Dummy data (replace with API later) =====
const companiesData = [
  {
    id: 1,
    name: "Leffler and Sons",
    location: "Dhaka, Bangladesh",
    logo: "LS",
    vacancy: 8,
    description:
      "Leading technology solutions provider with innovative products.",
    jobs: [
      {
        id: 101,
        title: "Corporate Solutions Executive",
        type: "Full time",
        salary: "৳40,000 - ৳42,000",
        posted: "2 days ago",
      },
      {
        id: 102,
        title: "Senior Marketing Manager",
        type: "Full time",
        salary: "৳55,000 - ৳65,000",
        posted: "5 days ago",
      },
      {
        id: 103,
        title: "UI/UX Designer",
        type: "Remote",
        salary: "৳38,000 - ৳45,000",
        posted: "1 week ago",
      },
    ],
  },
  {
    id: 2,
    name: "Green Group",
    location: "Chittagong, Bangladesh",
    logo: "GG",
    vacancy: 5,
    description: "Creative agency focused on digital marketing and branding.",
    jobs: [
      {
        id: 201,
        title: "Internal Creative Coordinator",
        type: "Full time",
        salary: "৳44,000 - ৳46,000",
        posted: "1 day ago",
      },
      {
        id: 202,
        title: "Frontend Developer",
        type: "Hybrid",
        salary: "৳70,000 - ৳85,000",
        posted: "3 days ago",
      },
    ],
  },
  {
    id: 3,
    name: "VonRueden - Weber Co",
    location: "Sylhet, Bangladesh",
    logo: "VW",
    vacancy: 3,
    description: "Enterprise software and intranet solutions company.",
    jobs: [
      {
        id: 301,
        title: "District Intranet Director",
        type: "Full time",
        salary: "৳42,000 - ৳48,000",
        posted: "4 days ago",
      },
      {
        id: 302,
        title: "Backend Engineer",
        type: "Full time",
        salary: "৳75,000 - ৳90,000",
        posted: "6 days ago",
      },
    ],
  },
  {
    id: 4,
    name: "Cormier, Turner and Flatley",
    location: "Khulna, Bangladesh",
    logo: "CT",
    vacancy: 6,
    description: "Strategic consulting and corporate services firm.",
    jobs: [
      {
        id: 401,
        title: "Corporate Tactics Facilitator",
        type: "Full time",
        salary: "৳38,000 - ৳40,000",
        posted: "2 days ago",
      },
      {
        id: 402,
        title: "Product Manager",
        type: "Full time",
        salary: "৳90,000 - ৳1,10,000",
        posted: "1 week ago",
      },
    ],
  },
  {
    id: 5,
    name: "Bauch & Partners",
    location: "Rajshahi, Bangladesh",
    logo: "BP",
    vacancy: 4,
    description: "Security and risk management specialists.",
    jobs: [
      {
        id: 501,
        title: "Forward Security Director",
        type: "Full time",
        salary: "৳60,000 - ৳75,000",
        posted: "3 days ago",
      },
    ],
  },
  {
    id: 6,
    name: "Schuppe Technologies",
    location: "Barisal, Bangladesh",
    logo: "ST",
    vacancy: 7,
    description: "Modern software development and cloud solutions.",
    jobs: [
      {
        id: 601,
        title: "Cloud Architect",
        type: "Full time",
        salary: "৳80,000 - ৳95,000",
        posted: "1 day ago",
      },
      {
        id: 602,
        title: "DevOps Engineer",
        type: "Hybrid",
        salary: "৳65,000 - ৳80,000",
        posted: "4 days ago",
      },
    ],
  },
];

function Companies() {
  const [openCompany, setOpenCompany] = useState(null);

  const toggleCompany = (id) => {
    setOpenCompany(openCompany === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#071A19] font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-sm font-medium mb-4">
          Trusted Companies
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Choose The Best Company
        </h1>
        <p className="mt-3 text-gray-500 dark:text-slate-400 max-w-2xl mx-auto">
          Explore top companies and discover exciting career opportunities that
          match your skills.
        </p>
      </section>

      {/* Companies Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companiesData.map((company) => (
            <div
              key={company.id}
              className={`bg-white dark:bg-[#0d2a28] border border-gray-100 dark:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 ${
                openCompany === company.id
                  ? "shadow-lg dark:border-teal-500/60"
                  : "hover:shadow-md dark:hover:border-teal-500/40"
              }`}
            >
              {/* Card Header */}
              <button
                onClick={() => toggleCompany(company.id)}
                className="w-full p-6 text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Logo */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
                      {company.logo}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {company.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500 dark:text-slate-400">
                        <FiMapPin className="w-3.5 h-3.5 text-teal-500" />
                        {company.location}
                      </div>
                    </div>
                  </div>

                  <div className="text-teal-500 mt-1">
                    {openCompany === company.id ? (
                      <FiChevronUp className="w-5 h-5" />
                    ) : (
                      <FiChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-500 dark:text-slate-400 line-clamp-2">
                  {company.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm">
                  <FiUsers className="w-4 h-4 text-teal-500" />
                  <span className="font-medium text-teal-600 dark:text-teal-400">
                    {company.vacancy} open positions
                  </span>
                </div>
              </button>

              {/* Expandable Jobs */}
              {openCompany === company.id && (
                <div className="border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-[#071A19]/50 px-5 py-5">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-slate-400 mb-4 uppercase tracking-wide">
                    Open Positions
                  </h4>

                  <div className="space-y-3">
                    {company.jobs.map((job) => (
                      <div
                        key={job.id}
                        className="bg-white dark:bg-[#0d2a28] border border-gray-100 dark:border-slate-700 rounded-xl p-4"
                      >
                        <h5 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {job.title}
                        </h5>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <FiClock className="w-3.5 h-3.5 text-teal-500" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiCreditCard className="w-3.5 h-3.5 text-teal-500" />
                            {job.salary}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-gray-400 dark:text-slate-500">
                            {job.posted}
                          </span>
                          <Link
                            to={`/job-details/${job.id}`}
                            className="text-xs font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400"
                          >
                            View Job →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Jobs Link */}
        <div className="text-center mt-12">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:underline underline-offset-4"
          >
            <FiBriefcase className="w-4 h-4" />
            View All Jobs
          </Link>
        </div>
      </section>

      {/* CTA Section - Centered */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-[#0A2A28] dark:to-[#0D3D38] p-10 md:p-14 text-center">
          {/* Decorative circles */}
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-teal-200/40 dark:bg-teal-700/20" />
          <div className="absolute -left-8 bottom-6 w-28 h-28 rounded-full bg-emerald-200/40 dark:bg-emerald-700/20" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug">
              Ready to take the next step in your dream career with us?
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Join JobConnect today and start exploring exciting job
              opportunities with top companies.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-7 py-2.5 rounded-full text-sm transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className="border border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/30 font-semibold px-7 py-2.5 rounded-full text-sm transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Companies;
