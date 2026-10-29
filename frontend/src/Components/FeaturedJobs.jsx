import { Link } from "react-router-dom";
import { useState } from "react";
import {
  LuBookmark,
  LuMapPin,
  LuClock3,
  LuArrowUpRight,
  LuDollarSign,
} from "react-icons/lu";

// Temporary sample data
// Later,can be replaced with data from Django API.
const featuredJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Technovar",
    logo: null,
    location: "Dhaka, Bangladesh",
    jobType: "Full Time",
    workMode: "Remote",
    salary: "$2,000 - 3,000",
    postedAt: "1 week ago",
    tags: ["Web Design", "SEO", "Web Development"],
    slug: "frontend-developer",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Technovar",
    logo: null,
    location: "Dhaka, Bangladesh",
    jobType: "Full Time",
    workMode: "Remote",
    salary: "$2,000 - 3,000",
    postedAt: "1 week ago",
    tags: ["Web Design", "SEO", "Web Development"],
    slug: "frontend-developer-2",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Technovar",
    logo: null,
    location: "Dhaka, Bangladesh",
    jobType: "Full Time",
    workMode: "Remote",
    salary: "$2,000 - 3,000",
    postedAt: "1 week ago",
    tags: ["Web Design", "SEO", "Web Development"],
    slug: "frontend-developer-3",
  },
];

const FeaturedJobs = ({
  jobs = featuredJobs,
  title = "Featured Jobs",
  subtitle = "Hand-picked opportunities from top companies",
  viewAllLink = "/jobs",
}) => {
  const [savedJobs, setSavedJobs] = useState([]);

  const toggleBookmark = (jobId) => {
    setSavedJobs((previous) =>
      previous.includes(jobId)
        ? previous.filter((id) => id !== jobId)
        : [...previous, jobId]
    );
  };

  return (
    <section className="bg-white py-16 dark:bg-[#071A19] sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
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

        {/* Job Cards */}
        <div className="space-y-4 cursor-pointer">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <article
                key={job.id}
                className="group relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5 dark:border-white/10 dark:bg-[#0B2422] dark:hover:border-teal-700 sm:p-5"
              >
                {/* Top Row */}
                <div className="flex items-start gap-3 sm:gap-4">

                  {/* Company Logo */}
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
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Job Information */}
                  <div className="min-w-0 flex-1">

                    {/* Title and Company */}
                    <Link
                      to={`/jobs/${job.slug}`}
                      className="inline-block text-base font-bold text-slate-900 transition-colors hover:text-teal-600 dark:text-slate-100 dark:hover:text-teal-400 sm:text-lg"
                    >
                      {job.title}
                    </Link>

                    <p className="mt-0.5 text-sm font-medium text-teal-700 dark:text-teal-400">
                      {job.company}
                    </p>

                    {/* Job Details */}
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

                    {/* Skill Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300 sm:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={() => toggleBookmark(job.id)}
                    aria-label={
                      savedJobs.includes(job.id)
                        ? "Remove saved job"
                        : "Save job"
                    }
                    aria-pressed={savedJobs.includes(job.id)}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                      savedJobs.includes(job.id)
                        ? "bg-teal-50 text-teal-600 dark:bg-teal-900/40 dark:text-teal-300"
                        : "text-slate-400 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/30 dark:hover:text-teal-300"
                    }`}
                  >
                    <LuBookmark
                      className="h-5 w-5"
                      fill={
                        savedJobs.includes(job.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>

                {/* View Job Indicator */}
                <Link
                  to={`/jobs/${job.slug}`}
                  aria-label={`View ${job.title} at ${job.company}`}
                  className="absolute bottom-4 right-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-all duration-200 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/40 dark:hover:text-teal-300 sm:bottom-5 sm:right-5"
                >
                  <LuArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
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
      </div>
    </section>
  );
};

export default FeaturedJobs;