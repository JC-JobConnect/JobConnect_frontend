import { useEffect, useState } from "react";
import jobsApi from "../../Api/api/JobApi.js";

const initialForm = {
  title: "",
  company: "",
  category: "",
  location: "",
  salary: "",
  description: "",
  is_featured: false,
};

const PostJobForm = ({ initialJob, onSuccess }) => {
  const [form, setForm] = useState(initialForm);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(initialJob);

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

  useEffect(() => {
    if (initialJob) {
      setForm({
        title: initialJob.title || "",
        company: String(initialJob.company || ""),
        category: String(initialJob.category || ""),
        location: initialJob.location || "",
        salary: initialJob.salary ?? "",
        description: initialJob.description || "",
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
              `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`
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
    "mt-1 w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500";

  return (
    <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
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
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">
              Job Title
            </label>
            <input
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">
              Company
            </label>
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

          <div>
            <label className="text-xs font-semibold text-slate-500">
              Category
            </label>
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

          <div>
            <label className="text-xs font-semibold text-slate-500">
              Location
            </label>
            <input
              required
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Dhaka"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">
              Salary (BDT)
            </label>
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

          <div>
            <label className="text-xs font-semibold text-slate-500">
              Description
            </label>
            <textarea
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Job description..."
              className={`${inputClass} resize-none`}
            />
          </div>

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

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition"
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