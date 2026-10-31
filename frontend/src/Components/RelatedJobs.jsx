import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiClock,
  FiMapPin,
  FiBookmark,
  FiCreditCard,
} from "react-icons/fi";

const relatedJobsData = [
  {
    id: 1,
    time: "24 min ago",
    logo: "🎨",
    title: "Internal Creative Coordinator",
    company: "Green Group",
    category: "Commerce",
    type: "Full time",
    salary: "৳25000",
    location: "Gulshan, Dhaka",
  },
  {
    id: 2,
    time: "24 min ago",
    logo: "🌀",
    title: "District Intranet Director",
    company: "Daraz",
    category: "Commerce",
    type: "Full time",
    salary: "৳40000",
    location: "Banani, Dhaka",
  },
  {
    id: 3,
    time: "26 min ago",
    logo: "🎯",
    title: "Corporate Tactics Facilitator",
    company: "Pathao",
    category: "Commerce",
    type: "Full time",
    salary: "৳25000-৳35000",
    location: "Mirpur, Dhaka",
  },
];

export default function RelatedJobs() {
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
        {relatedJobsData.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-[#0d2a28] border border-gray-100 dark:border-slate-700 dark:shadow-black/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md dark:hover:border-teal-500 transition"
          >
            {/* Left Content */}
            <div className="flex-1">
              <div className="mb-3">
                <span className="text-xs text-gray-400 dark:text-slate-400">
                  {job.time}
                </span>
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {job.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    {job.company}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <FiBriefcase className="w-3.5 h-3.5 text-teal-500" />
                  {job.category}
                </span>
                <span className="flex items-center gap-1">
                  <FiClock className="w-3.5 h-3.5 text-teal-500" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1">
                  <FiCreditCard className="w-3.5 h-3.5 text-teal-500" />
                  {job.salary}
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin className="w-3.5 h-3.5 text-teal-500" />
                  {job.location}
                </span>
              </div>
            </div>

            {/* Right Side: Bookmark on top of the Job Details button */}
            <div className="flex flex-col items-end justify-between self-stretch md:self-auto gap-16">
              <button className="text-gray-400 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition">
                <FiBookmark className="w-5 h-5" />
              </button>

              <Link
                to="/apply_jobs"
                className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition whitespace-nowrap"
              >
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
