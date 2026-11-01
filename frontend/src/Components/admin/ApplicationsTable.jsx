import { useState, useEffect } from "react";
import JobsApi from "../../Api/api/JobApi";

const statusColors = {
  pending: "bg-amber-50 text-amber-600",
  accepted: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
};

const colorOptions = [
  "bg-teal-100 text-teal-700",
  "bg-violet-100 text-violet-700",
  "bg-orange-100 text-orange-700",
  "bg-blue-100 text-blue-700",
  "bg-pink-100 text-pink-700",
];

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const ApplicationsTable = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch applications
  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await JobsApi.get("v1/admin/applications/");

        const list = Array.isArray(data) ? data : data.results || [];

        const mapped = list.map((app, index) => ({
          id: app.id,
          name: app.full_name || app.applicant_username || "Unknown",
          email: app.email,
          job: app.job_title,
          company: app.company,
          date: formatDate(app.applied_at),
          status: app.status, 
          initials: getInitials(app.full_name || app.applicant_username || "U"),
          color: colorOptions[index % colorOptions.length],
          cover_letter: app.cover_letter,
        }));

        setApps(mapped);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            err.message ||
            "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    const previousApps = apps;

    // optimistic update
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );

    try {
      await JobsApi.patch(`v1/admin/applications/${id}/status/`, {
        status: newStatus,
      });
    } catch (err) {
      console.error(err);
      setApps(previousApps); 
      alert(
        err.response?.data?.detail ||
          "Could not update status. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm">
        <p className="text-sm text-slate-500">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div
      id="applications"
      className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Recent Applications
        </h2>
        <span className="text-sm text-slate-400">{apps.length} total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 border-b border-slate-100 dark:border-teal-900/40">
              <th className="pb-3 font-semibold">Applicant</th>
              <th className="pb-3 font-semibold">Job</th>
              <th className="pb-3 font-semibold">Applied</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-teal-900/30">
            {apps.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-400">
                  No applications yet.
                </td>
              </tr>
            ) : (
              apps.map((app) => (
                <tr key={app.id}>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full ${app.color} flex items-center justify-center text-xs font-bold`}
                      >
                        {app.initials}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">
                          {app.name}
                        </p>
                        <p className="text-xs text-slate-400">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-slate-700 dark:text-slate-300">
                    <div>
                      <p>{app.job}</p>
                      {app.company && (
                        <p className="text-xs text-slate-400">{app.company}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 text-slate-500">{app.date}</td>
                  <td className="py-3">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value)
                      }
                      className={`text-xs font-semibold rounded-full px-2.5 py-1 border-0 outline-none cursor-pointer ${
                        statusColors[app.status] || statusColors.pending
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3">
                    <button className="text-xs text-teal-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;