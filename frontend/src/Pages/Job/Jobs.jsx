import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiGrid, FiList } from "react-icons/fi";
import JobsFilter from "../../Components/Jobs/JobsFilter";
import PageHero from "../../Components/Common/PageHero";
import JobsCard from "../../Components/Jobs/JobsCard";
import jobsApi from "../../Services/JobApi";

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const [jobType, setJobType] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState("all");
  const [viewMode, setViewMode] = useState("list");

  const [filters, setFilters] = useState({
    categories: [],
    locations: [],
    experience: [],
    minSalary: "",
    maxSalary: "",
  });

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const jobsPerPage = 5;

  // Read from URL (Homepage search)
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    const locationFromUrl = searchParams.get("location") || "";
    const categoryFromUrl = searchParams.get("category") || "";

    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
      setSearchQuery(searchFromUrl);
    }

    if (locationFromUrl) {
      setFilters((prev) => ({
        ...prev,
        locations: [locationFromUrl],
      }));
    }

    if (categoryFromUrl && !searchFromUrl) {
      setSearchTerm(categoryFromUrl);
      setSearchQuery(categoryFromUrl);
    }
  }, [searchParams]);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await jobsApi.get("v1/jobs/", {
          params: {
            search: searchQuery || undefined,
            location: filters.locations[0] || undefined,
            category:
              filters.categories.length === 1
                ? filters.categories[0]
                : undefined,
            min_salary: filters.minSalary || undefined,
            max_salary: filters.maxSalary || undefined,
          },
        });

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        setJobsData(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(
          err.response?.data?.detail ||
          "Failed to load jobs. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters, searchQuery]);

  const filteredJobs = jobsData
    .filter((job) => {
      const matchesFeatured =
        active !== "featured" || job.is_featured === true;

      const matchesLocation =
        filters.locations.length === 0 ||
        filters.locations.some((loc) =>
          job.location?.toLowerCase().includes(loc.toLowerCase())
        );

      const matchesExperience =
        filters.experience.length === 0 ||
        filters.experience.includes(job.experience_level);

      const matchesJobType =
        !jobType || job.job_type === jobType;

      return (
        matchesFeatured &&
        matchesLocation &&
        matchesExperience &&
        matchesJobType
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      if (sortBy === "oldest") {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      if (sortBy === "salary") {
        return (b.salary || 0) - (a.salary || 0);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage) || 1;
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const handleToggle = (value) => {
    setActive(value);
    setCurrentPage(1);
  };

  const featuredCount = jobsData.filter((job) => job.is_featured === true).length;

  const clearAllFilters = () => {
    setSearchTerm("");
    setSearchQuery("");
    setFilters({
      categories: [],
      locations: [],
      experience: [],
      minSalary: "",
      maxSalary: "",
    });
    setCurrentPage(1);
  };

  return (
    <section>
      <PageHero title="Jobs" />

      <div className="min-h-screen bg-white dark:bg-[#071A19] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
            <div className="inline-flex items-center bg-gray-100 dark:bg-[#0F2A28] rounded-full p-1 shrink-0">
              <button
                onClick={() => handleToggle("all")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${active === "all"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                  }`}
              >
                All Jobs <span>{jobsData.length}</span>
              </button>

              <button
                onClick={() => handleToggle("featured")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${active === "featured"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                  }`}
              >
                Featured Jobs <span>{featuredCount}</span>
              </button>
            </div>

            <div className="flex flex-1 gap-3">
              <div className="flex-1 flex items-center gap-2 bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 rounded-full px-4 py-3 shadow-sm">
                <CiSearch className="text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
                />
              </div>

              <button
                onClick={() => {
                  setCurrentPage(1);
                  setSearchQuery(searchTerm);
                }}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm shrink-0 cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          {/* ✅ Active Filters Chips */}
          {(searchQuery || filters.locations.length > 0 || filters.categories.length > 0) && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Active filters:
              </span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 px-3 py-1.5 rounded-full text-sm font-medium">
                  Search: {searchQuery}
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSearchQuery("");
                    }}
                    className="ml-1 hover:text-teal-900 dark:hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}

              {filters.locations.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  Location: {loc}
                  <button
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        locations: prev.locations.filter((l) => l !== loc),
                      }))
                    }
                    className="ml-1 hover:text-blue-900 dark:hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}

              {filters.categories.length > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 px-3 py-1.5 rounded-full text-sm font-medium">
                  Category selected
                  <button
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        categories: [],
                      }))
                    }
                    className="ml-1 hover:text-purple-900 dark:hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-sm text-red-500 hover:text-red-600 font-medium ml-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            <JobsFilter
              onFilterChange={handleFilterChange}
              jobsData={jobsData}
              initialLocations={filters.locations} // pass initial location
            />

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  {/* Job Type Filter */}
                  <select
                    value={jobType}
                    onChange={(e) => {
                      setJobType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
                  >
                    <option value="">All Types</option>
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="remote">Remote</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>

                  {/* Sort Filter */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
                  >
                    <option value="newest">Sort: Newest</option>
                    <option value="oldest">Sort: Oldest</option>
                    <option value="salary">Sort: Salary</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ${viewMode === "grid"
                      ? "bg-teal-500 text-white"
                      : "bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 text-gray-500"
                      }`}
                  >
                    <FiGrid />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ${viewMode === "list"
                      ? "bg-teal-500 text-white"
                      : "bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 text-gray-500"
                      }`}
                  >
                    <FiList />
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-16 text-gray-500">Loading jobs...</div>
              ) : error ? (
                <div className="text-center py-16 text-red-500">{error}</div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Showing {filteredJobs.length === 0 ? 0 : startIndex + 1}–
                    {Math.min(startIndex + jobsPerPage, filteredJobs.length)} of{" "}
                    {filteredJobs.length} jobs
                  </p>

                  {currentJobs.length > 0 ? (
                    <JobsCard jobs={currentJobs} viewMode={viewMode} />
                  ) : (
                    <div className="text-center py-16 text-gray-500">No jobs found.</div>
                  )}

                  {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-full border text-sm disabled:opacity-40"
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-full text-sm font-medium ${currentPage === page
                            ? "bg-teal-500 text-white"
                            : "border text-gray-600"
                            }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-full border text-sm disabled:opacity-40"
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