import { useState } from "react";

const CompanyForm = () => {
  const [form, setForm] = useState({ name: "", website: "", location: "" });
  const [companies, setCompanies] = useState([
    { name: "TechFlow Ltd.", jobs: 12, logo: "T", color: "bg-gray-900" },
    { name: "NextGen Solutions", jobs: 8, logo: "N", color: "bg-blue-600" },
    { name: "Creative Minds", jobs: 5, logo: "C", color: "bg-lime-500" },
  ]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setCompanies((prev) => [
      ...prev,
      {
        name: form.name.trim(),
        jobs: 0,
        logo: form.name.trim().charAt(0).toUpperCase(),
        color: "bg-teal-600",
      },
    ]);
    setForm({ name: "", website: "", location: "" });
  };

  return (
    <div id="add-company" className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Create Company
      </h2>

      <form onSubmit={handleAdd} className="space-y-3 mb-5">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Company name"
          className="w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          name="website"
          value={form.website}
          onChange={handleChange}
          type="text"
          placeholder="Website (optional)"
          className="w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
        />
        <div className="flex gap-3">
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            type="text"
            placeholder="Location"
            className="flex-1 border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {companies.map((c) => (
          <div
            key={c.name}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#071A19] text-sm"
          >
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg ${c.color} text-white text-xs font-bold flex items-center justify-center`}>
                {c.logo}
              </div>
              <span className="text-slate-700 dark:text-slate-200">{c.name}</span>
            </div>
            <span className="text-xs text-slate-400">{c.jobs} jobs</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyForm;