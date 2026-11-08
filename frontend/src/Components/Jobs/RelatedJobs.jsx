import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import jobsApi from "../../Api/api/JobApi";
import { FiBriefcase, FiClock, FiCreditCard, FiMapPin } from "react-icons/fi";

export default function RelatedJobs({ job: propJob }) {
  const { id } = useParams(); // Grabs ID from URL e.g. /job_details/:id
  const [job, setJob] = useState(propJob);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. If parent didn't pass a job prop, fetch it using the URL parameter id
  useEffect(() => {
    if (propJob) {
      setJob(propJob);
      return;
    }

    const fetchCurrentJob = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const response = await jobsApi.get(`v1/jobs/${id}/`);
        setJob(response.data);
      } catch (err) {
        console.error("Error fetching current job for related items:", err);
        setLoading(false);
      }
    };

    fetchCurrentJob();
  }, [propJob, id]);

  // 2. Fetch related jobs once we have the job and its category ID
  useEffect(() => {
    const fetchRelatedJobs = async () => {
      if (!job) return;

      const categoryId =
        typeof job?.category === "object"
          ? job?.category?.id || job?.category?.pk
          : job?.category;

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
            exclude: job.id,
          },
        });

        const data = Array.isArray(response?.data)
          ? response.data
          : response?.data?.results || response?.data?.data || [];

        setRelatedJobs(data.slice(0, 3));
      } catch (error) {
        console.error(
          "Related Jobs API Error:",
          error?.response?.data || error?.message,
        );
        setRelatedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedJobs();
  }, [job]);

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
          if (!item) return null;

          const companyName =
            typeof item.company === "object"
              ? item.company?.name
              : item.company_name || "Company Name";

          const categoryName =
            item?.category_name ||
            (typeof item?.category === "object"
              ? item?.category?.name
              : "General");

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0d2a28] border border-gray-100 dark:border-slate-700 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md dark:hover:border-teal-500 transition"
            >
              <div className="flex-1">
                <div className="mb-3">
                  <span className="text-xs text-gray-400 dark:text-slate-400">
                    {item?.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : "Recently posted"}
                  </span>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {companyName?.charAt(0) || "J"}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item?.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      {companyName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <FiBriefcase className="w-3.5 h-3.5 text-teal-500" />
                    {categoryName}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiClock className="w-3.5 h-3.5 text-teal-500" />
                    {item?.job_type || "Full Time"}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiCreditCard className="w-3.5 h-3.5 text-teal-500" />
                    {item?.salary ? `$${item.salary}` : "Negotiable"}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-3.5 h-3.5 text-teal-500" />
                    {item?.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link
                  to={`/job_details/${item?.id}`}
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
