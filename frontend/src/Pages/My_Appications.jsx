import PageHero from "../Components/PageHero"
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  FiBriefcase,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiFileText,
  FiMail,
  FiUser,
  FiMapPin,
  FiArrowUpRight,
  FiAlertCircle,
} from "react-icons/fi";

// Sample data: replace this with your Django API response.
const applicationsData = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    company: "Microsoft",
    companyInitials: "M",
    companyColor: "bg-blue-600",
    location: "Remote",
    jobType: "Full time",
    salary: "$75,000–$95,000",
    appliedDate: "Apr 25, 2026",
    status: "Interview",
    applicantName: "Alex Morgan",
    applicantEmail: "alex@example.com",
    coverLetter:
      "I am excited to apply for the Frontend Developer position. I have experience building responsive React applications, creating reusable UI components, and improving user experiences. I would love to contribute my skills to your team.",
    statusMessage:
      "Your application has progressed to the interview stage. Check your email for interview scheduling details.",
    timeline: [
      { label: "Application submitted", date: "Apr 25, 2026", completed: true },
      { label: "Application reviewed", date: "Apr 27, 2026", completed: true },
      { label: "Interview stage", date: "Apr 29, 2026", completed: true },
      { label: "Final decision", date: "Awaiting update", completed: false },
    ],
  },
  {
    id: 2,
    jobTitle: "Software Engineer",
    company: "Google",
    companyInitials: "G",
    companyColor: "bg-emerald-600",
    location: "New York, USA",
    jobType: "Full time",
    salary: "$90,000–$120,000",
    appliedDate: "Apr 20, 2026",
    status: "Reviewed",
    applicantName: "Alex Morgan",
    applicantEmail: "alex@example.com",
    coverLetter:
      "I am interested in joining your engineering team. My background includes software development, problem-solving, and building scalable applications. I look forward to the opportunity to contribute.",
    statusMessage:
      "The employer has reviewed your application. You are waiting for the next update.",
    timeline: [
      { label: "Application submitted", date: "Apr 20, 2026", completed: true },
      { label: "Application reviewed", date: "Apr 23, 2026", completed: true },
      { label: "Next recruitment stage", date: "Awaiting update", completed: false },
    ],
  },
  {
    id: 3,
    jobTitle: "Full Stack Developer",
    company: "Meta",
    companyInitials: "M",
    companyColor: "bg-indigo-600",
    location: "Remote",
    jobType: "Full time",
    salary: "$85,000–$110,000",
    appliedDate: "Apr 18, 2026",
    status: "Pending",
    applicantName: "Alex Morgan",
    applicantEmail: "alex@example.com",
    coverLetter:
      "I am applying for the Full Stack Developer position because I enjoy building complete web applications. I have experience working with frontend interfaces, backend APIs, and databases.",
    statusMessage:
      "Your application has been submitted successfully and is waiting for the employer to review it.",
    timeline: [
      { label: "Application submitted", date: "Apr 18, 2026", completed: true },
      { label: "Employer review", date: "In progress", completed: false },
      { label: "Next recruitment stage", date: "Awaiting update", completed: false },
    ],
  },
  {
    id: 4,
    jobTitle: "Backend Developer",
    company: "Amazon",
    companyInitials: "a",
    companyColor: "bg-orange-500",
    location: "Seattle, USA",
    jobType: "Full time",
    salary: "$80,000–$105,000",
    appliedDate: "Apr 15, 2026",
    status: "Rejected",
    applicantName: "Alex Morgan",
    applicantEmail: "alex@example.com",
    coverLetter:
      "I am interested in the Backend Developer role. I enjoy designing APIs, working with databases, and building reliable server-side applications.",
    statusMessage:
      "The employer has decided not to proceed with your application at this time.",
    timeline: [
      { label: "Application submitted", date: "Apr 15, 2026", completed: true },
      { label: "Application reviewed", date: "Apr 17, 2026", completed: true },
      { label: "Application decision", date: "Apr 19, 2026", completed: true },
    ],
  },
  {
    id: 5,
    jobTitle: "iOS Developer",
    company: "Apple",
    companyInitials: "A",
    companyColor: "bg-slate-900",
    location: "California, USA",
    jobType: "Full time",
    salary: "$95,000–$125,000",
    appliedDate: "Apr 10, 2026",
    status: "Pending",
    applicantName: "Alex Morgan",
    applicantEmail: "alex@example.com",
    coverLetter:
      "I am passionate about creating polished mobile experiences and would welcome the opportunity to contribute to your iOS development team.",
    statusMessage:
      "Your application is in the queue and has not yet received a status update.",
    timeline: [
      { label: "Application submitted", date: "Apr 10, 2026", completed: true },
      { label: "Employer review", date: "Waiting", completed: false },
      { label: "Next recruitment stage", date: "Awaiting update", completed: false },
    ],
  },
];

const statusConfig = {
  Pending: {
    icon: FiClock,
    badge:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20",
    dot: "bg-amber-500",
    heading: "Waiting for review",
  },
  Reviewed: {
    icon: FiCheckCircle,
    badge:
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
    dot: "bg-emerald-500",
    heading: "Application reviewed",
  },
  Interview: {
    icon: FiCalendar,
    badge:
      "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/20",
    dot: "bg-blue-500",
    heading: "Interview stage",
  },
  Rejected: {
    icon: FiXCircle,
    badge:
      "bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20",
    dot: "bg-rose-500",
    heading: "Application closed",
  },
};

const filters = ["All", "Pending", "Reviewed", "Interview", "Rejected"];

function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.Pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${config.badge}`}
    >
      <Icon className="h-4 w-4" />
      {status}
    </span>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-1 wrap-break-word text-sm font-medium text-slate-800 dark:text-slate-100">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function ApplicationCard({ application, isExpanded, onToggle }) {
  const {
    jobTitle,
    company,
    companyInitials,
    companyColor,
    location,
    jobType,
    salary,
    appliedDate,
    status,
    applicantName,
    applicantEmail,
    coverLetter,
    statusMessage,
  } = application;

  const config = statusConfig[status] || statusConfig.Pending;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:border-teal-200 hover:shadow-md dark:border-slate-700/70 dark:bg-[#0B2221] dark:hover:border-teal-800">
      {/* Main application row */}
      <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
        {/* Company and job */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold text-white shadow-sm ${companyColor}`}
          >
            {companyInitials}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              {jobTitle}
            </h3>

            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {company}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <FiBriefcase className="h-3.5 w-3.5 text-teal-500" />
                {jobType}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <FiMapPin className="h-3.5 w-3.5 text-teal-500" />
                {location}
              </span>
            </div>
          </div>
        </div>

        {/* Application date */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 lg:w-40 lg:shrink-0">
          <FiCalendar className="h-4 w-4 shrink-0" />
          <span>
            <span className="text-xs text-slate-400">Applied on</span>
            <br className="hidden lg:block" />
            {appliedDate}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between gap-3 lg:w-36 lg:shrink-0 lg:justify-center">
          <StatusBadge status={status} />
          <span className="text-xs text-slate-400 lg:hidden">
            Application status
          </span>
        </div>

        {/* Expand details */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 lg:w-36 cursor-pointer ${isExpanded
              ? "border-teal-600 bg-teal-600 text-white shadow-sm"
              : "border-slate-200 bg-white text-slate-700 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700 dark:border-slate-600 dark:bg-transparent dark:text-slate-200 dark:hover:border-teal-600 dark:hover:bg-teal-900/30 dark:hover:text-teal-300"
            }`}
        >
          {isExpanded ? "Hide Details" : "View Details"}

          {isExpanded ? (
            <FiChevronUp className="h-4 w-4" />
          ) : (
            <FiChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Expandable detail section */}
      {isExpanded && (
        <div className="border-t border-slate-100 bg-linear-to-br from-teal-50/70 via-white to-white dark:border-slate-700 dark:from-teal-950/30 dark:via-[#0B2221] dark:to-[#0B2221]">
          <div className="p-4 sm:p-6">
            {/* Status summary */}
            <div className="flex flex-col gap-3 rounded-xl border border-teal-100 bg-white/80 p-4 dark:border-teal-900 dark:bg-[#071A19]/60 sm:flex-row sm:items-start">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.badge}`}
              >
                <config.icon className="h-5 w-5" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {config.heading}
                </h4>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {statusMessage}
                </p>
              </div>
            </div>

            {/* Details grid */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <DetailItem
                icon={FiUser}
                label="Applicant name"
                value={applicantName}
              />

              <DetailItem
                icon={FiMail}
                label="Email address"
                value={applicantEmail}
              />

              <DetailItem
                icon={FiCalendar}
                label="Date applied"
                value={appliedDate}
              />

              <DetailItem
                icon={FiBriefcase}
                label="Job position"
                value={jobTitle}
              />

              <DetailItem
                icon={FiMapPin}
                label="Job location"
                value={location}
              />

              <DetailItem
                icon={FiFileText}
                label="Salary range"
                value={salary}
              />
            </div>

            {/* Submitted cover letter */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-[#071A19]/60">
              <div className="flex items-center gap-2">
                <FiFileText className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Your submitted cover letter
                </h4>
              </div>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                {coverLetter || "No cover letter was provided."}
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function My_Appications() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const applications = applicationsData;

  const counts = useMemo(() => {
    return filters.reduce((result, filter) => {
      result[filter] =
        filter === "All"
          ? applications.length
          : applications.filter((app) => app.status === filter).length;

      return result;
    }, {});
  }, [applications]);

  const filteredApplications = useMemo(() => {
    return activeFilter === "All"
      ? applications
      : applications.filter((app) => app.status === activeFilter);
  }, [applications, activeFilter]);

  const pageSize = 5;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / pageSize)
  );

  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const changeFilter = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    setExpandedId(null);
  };

  const toggleApplication = (id) => {
    setExpandedId((previousId) => (previousId === id ? null : id));
  };

  return (
    <>
      <PageHero title="My Applications" />
      <main className="min-h-screen bg-[#F9FAFB] px-4 py-8 text-slate-900 transition-colors dark:bg-[#071A19] dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Filter tabs */}
          <div className="mb-5">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                  Your submitted applications
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Expand any application to see its details and progress.
                </p>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing {filteredApplications.length} application
                {filteredApplications.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => changeFilter(filter)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${activeFilter === filter
                      ? "bg-linear-to-r from-teal-600 to-emerald-500 text-white shadow-md shadow-teal-500/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-700 dark:border-slate-700 dark:bg-[#0B2221] dark:text-slate-300 dark:hover:border-teal-700 dark:hover:text-teal-300"
                    }`}
                >
                  {filter}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-xs ${activeFilter === filter
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                  >
                    {counts[filter]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Application cards */}
          {paginatedApplications.length > 0 ? (
            <div className="space-y-4">
              {paginatedApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  isExpanded={expandedId === application.id}
                  onToggle={() => toggleApplication(application.id)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center dark:border-slate-700 dark:bg-[#0B2221]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300">
                <FiBriefcase className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                No {activeFilter === "All" ? "" : activeFilter.toLowerCase() + " "}
                applications found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                {activeFilter === "All"
                  ? "You haven't submitted any job applications yet. Explore available jobs and apply for a position that matches your skills."
                  : `You don't have any applications with ${activeFilter.toLowerCase()} status right now.`}
              </p>

              {activeFilter !== "All" && (
                <button
                  type="button"
                  onClick={() => changeFilter("All")}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                  View all applications
                  <FiArrowUpRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-7 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((page) => page - 1);
                  setExpandedId(null);
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-teal-400 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-[#0B2221] dark:text-slate-300"
              >
                Previous
              </button>

              <span className="px-3 text-sm text-slate-500 dark:text-slate-400">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((page) => page + 1);
                  setExpandedId(null);
                }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-teal-400 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-[#0B2221] dark:text-slate-300"
              >
                Next
              </button>
            </div>
          )}

          {/* Bottom Link */}
          <p className="mt-8 text-center text-lg fony-bold text-slate-800 dark:text-slate-400">
            Apply for another job{" "}
            <Link
              to="/jobs"
              className="font-medium text-teal-600 transition-colors hover:text-teal-700 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
            >
              Browse Jobs →
            </Link>
          </p>

          {/* Bottom note */}
          <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-2xl border border-teal-100 bg-teal-50/70 p-4 dark:border-teal-900/50 dark:bg-teal-950/20 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-teal-600 dark:text-teal-400" />
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Keep your application information up to date
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Check your email regularly for interview invitations and
                  recruitment updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}


