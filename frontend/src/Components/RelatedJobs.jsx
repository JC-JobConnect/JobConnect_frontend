import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import jobsApi from "../Api/api/JobApi";
import { FiBriefcase, FiClock, FiCreditCard, FiMapPin } from "react-icons/fi";

export default function RelatedJobs({ job }) {
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If no job or category yet, stop loading and return early
    if (!job?.category) {
      setLoading(false);
      return;
    }

    const fetchRelatedJobs = async () => {
      try {
        setLoading(true);

        // Handle category safely whether it's an ID, String, or Object
        const categoryParam =
          typeof job.category === "object"
            ? job.category.id || job.category.name
            : job.category;

        const response = await jobsApi.get("v1/jobs/", {
          params: {
            category: categoryParam,
            exclude: job.id,
          },
        });

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        setRelatedJobs(data.slice(0, 3));
      } catch (error) {
        console.error("Related jobs error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedJobs();
  }, [job?.id, job?.category]);

  if (loading)
    return (
      <p className="text-gray-500 dark:text-slate-400 text-center py-6">
        Loading related jobs...
      </p>
    );

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
        {relatedJobs.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-[#0d2a28] border border-gray-100 dark:border-slate-700 dark:shadow-black/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md dark:hover:border-teal-500 transition"
          >
            {/* Left Content */}
            <div className="flex-1">
              <div className="mb-3">
                <span className="text-xs text-gray-400 dark:text-slate-400">
                  {item.time || "Recently posted"}
                </span>
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {item.logo || item.company?.charAt(0) || "J"}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    {item.company}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <FiBriefcase className="w-3.5 h-3.5 text-teal-500" />
                  {typeof item.category === "object"
                    ? item.category.name
                    : item.category}
                </span>
                <span className="flex items-center gap-1">
                  <FiClock className="w-3.5 h-3.5 text-teal-500" />
                  {item.type}
                </span>
                <span className="flex items-center gap-1">
                  <FiCreditCard className="w-3.5 h-3.5 text-teal-500" />
                  {item.salary}
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin className="w-3.5 h-3.5 text-teal-500" />
                  {item.location}
                </span>
              </div>
            </div>

            {/* Job Details button */}
            <div className="flex flex-col items-end justify-between self-stretch md:self-auto gap-16">
              <Link
                to={`/job_details/${item.id}`}
                className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition whitespace-nowrap text-center"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
