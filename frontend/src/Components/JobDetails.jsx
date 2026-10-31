import React, { useState } from "react";
import PageHero from "../Components/PageHero";
import JobOverview from "../Components/JobOverview";
import RelatedJobs from "../Components/RelatedJobs";
import { Link } from "react-router-dom";

import {
  FiUser,
  FiBriefcase,
  FiClock,
  FiMapPin,
  FiBookmark,
  FiCheck,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiCreditCard,
} from "react-icons/fi";

const responsibilities = [
  "Collaborate with product managers, designers, and other developers to build scalable web applications.",
  "Design, develop, and maintain secure RESTful APIs using Django REST Framework and PostgreSQL.",
  "Write clean, maintainable, and efficient code adhering to modern software development best practices.",
  "Optimize application performance, frontend loading speeds, and database query efficiency.",
  "Participate in code reviews, write unit tests, and troubleshoot bugs across different environments.",
  "Ensure seamless integration between frontend React components and backend microservices or APIs.",
];

const skills = [
  "Strong proficiency in JavaScript/TypeScript, React.js, HTML5, CSS3, and Tailwind CSS.",
  "In-depth experience with Python, Django, and Django REST Framework (DRF).",
  "Hands-on experience with relational databases such as PostgreSQL or MySQL.",
  "Familiarity with version control systems like Git and collaborative workflows on GitHub.",
  "Strong problem-solving skills and experience working in agile development teams.",
];

const tags = ["Full time", "Tech", "Uttara", "Corporate", "Location"];

function JobDetails() {
  const [bookmarked, setBookmarked] = useState(false);
  const [result, setResult] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Web3Forms submission
  const onSubmit = async (event) => {
    event.preventDefault();

    setResult("");
    setIsSending(true);

    try {
      const formData = new FormData(event.currentTarget);

      formData.append("access_key", "222dc648-0bef-4d2e-ab93-5bc9cc55e714");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult("Success! Your message has been sent.");
        event.target.reset();
      } else {
        setResult(data.message || "Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setResult(
        "Unable to send your message. Please check your connection and try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#071A19] font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <PageHero badgeText="Explore the jobs." title="Job Details" />

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400 dark:text-slate-400">
                  10 min ago
                </span>

                <button
                  type="button"
                  onClick={() => setBookmarked(!bookmarked)}
                  aria-label={bookmarked ? "Remove bookmark" : "Bookmark job"}
                  aria-pressed={bookmarked}
                  className={`p-2 rounded-full transition ${
                    bookmarked
                      ? "text-teal-500"
                      : "text-gray-400 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400"
                  }`}
                >
                  <FiBookmark className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xl font-bold">
                  CS
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Full Stack Developer
                  </h1>

                  <p className="text-gray-500 dark:text-slate-400 mt-1">
                    HexaTech LTD
                  </p>
                </div>
              </div>

              {/* Job Meta Information */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-slate-300 mb-6">
                <span className="flex items-center gap-1.5">
                  <FiBriefcase className="w-4 h-4 text-teal-500" />
                  Tech
                </span>

                <span className="flex items-center gap-1.5">
                  <FiClock className="w-4 h-4 text-teal-500" />
                  Full time
                </span>

                <span className="flex items-center gap-1.5">
                  <FiCreditCard className="w-4 h-4 text-teal-500" />
                  ৳40000-৳42000
                </span>

                <span className="flex items-center gap-1.5">
                  <FiMapPin className="w-4 h-4 text-teal-500" />
                  Uttara, Dhaka
                </span>
              </div>

              {/* Apply Now */}
              <Link
                to="/apply_jobs"
                className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-medium px-8 py-3 rounded-lg transition"
              >
                Apply Now
              </Link>
            </div>

            {/* Job Description */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Job Description
              </h2>

              <div className="space-y-4 text-gray-600 dark:text-slate-300 leading-relaxed text-justify">
                <p>
                  We are seeking a highly motivated Full-Stack Developer to join
                  our growing product engineering team. In this pivotal role,
                  you will leverage your expertise to design, develop, and
                  maintain advanced web applications and scalable backend
                  systems, contributing directly to the full lifecycle of our
                  platform. We value innovation and are committed to building
                  robust solutions.
                </p>

                <p>
                  The ideal candidate will be proficient in modern frontend
                  technologies and robust backend frameworks, with a deep
                  understanding of standard development methodologies. Key
                  requirements include extensive experience with React, fluency
                  in Python and Django, and a proven track record of creating
                  efficient RESTful APIs. A strong analytical mind and the
                  ability to thrive in a collaborative environment are
                  essential.
                </p>
              </div>
            </div>

            {/* Key Responsibilities */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Key Responsibilities
              </h2>

              <ul className="space-y-3">
                {responsibilities.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-600 dark:text-slate-300"
                  >
                    <FiCheck className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Skills */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Professional Skills
              </h2>

              <ul className="space-y-3">
                {skills.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-600 dark:text-slate-300"
                  >
                    <FiCheck className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Tags:
              </h3>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-gray-100 dark:bg-[#0d2a28] dark:border dark:border-slate-700 text-gray-600 dark:text-slate-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Job */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-gray-700 dark:text-slate-300 font-medium">
                Share Job:
              </span>

              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Share on Facebook"
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#0d2a28] dark:border dark:border-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:border-teal-500 hover:text-teal-600 transition"
                >
                  f
                </a>

                <a
                  href="#"
                  aria-label="Share on X"
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#0d2a28] dark:border dark:border-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:border-teal-500 hover:text-teal-600 transition"
                >
                  𝕏
                </a>

                <a
                  href="#"
                  aria-label="Share on LinkedIn"
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#0d2a28] dark:border dark:border-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:border-teal-500 hover:text-teal-600 transition"
                >
                  in
                </a>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Job Overview Component */}
            <JobOverview />

            {/* Send Us Message */}
            <div className="bg-teal-50 dark:bg-[#0d2a28] dark:border dark:border-slate-700 dark:shadow-black/20 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-5">
                Send Us Message
              </h3>

              <form onSubmit={onSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-400" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#071A19] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-400" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#071A19] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-400" />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#071A19] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-slate-400" />

                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Your Message"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#071A19] text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="cursor-pointer rounded-2xl bg-teal-700 px-6 py-3 text-base font-medium text-white shadow-sm transition duration-200 hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-teal-600 dark:hover:bg-teal-500"
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </div>

                {/* Submission Status */}
                {result && (
                  <p
                    className="text-sm text-gray-700 dark:text-gray-300 mt-3"
                    role="status"
                  >
                    {result}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Related Jobs Component */}
      <RelatedJobs />
    </div>
  );
}

export default JobDetails;
