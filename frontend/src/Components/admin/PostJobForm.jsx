import { useState } from "react";

const PostJobForm = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    category: "",
    type: "Full Time",
    location: "",
    salary: "",
    description: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post job:", form);
    // later: API call
  };

  return (
    <div id="post-job" className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Post a Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-500">Job Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Frontend Developer"
            className="mt-1 w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500">Company</label>
          <select
            name="company"
            value={form.company}
            onChange={handleChange}
            className="mt-1 w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select company</option>
            <option>TechFlow Ltd.</option>
            <option>NextGen Solutions</option>
            <option>Creative Minds</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select category</option>
            <option>Development</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">Job Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="mt-1 w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Remote</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              type="text"
              placeholder="Dhaka"
              className="mt-1 w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500">Salary Range</label>
          <input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            type="text"
            placeholder="৳40,000 - ৳70,000"
            className="mt-1 w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            placeholder="Job description..."
            className="mt-1 w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input
            name="featured"
            type="checkbox"
            checked={form.featured}
            onChange={handleChange}
            className="rounded text-teal-600"
          />
          Featured Job
        </label>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg text-sm transition"
        >
          Publish Job
        </button>
      </form>
    </div>
  );
};

export default PostJobForm;