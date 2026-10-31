import PageHero from "../Components/PageHero";
import { useState } from "react";
import {
  FiUser,
  FiBriefcase,
  FiClock,
  FiMapPin,
  FiMail,
  FiFileText,
  FiCheckCircle,
  FiDollarSign,
} from "react-icons/fi";

function ApplyJob() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    coverLetter: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email) {
      alert("Please fill in Full Name and Email");
      return;
    }

    // Show success popup
    setShowSuccess(true);

    // Redirect after 2.5 seconds
    setTimeout(() => {
      // If you use React Router:
      // navigate("/my-applications");

      // Simple redirect (works without router)
      window.location.href = "/my-applications";
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#071A19] font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <PageHero title="Apply For This Job" badgeText="Applyjobs" />

      {/*Job Overview Bar */}

      <div className="max-w-5xl mx-auto px-6 pt-10">
        <div className="bg-teal-50 dark:bg-[#0d2a28] dark:border dark:border-slate-700 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white dark:bg-[#071A19] flex items-center justify-center text-teal-600 dark:text-teal-400">
              <FiUser className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Job Title
              </p>
              <p className="font-medium text-sm">
                Corporate Solutions Executive
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white dark:bg-[#071A19] flex items-center justify-center text-teal-600 dark:text-teal-400">
              <FiClock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Job Type
              </p>
              <p className="font-medium text-sm">Full Time</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white dark:bg-[#071A19] flex items-center justify-center text-teal-600 dark:text-teal-400">
              <FiBriefcase className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Category
              </p>
              <p className="font-medium text-sm">Commerce</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white dark:bg-[#071A19] flex items-center justify-center text-teal-600 dark:text-teal-400">
              <FiDollarSign className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Offered Salary
              </p>
              <p className="font-medium text-sm">$40000-$42000</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white dark:bg-[#071A19] flex items-center justify-center text-teal-600 dark:text-teal-400">
              <FiMapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Location
              </p>
              <p className="font-medium text-sm">New-York, USA</p>
            </div>
          </div>
        </div>
      </div> 
      {/* Apply Form Section */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Apply for this job
        </h1>

        <div className="bg-white dark:bg-[#0d2a28] border border-gray-100 dark:border-slate-700 dark:shadow-black/20 rounded-2xl p-8">
          {/* Job Header inside form */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-lg font-bold">
              FS
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Forward Security Director
              </h2>
              <p className="text-gray-500 dark:text-slate-400 text-sm">
                Bauch, Schuppe and Schulist Co
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#071A19] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#071A19] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Cover letter
              </label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-slate-400" />
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write short cover letter explaining why you are a good fit..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-[#071A19] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-500 cursor-pointer hover:bg-teal-600 text-white font-medium py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            >
              Submit Application
              <span>→</span>
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-slate-400 mt-6">
            You can view your application status later in{" "}
            <a
              href="/my-applications"
              className="text-teal-500 hover:underline font-medium"
            >
              My Applications
            </a>
          </p>
        </div>
      </section>

      {/* Success Popup Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-[#0d2a28] border border-white dark:border-slate-700 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiCheckCircle className="w-8 h-8 text-teal-500" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Application Submitted!
            </h3>
            <p className="text-gray-600 dark:text-slate-300 mb-6">
              Your application has been successfully submitted. You will be
              redirected to{" "}
              <span className="font-medium text-teal-500 cursor-pointer">My Applications</span>{" "}
              shortly.
            </p>

            <button
              onClick={() => (window.location.href = "/my-applications")}
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-8 py-2.5 rounded-xl transition"
            >
              Go to My Applications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplyJob;
