import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiCheck, FiBriefcase, FiArrowRight } from "react-icons/fi";
import jobsApi from "../Api/api/JobApi.js";
import JobOverview from "./JobOverview";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isLoggedIn = Boolean(sessionStorage.getItem("access_token"));

  // Fetch the selected job from Django
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await jobsApi.get(`v1/jobs/${id}/`);

        const data = response.data;

        // Convert API data into the format used by this page
        const formattedJob = {
          id: data.id,
          title: data.title,

          company: data.company_name || "Company",
          companyLogo: data.company_logo || null,

          companyInitials: (data.company_name || "C")
            .substring(0, 2)
            .toUpperCase(),

          postedAt: data.created_at
            ? new Date(data.created_at).toLocaleDateString()
            : "Recently posted",

          employmentType: data.job_type,
          workMode: data.work_mode,
          category: data.category_name || "General",

          salary: data.salary
            ? `৳${Number(data.salary).toLocaleString("en-BD")}`
            : "Negotiable",

          location: data.location || "Not specified",

          description: data.description
            ? data.description.split(/\n+/).filter(Boolean)
            : [],

          responsibilities: Array.isArray(data.responsibilities)
            ? data.responsibilities
            : [],

          skills: Array.isArray(data.requirements)
            ? data.requirements
            : [],
        };

        setJob(formattedJob);
      } catch (err) {
        console.error("Error fetching job details:", err);

        if (err.response?.status === 404) {
          setError("This job does not exist or has been removed.");
        } else {
          setError(
            err.response?.data?.detail ||
              "Unable to load job details. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const handleApply = () => {
    const applicationPath = `/apply_jobs?jobId=${job.id}`;

    if (isLoggedIn) {
      navigate(applicationPath);
    } else {
      navigate(`/login?next=${encodeURIComponent(applicationPath)}`);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white dark:bg-[#071A19]">
        <p className="text-gray-500 dark:text-gray-300">
          Loading job details...
        </p>
      </div>
    );
  }

  // Error or job not found
  if (error || !job) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white px-6 dark:bg-[#071A19]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Job not found
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {error ||
              "This job may have been removed or is no longer available."}
          </p>

          <Link
            to="/jobs"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
          >
            Browse Jobs
            <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-900 transition-colors duration-300 dark:bg-[#071A19] dark:text-gray-100">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8">
          {/* Job Header */}
          <section className="min-w-0">
            <div className="mb-5">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {job.postedAt}
              </span>
            </div>

            <div className="mb-7 flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">

                {/* Company Logo */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-100 shadow-sm dark:bg-teal-900">
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt={`${job.company} logo`}
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display = "flex";
                      }}
                    />
                  ) : null}

                  <span
                    className={`h-full w-full items-center justify-center bg-linear-to-br from-teal-400 to-emerald-600 text-lg font-bold text-white ${
                      job.companyLogo ? "hidden" : "flex"
                    }`}
                  >
                    {job.companyInitials}
                  </span>
                </div>

                <div className="min-w-0">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                    {job.title}
                  </h1>

                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    {job.company}
                  </p>
                </div>
              </div>
            </div>

            <JobOverview job={job} />
          </section>

          {/* Job Description */}
          <section className="min-w-0">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
              Job Description
            </h2>

            <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              {job.description.length > 0 ? (
                job.description.map((paragraph, index) => (
                  <p key={`${job.id}-description-${index}`}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>Job description is not available.</p>
              )}
            </div>
          </section>

          {/* Key Responsibilities */}
          <section className="min-w-0">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
              Key Responsibilities
            </h2>

            {job.responsibilities.length > 0 ? (
              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li
                    key={`${job.id}-responsibility-${index}`}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base"
                  >
                    <FiCheck className="mt-1 h-5 w-5 shrink-0 text-teal-500" />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">
                Responsibilities are not available.
              </p>
            )}
          </section>

          {/* Professional Skills */}
          <section className="min-w-0">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
              Professional Skills
            </h2>

            {job.skills.length > 0 ? (
              <ul className="space-y-3">
                {job.skills.map((item, index) => (
                  <li
                    key={`${job.id}-skill-${index}`}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base"
                  >
                    <FiCheck className="mt-1 h-5 w-5 shrink-0 text-teal-500" />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">
                Requirements are not available.
              </p>
            )}
          </section>

          {/* Apply Now */}
          <section className="border-t border-slate-200 pt-6 dark:border-teal-900/60">
            <div className="flex flex-col gap-4 rounded-2xl border border-teal-100 bg-white p-4 shadow-sm dark:border-teal-900/60 dark:bg-[#0B2421] sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Interested in this position?
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Take the next step toward your career.
                </p>
              </div>

              <button
                type="button"
                onClick={handleApply}
                className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3.5 font-semibold text-white shadow-md shadow-teal-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500/30 sm:w-auto"
              >
                <FiBriefcase className="h-5 w-5" />
                Apply Now
                <FiArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default JobDetails;
