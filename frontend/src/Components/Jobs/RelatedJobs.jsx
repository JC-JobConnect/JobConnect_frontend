
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import jobsApi from "../../Services/JobApi";
import {
  FiBriefcase,
  FiClock,
  FiCreditCard,
  FiMapPin,
} from "react-icons/fi";

export default function RelatedJobs({ job: propJob }) {
  const { id } = useParams();

  const [job, setJob] = useState(propJob || null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch current job if the parent does not pass it
  useEffect(() => {
    if (propJob) {
      setJob(propJob);
      return;
    }

    let cancelled = false;

    const fetchCurrentJob = async () => {
      if (!id) {
        setJob(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await jobsApi.get(`v1/jobs/${id}/`);

        if (!cancelled) {
          setJob(response.data);
        }
      } catch (error) {
        console.error("Current job fetch error:", error);
        if (!cancelled) {
          setJob(null);
          setLoading(false);
        }
      }
    };

    fetchCurrentJob();

    return () => {
      cancelled = true;
    };
  }, [propJob, id]);

  // Extract category ID
  const categoryId =
    typeof job?.category === "object"
      ? job?.category?.id || job?.category?.pk
      : job?.category;

  // Fetch related jobs
  useEffect(() => {
    let cancelled = false;

    const fetchRelatedJobs = async () => {
      if (!job?.id || !categoryId) {
        setRelatedJobs([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await jobsApi.get("v1/jobs/", {
          params: {
            category: categoryId,
          },
        });

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

        if (!cancelled) {
          // Exclude the current job and show only 3
          const filteredJobs = data
            .filter((item) => Number(item.id) !== Number(job.id))
            .slice(0, 3);

          setRelatedJobs(filteredJobs);
        }
      } catch (error) {
        console.error(
          "Related Jobs API Error:",
          error.response?.data || error.message
        );

        if (!cancelled) {
          setRelatedJobs([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchRelatedJobs();

    return () => {
      cancelled = true;
    };
  }, [job?.id, categoryId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-500 dark:text-slate-400">
        Loading related jobs...
      </div>
    );
  }

  if (!relatedJobs.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Related Jobs
        </h2>

        <p className="text-gray-500 dark:text-slate-400">
          More paths to your next career move.
        </p>
      </div>

      <div className="space-y-4">
        {relatedJobs.map((item) => {
          const companyName =
            item.company_name ||
            (typeof item.company === "object"
              ? item.company?.name
              : null) ||
            "Company Name";

          const categoryName =
            item.category_name ||
            (typeof item.category === "object"
              ? item.category?.name
              : null) ||
            "General";

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0d2a28] border border-gray-100 dark:border-slate-700 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md dark:hover:border-teal-500 transition"
            >
              <div className="flex-1">
                <div className="mb-3">
                  <span className="text-xs text-gray-400 dark:text-slate-400">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "Recently posted"}
                  </span>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  {/* Company Logo */}
                  <div className="relative w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#163D3A] flex items-center justify-center shrink-0 overflow-hidden">
                    <span className="font-bold text-lg text-gray-700 dark:text-gray-200">
                      {companyName.charAt(0).toUpperCase()}
                    </span>

                    {item.company_logo && (
                      <img
                        src={item.company_logo}
                        alt={companyName}
                        className="absolute inset-0 w-full h-full object-contain bg-white dark:bg-[#163D3A]"
                        onError={(e) => e.currentTarget.remove()}
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      {companyName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <FiBriefcase className="w-3.5 h-3.5 text-teal-500" />
                    {categoryName}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiClock className="w-3.5 h-3.5 text-teal-500" />
                    {item.job_type || "Full Time"}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiCreditCard className="w-3.5 h-3.5 text-teal-500" />
                    {item.salary
                      ? `৳${Number(item.salary).toLocaleString("en-BD")}`
                      : "Negotiable"}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-3.5 h-3.5 text-teal-500" />
                    {item.location || "Not specified"}
                  </span>
                </div>
              </div>

              {/* See Details */}
              <div className="flex items-center justify-end">
                <Link
                  to={`/job_details/${item.id}`}
                  className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition whitespace-nowrap text-center"
                >
                  See Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
