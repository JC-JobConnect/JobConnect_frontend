
import { useEffect, useState } from "react";
import jobsApi from "../../Services/JobApi.js";

const initialForm = {
  title: "",
  company: "",
  category: "",
  location: "",
  salary: "",
  description: "",
  job_type: "full_time",
  work_mode: "onsite",
  experience_level: "entry",
  responsibilities: "",
  requirements: "",
  is_featured: false,
};

const JOB_TYPES = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "remote", label: "Remote" },
  { value: "internship", label: "Internship" },
  { value: "contract", label: "Contract" },
];

const WORK_MODES = [
  { value: "onsite", label: "On-site" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" },
];

const PostJobForm = ({ initialJob, onSuccess }) => {
  const [form, setForm] = useState(initialForm);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(initialJob);

  // Fetch companies and categories
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoadingOptions(true);

        const [companyResponse, categoryResponse] = await Promise.all([
          jobsApi.get("v1/companies/"),
          jobsApi.get("v1/categories/"),
        ]);

        const companyData = companyResponse.data;
        const categoryData = categoryResponse.data;

        setCompanies(
          Array.isArray(companyData)
            ? companyData
            : companyData.results || []
        );

        setCategories(
          Array.isArray(categoryData)
            ? categoryData
            : categoryData.results || []
        );
      } catch (err) {
        setError("Could not load companies or categories.");
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  // Populate form when editing
  useEffect(() => {
    if (initialJob) {
      setForm({
        title: initialJob.title || "",
        company: String(initialJob.company || ""),
        category: String(initialJob.category || ""),
        location: initialJob.location || "",
        salary: initialJob.salary ?? "",
        description: initialJob.description || "",
        job_type: initialJob.job_type || "full_time",
        work_mode: initialJob.work_mode || "onsite",
        experience_level: initialJob.experience_level || "entry",

        responsibilities: Array.isArray(initialJob.responsibilities)
          ? initialJob.responsibilities.join("\n")
          : "",

        requirements: Array.isArray(initialJob.requirements)
          ? initialJob.requirements.join("\n")
          : "",

        is_featured: initialJob.is_featured || false,
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [initialJob]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Convert multiline text into JSON arrays
  const convertToArray = (value) => {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.company || !form.category) {
      setError("Please select a company and category.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      company: Number(form.company),
      category: Number(form.category),
      location: form.location.trim(),
      salary: form.salary === "" ? null : form.salary,
      description: form.description.trim(),

      job_type: form.job_type,
      work_mode: form.work_mode,
      experience_level: form.experience_level,

      responsibilities: convertToArray(form.responsibilities),
      requirements: convertToArray(form.requirements),

      is_featured: form.is_featured,
    };

    try {
      setSubmitting(true);

      if (isEditing) {
        await jobsApi.patch(
          `v1/admin/jobs/${initialJob.id}/`,
          payload
        );
      } else {
        await jobsApi.post("v1/admin/jobs/", payload);
      }

      setForm(initialForm);
      onSuccess?.();

    } catch (err) {
      const responseData = err.response?.data;

      if (responseData && typeof responseData === "object") {
        setError(
          Object.entries(responseData)
            .map(([field, messages]) =>
              `${field}: ${
                Array.isArray(messages)
                  ? messages.join(", ")
                  : typeof messages === "object"
                    ? JSON.stringify(messages)
                    : messages
              }`
            )
            .join(" | ")
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 dark:border-teal-800 dark:bg-[#071A19]";

  const labelClass =
    "text-xs font-semibold text-slate-500 dark:text-slate-300";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-teal-900/40 dark:bg-[#0F2A28]">

      <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
        {isEditing ? "Edit Job" : "Post a Job"}
      </h2>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30">
          {error}
        </p>
      )}

      {loadingOptions ? (
        <p className="text-sm text-slate-500">
          Loading companies and categories...
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Job Title */}
          <div>
            <label className={labelClass}>Job Title</label>
            <input
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className={inputClass}
            />
          </div>

          {/* Company */}
          <div>
            <label className={labelClass}>Company</label>
            <select
              required
              name="company"
              value={form.company}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>Category</label>
            <select
              required
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>Location</label>
            <input
              required
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Dhaka"
              className={inputClass}
            />
          </div>

          {/* Salary */}
          <div>
            <label className={labelClass}>Salary (BDT)</label>
            <input
              name="salary"
              type="number"
              min="0"
              step="0.01"
              value={form.salary}
              onChange={handleChange}
              placeholder="40000"
              className={inputClass}
            />
          </div>

          {/* Job Type */}
          <div>
            <label className={labelClass}>Job Type</label>
            <select
              name="job_type"
              value={form.job_type}
              onChange={handleChange}
              className={inputClass}
            >
              {JOB_TYPES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <label className={labelClass}>Work Mode</label>
            <select
              name="work_mode"
              value={form.work_mode}
              onChange={handleChange}
              className={inputClass}
            >
              {WORK_MODES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <label className={labelClass}>Experience Level</label>
            <select
              name="experience_level"
              value={form.experience_level}
              onChange={handleChange}
              className={inputClass}
            >
              {EXPERIENCE_LEVELS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the job..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className={labelClass}>
              Responsibilities
            </label>
            <textarea
              name="responsibilities"
              value={form.responsibilities}
              onChange={handleChange}
              rows="4"
              placeholder={"Write each responsibility on a new line"}
              className={`${inputClass} resize-y`}
            />
            <p className="mt-1 text-xs text-slate-400">
              Enter each responsibility on a separate line.
            </p>
          </div>

          {/* Requirements */}
          <div>
            <label className={labelClass}>Requirements</label>
            <textarea
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              rows="4"
              placeholder={"Write each requirement on a new line"}
              className={`${inputClass} resize-y`}
            />
            <p className="mt-1 text-xs text-slate-400">
              Enter each requirement on a separate line.
            </p>
          </div>

          {/* Featured Job */}
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input
              name="is_featured"
              type="checkbox"
              checked={form.is_featured}
              onChange={handleChange}
              className="rounded text-teal-600"
            />
            Featured Job
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full cursor-pointer rounded-lg bg-teal-600 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
          >
            {submitting
              ? "Saving..."
              : isEditing
                ? "Update Job"
                : "Publish Job"}
          </button>

        </form>
      )}
    </div>
  );
};

export default PostJobForm;
