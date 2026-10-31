import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiGrid, FiList } from "react-icons/fi";
import JobsFilter from "../Components/JobsFilter";
import PageHero from "../Components/PageHero";
import JobsCard from "../Components/JobsCard";

const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechFlow Ltd.",
    logo: "F",
    logoColor: "bg-gray-900",
    featured: true,
    type: "Full Time",
    location: "Dhaka",
    experience: "1-3 Years",
    salary: "৳40,000 - ৳70,000",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "NextGen Solutions",
    logo: "N",
    logoColor: "bg-blue-600",
    featured: false,
    type: "Full Time",
    location: "Remote",
    experience: "2-5 Years",
    salary: "৳60,000 - ৳90,000",
    posted: "3 days ago",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Minds",
    logo: "C",
    logoColor: "bg-lime-500",
    featured: false,
    type: "Full Time",
    location: "Dhaka",
    experience: "1-3 Years",
    salary: "৳35,000 - ৳60,000",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "Cloudify",
    logo: "B",
    logoColor: "bg-purple-600",
    featured: true,
    type: "Full Time",
    location: "Chittagong",
    experience: "2-4 Years",
    salary: "৳55,000 - ৳85,000",
    posted: "1 day ago",
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "Cloudify",
    logo: "B",
    logoColor: "bg-purple-600",
    featured: true,
    type: "Full Time",
    location: "Chittagong",
    experience: "2-4 Years",
    salary: "৳55,000 - ৳85,000",
    posted: "1 day ago",
  },
  {
    id: 6,
    title: "Backend Engineer",
    company: "Cloudify",
    logo: "B",
    logoColor: "bg-purple-600",
    featured: true,
    type: "Full Time",
    location: "Chittagong",
    experience: "2-4 Years",
    salary: "৳55,000 - ৳85,000",
    posted: "1 day ago",
  },
];

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState("all"); 
  const jobsPerPage = 5;


  const filteredJobs =
    active === "featured"
      ? jobsData.filter((job) => job.featured === true)
      : jobsData;

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage) || 1;
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const handleToggle = (value) => {
    setActive(value);
    setCurrentPage(1); 
  };

  const featuredCount = jobsData.filter((j) => j.featured).length;

  return (
    <section>
      <PageHero title="Jobs" />

      <div className="min-h-screen bg-white dark:bg-[#071A19] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Row: Toggle + Search */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
            <div className="inline-flex items-center bg-gray-100 dark:bg-[#0F2A28] rounded-full p-1 shrink-0">
              <button
                onClick={() => handleToggle("all")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  active === "all"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                }`}
              >
                All Jobs
                <span>{jobsData.length}</span>
              </button>

              <button
                onClick={() => handleToggle("featured")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  active === "featured"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                }`}
              >
                Featured Jobs
                <span>{featuredCount}</span>
              </button>
            </div>

            <div className="flex flex-1 gap-3">
              <div className="flex-1 flex items-center gap-2 bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 rounded-full px-4 py-3 shadow-sm">
                <CiSearch className="text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or categories..."
                  className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
                />
              </div>
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm shrink-0 cursor-pointer">
                Search
              </button>
            </div>
          </div>

          {/* Bottom Row: Sidebar + Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            <JobsFilter />

            <div className="flex-1">
              {/* Sort Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <select className="bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none">
                    <option>All Types</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Remote</option>
                  </select>
                  <select className="bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none">
                    <option>Sort: Newest</option>
                    <option>Sort: Oldest</option>
                    <option>Sort: Salary</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded-full bg-teal-500 text-white flex items-center justify-center cursor-pointer">
                    <FiGrid />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 text-gray-500 flex items-center justify-center cursor-pointer">
                    <FiList />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Showing{" "}
                {filteredJobs.length === 0 ? 0 : startIndex + 1}–
                {Math.min(startIndex + jobsPerPage, filteredJobs.length)} of{" "}
                {filteredJobs.length} jobs
              </p>

              {/* Cards */}
              {currentJobs.length > 0 ? (
                <JobsCard jobs={currentJobs} />
              ) : (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                  No jobs found.
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full border border-gray-200 dark:border-teal-900/40 text-sm text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition cursor-pointer"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition cursor-pointer ${
                          currentPage === page
                            ? "bg-teal-500 text-white"
                            : "border border-gray-200 dark:border-teal-900/40 text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/30"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-full border border-gray-200 dark:border-teal-900/40 text-sm text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;