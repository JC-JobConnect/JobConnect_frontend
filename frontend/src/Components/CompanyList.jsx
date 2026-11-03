import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jobsApi from "../Api/api/JobApi.js";
import {
  FiMapPin,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiCreditCard,
  FiUsers,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

function Companies() {
  // Store companies received from Django
  const [companiesData, setCompaniesData] = useState([]);

  // Track expanded company
  const [openCompany, setOpenCompany] = useState(null);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Frontend pagination
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 5;

  // Fetch companies from Django API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await jobsApi.get("v1/companies/");

        setCompaniesData(response.data);
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("Unable to load companies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Expand or collapse company
  const toggleCompany = (id) => {
    setOpenCompany(openCompany === id ? null : id);
  };

  // Pagination calculations
  const totalPages = Math.ceil(companiesData.length / companiesPerPage);

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;

  const currentCompanies = companiesData.slice(
    indexOfFirstCompany,
    indexOfLastCompany,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setOpenCompany(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Format job posting date
  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString();
  };

  // Format salary
  const formatSalary = (salary) => {
    if (!salary) return "Salary not specified";

    return `৳${Number(salary).toLocaleString("en-BD")}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#071A19] font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Companies
        </h1>

        <p className="mt-1 text-gray-500 dark:text-slate-400">
          Expand any company to see their open positions.
        </p>
      </section>

      {/* Companies List */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        {/* Loading */}
        {loading && (
          <p className="text-center py-10 text-gray-500 dark:text-slate-400">
            Loading companies...
          </p>
        )}

        {/* Error */}
        {error && <p className="text-center py-10 text-red-500">{error}</p>}

        {/* Empty State */}
        {!loading && !error && companiesData.length === 0 && (
          <p className="text-center py-10 text-gray-500 dark:text-slate-400">
            No companies available at the moment.
          </p>
        )}

        {/* Company Cards */}
        {!loading && !error && companiesData.length > 0 && (
          <>
            <div className="space-y-4">
              {currentCompanies.map((company) => {
                const isOpen = openCompany === company.id;

                return (
                  <div
                    key={company.id}
                    className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:border-teal-200 hover:shadow-md dark:border-slate-700/70 dark:bg-[#0B2221] dark:hover:border-teal-800 ${
                      isOpen
                        ? "shadow-md dark:border-teal-500/40"
                        : "hover:shadow-sm"
                    }`}
                  >
                    {/* Card Header */}
                    <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {/* Company Logo */}
                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#123836] flex items-center justify-center shrink-0 overflow-hidden">
                          {company.logo ? (
                            <img
                              src={
                                company.logo.startsWith("http")
                                  ? company.logo
                                  : `http://127.0.0.1:8000${company.logo.startsWith("/") ? "" : "/"}${company.logo}`
                              }
                              alt={`${company.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FiBriefcase className="w-6 h-6 text-teal-600" />
                          )}
                        </div>

                        {/* Company Information */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {company.name}
                          </h3>

                          <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
                            {company.bio || "No company description available."}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <FiMapPin className="w-3.5 h-3.5 text-teal-500" />
                              {company.location}
                            </span>

                            <span className="flex items-center gap-1">
                              <FiUsers className="w-3.5 h-3.5 text-teal-500" />
                              {company.vacancy} open positions
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Expand Button */}
                      <button
                        onClick={() => toggleCompany(company.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                          isOpen
                            ? "bg-teal-600 text-white"
                            : "bg-gray-100 dark:bg-[#123836] text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-[#1a4542]"
                        }`}
                      >
                        {isOpen ? "Hide Jobs" : "View Jobs"}

                        {isOpen ? (
                          <FiChevronUp className="w-4 h-4" />
                        ) : (
                          <FiChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Expanded Jobs */}
                    {isOpen && (
                      <div className="border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-[#071A19]/60 px-5 py-5">
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-slate-400 mb-4 uppercase tracking-wide">
                          Open Positions ({company.jobs?.length || 0})
                        </h4>

                        {/* No Jobs */}
                        {!company.jobs || company.jobs.length === 0 ? (
                          <p className="text-sm text-gray-500 dark:text-slate-400">
                            No open positions currently.
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {company.jobs.map((job) => (
                              <div
                                key={job.id}
                                className="bg-white dark:bg-[#0d2a28] border border-gray-100 dark:border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                              >
                                <div>
                                  <h5 className="font-semibold text-gray-900 dark:text-white">
                                    {job.title}
                                  </h5>

                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-gray-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1">
                                      <FiMapPin className="w-3.5 h-3.5 text-teal-500" />
                                      {job.location}
                                    </span>

                                    <span className="flex items-center gap-1">
                                      <FiCreditCard className="w-3.5 h-3.5 text-teal-500" />
                                      {formatSalary(job.salary)}
                                    </span>

                                    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-slate-500">
                                      <FiClock className="w-3.5 h-3.5" />
                                      {formatDate(job.created_at)}
                                    </span>
                                  </div>
                                </div>

                                <Link
                                  to={`/job-details/${job.id}`}
                                  className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2 rounded-lg transition whitespace-nowrap text-center"
                                >
                                  View Job Details
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-[#123836]"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-teal-600 text-white"
                        : "border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-[#123836]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-[#123836]"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-teal-50 to-emerald-100 dark:from-[#0A2A28] dark:to-[#0D3D38] p-10 md:p-14 text-center">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-teal-200/40 dark:bg-teal-700/20" />

          <div className="absolute -left-8 bottom-6 w-28 h-28 rounded-full bg-emerald-200/40 dark:bg-emerald-700/20" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug">
              Ready to take the next step in your dream career with us?
            </h3>

            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-xl mx-auto">
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
