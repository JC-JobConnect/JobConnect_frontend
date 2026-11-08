import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiTag,
} from "react-icons/fi";
import jobsApi from "../../Api/api/JobApi";

export default function TopCompanyView() {
  const { companyId } = useParams();

  const [jobs, setJobs] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch all jobs from backend
        const response = await jobsApi.get("v1/jobs/");

        console.log("Company ID from URL:", companyId);
        console.log("API Response:", response.data);

        // Handle normal and paginated DRF responses
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        // Filter jobs by company ID
        const filteredJobs = data.filter((job) => {
          const jobCompanyId =
            typeof job.company === "object" ? job.company?.id : job.company;

          return Number(jobCompanyId) === Number(companyId);
        });

        console.log("Filtered Jobs:", filteredJobs);

        setJobs(filteredJobs);

        // Get company name
        if (filteredJobs.length > 0) {
          setCompanyName(
            filteredJobs[0].company_name ||
              filteredJobs[0].company?.name ||
              "Company",
          );
        } else {
          setCompanyName("Company");
        }
      } catch (err) {
        console.error("Error fetching company jobs:", err);

        setError(
          err.response?.data?.detail ||
            "Unable to load positions for this company. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyJobs();
    }
  }, [companyId]);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white dark:bg-[#071A19]">
        <p className="text-gray-500 dark:text-gray-300">
          Loading open positions...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white px-6 dark:bg-[#071A19]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Oops! Something went wrong
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">{error}</p>

          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
          >
            <FiArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-900 transition-colors duration-300 dark:bg-[#071A19] dark:text-gray-100">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
          >
            <FiArrowLeft /> Back to Companies
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8 border-b border-slate-200 pb-6 dark:border-teal-900/60">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {companyName
              ? `${companyName} Open Positions`
              : "Company Positions"}
          </h1>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            {jobs.length} open position{jobs.length !== 1 && "s"} available at
            this moment.
          </p>
        </div>

        {/* Jobs List / Empty State */}
        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-teal-900/60 dark:bg-[#0B2421]">
            <FiBriefcase className="mx-auto h-12 w-12 text-slate-400 dark:text-teal-500" />

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              No open positions
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              This company doesn't have any active job listings right now. Check
              back later!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => {
              const formattedSalary = job.salary
                ? `৳${Number(job.salary).toLocaleString("en-BD")}`
                : "Negotiable";

              return (
                <div
                  key={job.id}
                  className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition duration-200 hover:shadow-md dark:border-teal-900/60 dark:bg-[#0B2421] sm:flex-row sm:items-center"
                >
                  <div className="space-y-3">
                    {/* Job Title */}
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {job.title}
                      </h2>

                      {job.is_featured && (
                        <span className="rounded-md bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-800 dark:bg-teal-900/80 dark:text-teal-300">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Job Information */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <FiMapPin className="text-teal-500" />
                        {job.location || "Not specified"}
                      </span>

                      <span className="flex items-center gap-1.5 capitalize">
                        <FiClock className="text-teal-500" />
                        {job.job_type
                          ? job.job_type.replace(/_/g, " ")
                          : "Full-time"}
                      </span>

                      <span className="flex items-center gap-1.5 capitalize">
                        <FiBriefcase className="text-teal-500" />
                        {job.work_mode || "Onsite"}
                      </span>

                      {job.category_name && (
                        <span className="flex items-center gap-1.5">
                          <FiTag className="text-teal-500" />
                          {job.category_name}
                        </span>
                      )}

                      <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                        <FiDollarSign className="text-teal-500" />
                        {formattedSalary}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/job_details/${job.id}`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3 font-semibold text-white shadow-md shadow-teal-500/20 transition duration-200 hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500/30"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
