import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiBookmark,
  FiArrowUpRight,
  FiBriefcase,
} from "react-icons/fi";

const sampleJobs = [
  {
    id: 1,
    company: "LIVENZA GROUP",
    title: "Assistant to Admin Manager (Male)",
    location: "Uttara, Dhaka, Bangladesh",
    postedAt: "36m ago",
    date: "Oct 04, 2026",
    employmentType: "Full Time",
    workplace: "Work From Office",
    salary: "Negotiable",
    logo: "",
    slug: "assistant-to-admin-manager",
  },
  {
    id: 2,
    company: "TechNova",
    title: "Frontend Developer",
    location: "Banani, Dhaka, Bangladesh",
    postedAt: "1h ago",
    date: "Oct 04, 2026",
    employmentType: "Full Time",
    workplace: "Hybrid",
    salary: "৳40,000 - ৳60,000",
    logo: "",
    slug: "frontend-developer",
  },
  {
    id: 3,
    company: "Creative Labs",
    title: "UI/UX Designer",
    location: "Mirpur, Dhaka, Bangladesh",
    postedAt: "2h ago",
    date: "Oct 03, 2026",
    employmentType: "Part Time",
    workplace: "Remote",
    salary: "Negotiable",
    logo: "",
    slug: "ui-ux-designer",
  },
  {
    id: 4,
    company: "NextGen Technologies",
    title: "Backend Developer",
    location: "Gulshan, Dhaka, Bangladesh",
    postedAt: "3h ago",
    date: "Oct 03, 2026",
    employmentType: "Full Time",
    workplace: "Work From Office",
    salary: "৳50,000 - ৳80,000",
    logo: "",
    slug: "backend-developer",
  },
];

function JobCard({ job, isSaved, onToggleSave }) {
  return (
    <article className="group relative flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-900/5 dark:border-white/10 dark:bg-[#0B2422] dark:hover:border-teal-700 cursor-pointer sm:p-5">
      {/* Top: Company and Job Title */}
      <div className="flex items-start  gap-3">
        {/* Company Logo */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 text-teal-600 dark:border-white/10 dark:bg-[#12312D] dark:text-teal-400">
          {job.logo ? (
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="h-full w-full object-contain p-1"
            />
          ) : (
            <FiBriefcase className="text-xl" />
          )}
        </div>

        {/* Job Information */}
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="truncate text-xs font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
              {job.company}
            </span>

            <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
              <FiClock className="shrink-0" />
              {job.postedAt}
            </span>
          </div>

          <h3 className="mt-1.5 line-clamp-2 text-sm font-bold leading-5 text-slate-900 transition-colors group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-400 sm:text-base">
            <Link
              to={`/jobs/${job.slug || job.id}`}
              className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              {job.title}
            </Link>
          </h3>
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={() => onToggleSave(job.id)}
          aria-label={
            isSaved ? "Remove saved job" : "Save job"
          }
          aria-pressed={isSaved}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
            isSaved
              ? "bg-teal-50 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400"
              : "text-slate-400 hover:bg-teal-50 hover:text-teal-600 dark:text-slate-400 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
          }`}
        >
          <FiBookmark
            className={`text-xl ${isSaved ? "fill-current" : ""}`}
          />
        </button>
      </div>

      {/* Job Details */}
      <div className="mt-5 space-y-2.5">
        {/* Location */}
        <div className="flex min-w-0 items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <FiMapPin className="shrink-0 text-base text-teal-600 dark:text-teal-400" />

          <span className="truncate">{job.location}</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <FiCalendar className="shrink-0 text-base text-teal-600 dark:text-teal-400" />

          <span>{job.date}</span>
        </div>
      </div>

      {/* Employment Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 dark:border-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
          {job.employmentType}
        </span>

        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          {job.workplace}
        </span>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-slate-200 dark:border-white/10" />

      {/* Salary and Details Button */}
      <div className="mt-auto flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Salary
          </p>

          <p className="mt-1 wrap-break-word text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
            {job.salary || "Negotiable"}
          </p>
        </div>

        <Link
          to={`/jobs/${job.slug || job.id}`}
          aria-label={`View ${job.title} details`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all duration-300 hover:border-teal-500 hover:bg-teal-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-white/10 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:bg-teal-500 dark:hover:text-[#071A19]"
        >
          <FiArrowUpRight className="text-xl transition-transform duration-300 group-hover:rotate-45" />
        </Link>
      </div>
    </article>
  );
}

export default function FeaturedJobs({
  jobs = sampleJobs,
  title = "Latest Jobs",
  subtitle = "Fresh opportunities from employers hiring right now",
  limit = 4,
}) {
  const [savedJobs, setSavedJobs] = useState([]);

  const visibleJobs = jobs.slice(0, limit);

  const toggleSaveJob = (jobId) => {
    setSavedJobs((previous) =>
      previous.includes(jobId)
        ? previous.filter((id) => id !== jobId)
        : [...previous, jobId]
    );
  };

  return (
    <section
      id="featured-jobs"
      className="bg-white py-16 transition-colors duration-300 dark:bg-[#071A19] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
              Career opportunities
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {title}
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
              {subtitle}
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700 dark:border-white/10 dark:text-slate-200 dark:hover:border-teal-700 dark:hover:bg-teal-900/30 dark:hover:text-teal-300"
          >
            View all jobs
            <FiArrowUpRight className="text-lg text-teal-600 dark:text-teal-400" />
          </Link>
        </div>

        {/* Jobs Grid */}
        {visibleJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            {visibleJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.includes(job.id)}
                onToggleSave={toggleSaveJob}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center dark:border-white/15">
            <FiBriefcase className="mx-auto text-4xl text-teal-500" />

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              No jobs available yet
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Check back soon for new career opportunities.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}