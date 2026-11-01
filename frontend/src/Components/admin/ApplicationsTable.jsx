import { useState } from "react";

const initialApps = [
  {
    id: 1,
    name: "Rahim Ahmed",
    email: "rahim@email.com",
    job: "Frontend Developer",
    date: "Apr 25, 2025",
    status: "Interview",
    initials: "RA",
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: 2,
    name: "Sara Khan",
    email: "sara@email.com",
    job: "Full Stack Developer",
    date: "Apr 20, 2025",
    status: "Pending",
    initials: "SK",
    color: "bg-violet-100 text-violet-700",
  },
  {
    id: 3,
    name: "Nabil Islam",
    email: "nabil@email.com",
    job: "UI/UX Designer",
    date: "Apr 18, 2025",
    status: "Reviewed",
    initials: "NI",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 4,
    name: "Farhan Hossain",
    email: "farhan@email.com",
    job: "Backend Developer",
    date: "Apr 15, 2025",
    status: "Rejected",
    initials: "FH",
    color: "bg-red-100 text-red-700",
  },
    {
    id: 5,
    name: "Ahmed",
    email: "rahim1@email.com",
    job: "Frontend Developer",
    date: "Apr 25, 2025",
    status: "Interview",
    initials: "RA",
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: 6,
    name: "Sara",
    email: "sara2@email.com",
    job: "Full Stack Developer",
    date: "Apr 20, 2025",
    status: "Pending",
    initials: "SK",
    color: "bg-violet-100 text-violet-700",
  },
  {
    id: 7,
    name: "Nabil Islam",
    email: "nabil@email.com",
    job: "UI/UX Designer",
    date: "Apr 18, 2025",
    status: "Reviewed",
    initials: "NI",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 8,
    name: "Farhan Hossain",
    email: "farhan@email.com",
    job: "Backend Developer",
    date: "Apr 15, 2025",
    status: "Rejected",
    initials: "FH",
    color: "bg-red-100 text-red-700",
  },
];

const statusColors = {
  Pending: "bg-amber-50 text-amber-600",
  Reviewed: "bg-emerald-50 text-emerald-600",
  Interview: "bg-blue-50 text-blue-600",
  Rejected: "bg-red-50 text-red-600",
};

const ApplicationsTable = () => {
  const [apps, setApps] = useState(initialApps);

  const handleStatusChange = (id, newStatus) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    // later: API call to update status
  };

  return (
    <div id="applications" className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Recent Applications
        </h2>
        <button className="text-sm text-teal-600 hover:underline">View all</button>
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
            {apps.map((app) => (
              <tr key={app.id}>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${app.color} flex items-center justify-center text-xs font-bold`}>
                      {app.initials}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{app.name}</p>
                      <p className="text-xs text-slate-400">{app.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-slate-700 dark:text-slate-300">{app.job}</td>
                <td className="py-3 text-slate-500">{app.date}</td>
                <td className="py-3">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className={`text-xs font-semibold rounded-full px-2.5 py-1 border-0 outline-none cursor-pointer ${statusColors[app.status]}`}
                  >
                    <option>Pending</option>
                    <option>Reviewed</option>
                    <option>Interview</option>
                    <option>Rejected</option>
                  </select>
                </td>
                <td className="py-3">
                  <button className="text-xs text-teal-600 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;