import { IoTimeOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { FiBriefcase, FiBookmark } from "react-icons/fi";
import { Link } from "react-router-dom";

const JobsCard = ({ jobs }) => {
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
              <div
                className={`w-12 h-12 rounded-xl ${job.logoColor} text-white font-bold text-lg flex items-center justify-center shrink-0`}
              >
                {job.logo}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                  {job.company}
                  <span className="text-teal-500">✓</span>
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {job.featured && (
                    <span className="bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full font-medium">
                      ★ Featured
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <FiBriefcase /> {job.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <CiLocationOn /> {job.location}
                  </span>
                  <span>{job.experience}</span>
                </div>

                <div className="mt-3 flex items-center gap-4">
                  <span className="text-teal-600 font-semibold text-sm">
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <IoTimeOutline /> {job.posted}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Actions - bottom aligned */}
            <div className="flex sm:flex-col sm:items-end sm:justify-end shrink-0">
              <Link to={`/job_details`}>
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors flex items-center gap-1 cursor-pointer">
                  View Details →
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsCard;