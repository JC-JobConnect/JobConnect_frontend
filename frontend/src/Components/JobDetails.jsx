import { Link, useParams, useNavigate } from "react-router-dom";

import {
  FiCheck,
  FiBriefcase,
  FiArrowRight,
} from "react-icons/fi";

import JobOverview from "../Components/JobOverview";

// Temporary job data.
// Later, you can replace this with data from your Django API.
const jobData = {
  id: 1,
  title: "Full Stack Developer",
  company: "HexaTech LTD",
  companyInitials: "CS",
  postedAt: "10 min ago",
  employmentType: "Full Time",
  category: "Commerce",
  salary: "$40,000–$42,000",
  location: "New-York, USA",

  description: [
    "We are seeking a highly motivated Full-Stack Developer to join our growing product engineering team. In this pivotal role, you will leverage your expertise to design, develop, and maintain advanced web applications and scalable backend systems, contributing directly to the full lifecycle of our platform. We value innovation and are committed to building robust solutions.",

    "The ideal candidate will be proficient in modern frontend technologies and robust backend frameworks, with a deep understanding of standard development methodologies. Key requirements include extensive experience with React, fluency in Python and Django, and a proven track record of creating efficient RESTful APIs. A strong analytical mind and the ability to thrive in a collaborative environment are essential.",
  ],

  responsibilities: [
    "Collaborate with product managers, designers, and other developers to build scalable web applications.",
    "Design, develop, and maintain secure RESTful APIs using Django REST Framework and PostgreSQL.",
    "Write clean, maintainable, and efficient code adhering to modern software development best practices.",
    "Optimize application performance, frontend loading speeds, and database query efficiency.",
    "Participate in code reviews, write unit tests, and troubleshoot bugs across different environments.",
    "Ensure seamless integration between frontend React components and backend microservices or APIs.",
  ],

  skills: [
    "Strong proficiency in JavaScript/TypeScript, React.js, HTML5, CSS3, and Tailwind CSS.",
    "In-depth experience with Python, Django, and Django REST Framework (DRF).",
    "Hands-on experience with relational databases such as PostgreSQL or MySQL.",
    "Familiarity with version control systems like Git and collaborative workflows on GitHub.",
    "Strong problem-solving skills and experience working in agile development teams.",
  ],
};

function JobDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary authentication check.
  // Make sure loginUser() stores the token under this exact key.
  const isLoggedIn = Boolean(
    sessionStorage.getItem("access_token")
  );

  // Use the route ID when provided.
  // The current page uses sample job data with ID 1.
  const job = {
    ...jobData,
    id: id ? Number(id) : jobData.id,
  };

  const handleApply = () => {
    const applicationPath = `/apply_jobs?jobId=${job.id}`;

    if (isLoggedIn) {
      navigate(applicationPath);
    } else {
      navigate(
        `/login?next=${encodeURIComponent(applicationPath)}`
      );
    }
  };

  if (!job) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white px-6 dark:bg-[#071A19]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Job not found
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            This job may have been removed or is no longer available.
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
              {/* Company and Job Title */}
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-teal-400 to-emerald-600 text-lg font-bold text-white shadow-sm">
                  {job.companyInitials}
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
              {job.description.map((paragraph, index) => (
                <p key={`${job.id}-description-${index}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Key Responsibilities */}
          <section className="min-w-0">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
              Key Responsibilities
            </h2>

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
          </section>

          {/* Professional Skills */}
          <section className="min-w-0">
            <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
              Professional Skills
            </h2>

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
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3.5 font-semibold text-white shadow-md shadow-teal-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500/30 sm:w-auto cursor-pointer"
              >
                <FiBriefcase className="h-5 w-5" />

                Apply Now

                <FiArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* Related Jobs can be rendered here when needed. */}
    </div>
  );
}

export default JobDetails;
