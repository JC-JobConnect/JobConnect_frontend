import Sidebar from "../../Components/admin/Sidebar";
import TopBar from "../../Components/admin/TopBar";
import PostJobForm from "../../Components/admin/PostJobForm";
import jobsApi from "../../Api/api/JobApi.js";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaCheckCircle,
  FaStar,
  FaSyncAlt,
} from "react-icons/fa";



const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await jobsApi.get("v1/admin/jobs/");
      const data = response.data;

      setJobs(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError("Unable to load jobs. Please check your admin access.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      await jobsApi.delete(`v1/admin/jobs/${id}/`);
      fetchJobs();
    } catch (err) {
      alert("Could not delete this job.");
    }
  };

  const handleToggleStatus = async (job) => {
    try {
      await jobsApi.patch(`v1/admin/jobs/${job.id}/`, {
        is_active: !job.is_active,
      });

      fetchJobs();
    } catch (err) {
      alert("Could not update job status.");
    }
  };

  const handleFormSuccess = () => {
    setEditingJob(null);
    fetchJobs();
  };

  const activeJobs = jobs.filter((job) => job.is_active).length;
  const featuredJobs = jobs.filter((job) => job.is_featured).length;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#071A19]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <TopBar />

        <div className="space-y-6 p-4 sm:p-6 lg:p-8">

          {/* Page Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Link to="/admin" className="hover:text-teal-600">
                  Dashboard
                </Link>
                <span>/</span>
                <span className="text-teal-600">Jobs</span>
              </div>

              <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                Job Management
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Create, update and manage all job postings.
              </p>
            </div>

            <button
              onClick={fetchJobs}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-teal-500 hover:text-teal-600 dark:border-teal-900 dark:bg-[#0F2A28] dark:text-slate-300"
            >
              <FaSyncAlt className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-teal-900/40 dark:bg-[#0F2A28]">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/30">
                <FaBriefcase size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Jobs</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {jobs.length}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-teal-900/40 dark:bg-[#0F2A28]">
              <div className="rounded-lg bg-green-50 p-3 text-green-600 dark:bg-green-900/30">
                <FaCheckCircle size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Active Jobs</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {activeJobs}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-teal-900/40 dark:bg-[#0F2A28]">
              <div className="rounded-lg bg-amber-50 p-3 text-amber-600 dark:bg-amber-900/30">
                <FaStar size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Featured Jobs</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {featuredJobs}
                </h3>
              </div>
            </div>
          </div>

          {/* Main Content: Form + Job List */}
          <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(340px,0.85fr)_minmax(0,1.65fr)]">

            {/* Job Form */}
            <section className="min-w-0">
              <PostJobForm
                initialJob={editingJob}
                onSuccess={handleFormSuccess}
              />

              {editingJob && (
                <button
                  onClick={() => setEditingJob(null)}
                  className="mt-3 w-full rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-teal-900 dark:text-slate-300 dark:hover:bg-[#0F2A28]"
                >
                  Cancel Editing
                </button>
              )}
            </section>

            {/* Jobs Table */}
            <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-teal-900/40 dark:bg-[#0F2A28]">

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5 dark:border-teal-900/40">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    All Job Postings
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Manage your published job opportunities
                  </p>
                </div>

                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                  {jobs.length} Jobs
                </span>
              </div>

              {error && (
                <div className="m-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="p-10 text-center text-sm text-slate-400">
                  Loading jobs...
                </div>
              ) : jobs.length === 0 ? (
                <div className="p-10 text-center">
                  <FaBriefcase className="mx-auto mb-3 text-3xl text-slate-300" />
                  <p className="font-semibold text-slate-700 dark:text-white">
                    No jobs available
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Create your first job using the form.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-[#071A19]">
                      <tr>
                        <th className="whitespace-nowrap px-5 py-4">Job Details</th>
                        <th className="whitespace-nowrap px-5 py-4">Company</th>
                        <th className="whitespace-nowrap px-5 py-4">Status</th>
                        <th className="whitespace-nowrap px-5 py-4">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 dark:divide-teal-900/40">
                      {jobs.map((job) => (
                        <tr
                          key={job.id}
                          className="transition hover:bg-slate-50 dark:hover:bg-[#071A19]"
                        >
                          <td className="min-w-48 px-5 py-4">
                            <p className="font-semibold text-slate-800 dark:text-white">
                              {job.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {job.category_name || "Uncategorized"} · {job.location}
                            </p>
                            {job.is_featured && (
                              <span className="mt-2 inline-block rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                                Featured
                              </span>
                            )}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 text-slate-600 dark:text-slate-300">
                            {job.company_name || "—"}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              job.is_active
                                ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                            }`}>
                              {job.is_active ? "Active" : "Inactive"}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-5 py-4">
                            <div className="flex items-center gap-3">
                              <button
                                title="Edit job"
                                onClick={() => setEditingJob(job)}
                                className="text-blue-600 transition hover:text-blue-800 text-lg font-semibold cursor-pointer"
                              >
                                Edit
                              </button>

                              <button
                                title={job.is_active ? "Deactivate" : "Activate"}
                                onClick={() => handleToggleStatus(job)}
                                className="text-amber-600 transition hover:text-amber-800 text-lg font-semibold cursor-pointer"
                              >
                                {job.is_active ? "Deactivate" : "Activate"}
                              </button>

                              <button
                                title="Delete job"
                                onClick={() => handleDelete(job.id)}
                                className="text-red-400 transition hover:text-red-700 text-lg font-semibold cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminJobs;
