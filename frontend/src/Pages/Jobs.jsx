import { useState, useEffect, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { FiGrid, FiList } from "react-icons/fi";

import JobsFilter from "../Components/JobsFilter";
import PageHero from "../Components/PageHero";
import JobsCard from "../Components/JobsCard";
import jobsApi from "../Api/api/JobApi";

const Jobs = () => {
  // API data
  const [jobsData, setJobsData] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Sidebar filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);

  // Top dropdown filters
  const [selectedJobType, setSelectedJobType] = useState("");
  const [ordering, setOrdering] = useState("-created_at");

  // Page controls
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState("all");
  const [viewMode, setViewMode] = useState("list");

  const jobsPerPage = 5;

  // Fetch jobs whenever search, filters, or sorting changes
  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {
          search: searchQuery || undefined,
          ordering: ordering || undefined,

          category: selectedCategories[0] || undefined,
          location: selectedLocations[0] || undefined,
          experience_level: selectedExperience[0] || undefined,

          job_type: selectedJobType || undefined,
        };

        const response = await jobsApi.get("v1/jobs/", { params });

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        if (isMounted) {
          setJobsData(data);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);

        if (isMounted) {
          setError(
            err.response?.data?.detail ||
              "Failed to load jobs. Please try again.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, [
    searchQuery,
    ordering,
    selectedCategories,
    selectedLocations,
    selectedExperience,
    selectedJobType,
  ]);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedExperience([]);
    setSelectedJobType("");
    setSearchInput("");
    setSearchQuery("");
    setOrdering("-created_at");
    setCurrentPage(1);
  };

  // All jobs / Featured jobs
  const handleToggle = (value) => {
    setActive(value);
    setCurrentPage(1);
  };

  // Dynamic category options from fetched jobs
  const categories = useMemo(() => {
    const categoryMap = new Map();

    jobsData.forEach((job) => {
      if (job.category !== null && job.category !== undefined) {
        const id = job.category;
        const name = job.category_name || `Category ${id}`;

        if (!categoryMap.has(id)) {
          categoryMap.set(id, {
            id,
            name,
            count: 0,
          });
        }

        categoryMap.get(id).count += 1;
      }
    });

    return Array.from(categoryMap.values());
  }, [jobsData]);

  // Dynamic location options from fetched jobs
  const locations = useMemo(() => {
    const locationMap = new Map();

    jobsData.forEach((job) => {
      if (job.location) {
        const name = job.location;

        if (!locationMap.has(name)) {
          locationMap.set(name, {
            name,
            count: 0,
          });
        }

        locationMap.get(name).count += 1;
      }
    });

    return Array.from(locationMap.values());
  }, [jobsData]);

  // Experience levels based on your Django model
  const experienceLevels = useMemo(() => {
    const experienceMap = [
      { name: "Entry Level", value: "entry", count: 0 },
      { name: "Mid Level", value: "mid", count: 0 },
      { name: "Senior Level", value: "senior", count: 0 },
    ];

    jobsData.forEach((job) => {
      const experience = experienceMap.find(
        (item) => item.value === job.experience_level,
      );

      if (experience) {
        experience.count += 1;
      }
    });

    return experienceMap;
  }, [jobsData]);

  // Featured jobs
  const featuredCount = jobsData.filter(
    (job) => job.is_featured === true,
  ).length;

  const filteredJobs =
    active === "featured"
      ? jobsData.filter((job) => job.is_featured === true)
      : jobsData;

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage) || 1;
  const startIndex = (currentPage - 1) * jobsPerPage;

  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <section>
      <PageHero title="Jobs" />

      <div className="min-h-screen bg-white dark:bg-[#071A19] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: All Jobs / Featured Jobs + Search */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
            {/* All Jobs / Featured Jobs */}
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

            {/* Search */}
            <form onSubmit={handleSearch} className="flex flex-1 gap-3">
              <div className="flex-1 flex items-center gap-2 bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 rounded-full px-4 py-3 shadow-sm">
                <CiSearch className="text-gray-400 text-xl shrink-0" />

                <input
                  type="text"
                  placeholder="Search jobs, companies, or categories..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm shrink-0 cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Sidebar + Job Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Dynamic Filters */}
            <JobsFilter
              categories={categories}
              locations={locations}
              experienceLevels={experienceLevels}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
              selectedExperience={selectedExperience}
              setSelectedExperience={setSelectedExperience}
              clearAll={clearAllFilters}
            />

            {/* Job Listing Content */}
            <div className="flex-1">
              {/* Sorting + View Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  {/* Job Type */}
                  <select
                    value={selectedJobType}
                    onChange={(e) => {
                      setSelectedJobType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none"
                  >
                    <option value="">All Types</option>
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="remote">Remote</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                  </select>

                  {/* Sorting */}
                  <select
                    value={ordering}
                    onChange={(e) => {
                      setOrdering(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 outline-none"
                  >
                    <option value="-created_at">Sort: Newest</option>
                    <option value="created_at">Sort: Oldest</option>
                    <option value="-salary">Salary: High to Low</option>
                    <option value="salary">Salary: Low to High</option>
                  </select>
                </div>

                {/* Grid / List Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                      viewMode === "grid"
                        ? "bg-teal-500 text-white"
                        : "bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 text-gray-500 hover:text-teal-600"
                    }`}
                  >
                    <FiGrid />
                  </button>

                  <button
                    onClick={() => setViewMode("list")}
                    className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                      viewMode === "list"
                        ? "bg-teal-500 text-white"
                        : "bg-white dark:bg-[#0F2A28] border border-gray-200 dark:border-teal-900/40 text-gray-500 hover:text-teal-600"
                    }`}
                  >
                    <FiList />
                  </button>
                </div>
              </div>

              {/* Loading / Error / Content */}
              {loading ? (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                  Loading jobs...
                </div>
              ) : error ? (
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
                    <JobsCard jobs={currentJobs} viewMode={viewMode} />
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
                          setCurrentPage((page) => Math.max(page - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-full border border-gray-200 dark:border-teal-900/40 text-sm text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition cursor-pointer"
                      >
                        Previous
                      </button>

                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1,
                      ).map((page) => (
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
                      ))}

                      <button
                        onClick={() =>
                          setCurrentPage((page) =>
                            Math.min(page + 1, totalPages),
                          )
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
