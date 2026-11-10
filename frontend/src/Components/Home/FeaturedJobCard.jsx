import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LuMapPin,
  LuClock3,
  LuArrowUpRight,
  LuDollarSign,
} from "react-icons/lu";
import jobsApi from "../../Services/JobApi";

const FeaturedJobCard = ({
  title = "Featured Jobs",
  subtitle = "Hand-picked opportunities from top companies",
  viewAllLink = "/jobs",
  limit = 3,
}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await jobsApi.get("/v1/jobs/", {
          params: {
            is_featured: true,
            ordering: "-created_at",
          },
        });

        // Handle both paginated and non-paginated responses
        const results = data.results || data;

        // Limit on frontend
        const limited = results.slice(0, limit);

        // Map API response → component shape
        const mapped = limited.map((job) => ({
          id: job.id,
          title: job.title,
          company: job.company_name,
          logo: job.company_logo,
          location: job.location,
          jobType: formatJobType(job.job_type),
          workMode: formatWorkMode(job.work_mode),
          salary: formatSalary(job.salary),
          postedAt: formatRelativeTime(job.created_at),
        }));

        setJobs(mapped);
      } catch (err) {
        console.error("Failed to load featured jobs:", err);
        setError("Failed to load featured jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, [limit]);

  // ---------- Helpers ----------
  const formatJobType = (type) => {
    const map = {
      full_time: "Full Time",
      part_time: "Part Time",
      remote: "Remote",
      internship: "Internship",
      contract: "Contract",
    };
    return map[type] || type;
  };

  const formatWorkMode = (mode) => {
    const map = {
      onsite: "On-site",
      remote: "Remote",
      hybrid: "Hybrid",
    };
    return map[mode] || mode;
  };

  const formatSalary = (salary) => {
    if (!salary) return "Negotiable";
    return `$${Number(salary).toLocaleString()}`;
  };

  const formatRelativeTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30)
      return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? "s" : ""
        } ago`;
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? "s" : ""
      } ago`;
  };

  return (
    <section className="bg-white py-16 dark:bg-[#071A19] sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              {subtitle}
            </p>
          </div>
          <Link
            to={viewAllLink}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 sm:text-base"
          >
            View all
            <LuArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center dark:border-red-900/40 dark:bg-red-900/20">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Jobs */}
        {!loading && !error && (
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/job_details/${job.id}`}
                  className="block"
                >
                  <article className="group relative cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5 dark:border-white/10 dark:bg-[#0B2422] dark:hover:border-teal-700 sm:p-5">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Logo */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-teal-100 bg-teal-50 dark:border-teal-800/60 dark:bg-teal-900/30 sm:h-12 sm:w-12">
                        {job.logo ? (
                          <img
                            src={job.logo}
                            alt={`${job.company} logo`}
                            className="h-full w-full object-contain p-1.5"
                          />
                        ) : (
                          <span className="text-sm font-bold text-teal-700 dark:text-teal-300">
                            {job.company
                              ?.split(" ")
                              .map((w) => w[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-teal-600 dark:text-slate-100 dark:group-hover:text-teal-400 sm:text-lg">
                          {job.title}
                        </h3>

                        <p className="mt-0.5 text-sm font-medium text-teal-700 dark:text-teal-400">
                          {job.company}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                          <span className="inline-flex items-center gap-1.5">
                            <LuMapPin className="h-3.5 w-3.5 shrink-0" />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <LuClock3 className="h-3.5 w-3.5 shrink-0" />
                            {job.jobType}
                            {job.workMode ? ` · ${job.workMode}` : ""}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <LuDollarSign className="h-3.5 w-3.5 shrink-0" />
                            {job.salary}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <LuClock3 className="h-3.5 w-3.5 shrink-0" />
                            {job.postedAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute bottom-4 right-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-all duration-200 group-hover:bg-teal-50 group-hover:text-teal-600 dark:group-hover:bg-teal-900/40 dark:group-hover:text-teal-300 sm:bottom-5 sm:right-5">
                      <LuArrowUpRight className="h-4 w-4" />
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              /* Empty State */
              <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-white/10">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  No featured jobs yet
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Check back soon for new career opportunities.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobCard;