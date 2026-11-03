import { IoTimeOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FiBriefcase, FiMonitor, FiBarChart2 } from "react-icons/fi";

const JobsCard = ({ jobs }) => {
  // Format job type
  const formatJobType = (type) => {
    if (!type) return "Not specified";

    const types = {
      full_time: "Full Time",
      part_time: "Part Time",
      contract: "Contract",
      internship: "Internship",
    };

    return types[type] || type;
  };

  // Format work mode
  const formatWorkMode = (mode) => {
    if (!mode) return "Not specified";

    const modes = {
      onsite: "On-site",
      remote: "Remote",
      hybrid: "Hybrid",
    };

    return modes[mode] || mode;
  };

  // Format experience level
  const formatExperience = (level) => {
    if (!level) return "Not specified";

    const levels = {
      entry: "Entry Level",
      mid: "Mid Level",
      senior: "Senior Level",
    };

    return levels[level] || level;
  };

  // Format salary
  const formatSalary = (salary) => {
    if (!salary) return "Negotiable";

    return `৳${Number(salary).toLocaleString("en-BD")}`;
  };

  // Calculate posted date
  const formatPostedDate = (date) => {
    if (!date) return "Date unavailable";

    const postedDate = new Date(date);
    const now = new Date();

    const difference = Math.floor((now - postedDate) / (1000 * 60 * 60 * 24));

    if (difference === 0) return "Today";
    if (difference === 1) return "1 day ago";

    return `${difference} days ago`;
  };

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-gray-100 dark:border-teal-900/40 p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Left Info */}
            <div className="flex gap-4 flex-1">
              {/* Company Initial */}
              <div className="w-12 h-12 rounded-xl bg-gray-900 text-white font-bold text-lg flex items-center justify-center shrink-0">
                {job.company_name?.charAt(0).toUpperCase() || "C"}
              </div>

              <div className="flex-1">
                {/* Job Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {job.title}
                </h3>

                {/* Company Name */}
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                  {job.company_name}
                </p>

                {/* Job Information */}
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {/* Featured Badge */}
                  {job.is_featured && (
                    <span className="bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full font-medium">
                      ★ Featured
                    </span>
                  )}

                  {/* Job Type */}
                  <span className="flex items-center gap-1">
                    <FiBriefcase />
                    {formatJobType(job.job_type)}
                  </span>

                  {/* Work Mode */}
                  <span className="flex items-center gap-1">
                    <FiMonitor className="w-3 h-3" />
                    {formatWorkMode(job.work_mode)}
                  </span>

                  {/* Location */}
                  <span className="flex items-center gap-1">
                    <CiLocationOn />

                    {job.location || "Location not specified"}
                  </span>

                  {/* Experience */}
                  <span className="flex items-center gap-1">
                    <FiBarChart2 className="w-3 h-3" />
                    {formatExperience(job.experience_level)}
                  </span>
                </div>

                {/* Salary and Posted Date */}
                <div className="mt-3 flex items-center gap-4">
                  <span className="text-teal-600 font-semibold text-sm">
                    {formatSalary(job.salary)}
                  </span>

                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <IoTimeOutline />
                    {formatPostedDate(job.created_at)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex sm:flex-col sm:items-end sm:justify-end shrink-0">
              <Link
                to={`/job_details/${job.id}`}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors flex items-center gap-1"
              >
                View Details →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsCard;
