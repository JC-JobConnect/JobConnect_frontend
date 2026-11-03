import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FiGrid, FiList } from "react-icons/fi";
import JobsFilter from "../Components/JobsFilter";
import PageHero from "../Components/PageHero";
import JobsCard from "../Components/JobsCard";
import jobsApi from "../Api/api/JobApi";

const Jobs = () => {
  // API data
  const [jobsData, setJobsData] = useState([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Existing pagination and toggle states
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState("all");

  const jobsPerPage = 5;

  // 1. Fetch jobs from Django API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await jobsApi.get("v1/jobs/");

        // Supports both normal lists and paginated DRF responses
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        setJobsData(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);

        setError(
          err.response?.data?.detail ||
            "Failed to load jobs. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 2. Filter featured jobs
  const filteredJobs =
    active === "featured"
      ? jobsData.filter((job) => job.is_featured === true)
      : jobsData;

  // 3. Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage) || 1;

  const startIndex = (currentPage - 1) * jobsPerPage;

  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  // 4. Toggle between all and featured jobs
  const handleToggle = (value) => {
    setActive(value);
    setCurrentPage(1);
  };

  // 5. Calculate featured jobs count from API data
  const featuredCount = jobsData.filter(
    (job) => job.is_featured === true,
  ).length;

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

              {/* Loading State */}
              {loading ? (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                  Loading jobs...
                </div>
              ) : error ? (
                /* Error State */
                <div className="text-center py-16 text-red-500">{error}</div>
              ) : (
                <>
                  {/* Job Count */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Showing {filteredJobs.length === 0 ? 0 : startIndex + 1}–
                    {Math.min(startIndex + jobsPerPage, filteredJobs.length)} of{" "}
                    {filteredJobs.length} jobs
                  </p>

                  {/* Job Cards */}
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
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
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
                        ),
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
