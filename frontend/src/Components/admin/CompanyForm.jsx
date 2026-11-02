import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import jobsApi from "../../Api/api/JobApi.js";

const initialForm = {
  name: "",
  location: "",
  bio: "",
};

const CompanyForm = () => {
  const [form, setForm] = useState(initialForm);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(initialForm);

  // Fetch companies
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await jobsApi.get("v1/admin/companies/");
      const data = response.data;

      setCompanies(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError("Failed to load companies. Make sure you are logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Create company
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim()) {
      setError("Name and location are required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await jobsApi.post("v1/admin/companies/", {
        name: form.name.trim(),
        location: form.location.trim(),
        bio: form.bio.trim() || null,
      });

      setForm(initialForm);
      fetchCompanies();
    } catch (err) {
      const data = err.response?.data;
      if (data?.name) {
        setError(data.name[0]);
      } else {
        setError(data?.detail || "Could not create company.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Start editing
  const startEdit = (company) => {
    setEditingId(company.id);
    setEditForm({
      name: company.name || "",
      location: company.location || "",
      bio: company.bio || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(initialForm);
  };

  // Update company
  const handleUpdate = async (id) => {
    if (!editForm.name.trim() || !editForm.location.trim()) {
      setError("Name and location are required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await jobsApi.patch(`v1/admin/companies/${id}/`, {
        name: editForm.name.trim(),
        location: editForm.location.trim(),
        bio: editForm.bio.trim() || null,
      });

      setEditingId(null);
      setEditForm(initialForm);
      fetchCompanies();
    } catch (err) {
      const data = err.response?.data;
      setError(data?.name?.[0] || data?.detail || "Could not update company.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete company
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete company "${name}"? This will also affect related jobs.`)) {
      return;
    }

    try {
      await jobsApi.delete(`v1/admin/companies/${id}/`);
      fetchCompanies();
    } catch (err) {
      alert(err.response?.data?.detail || "Could not delete company.");
    }
  };

  // Simple avatar color
  const getAvatarColor = (name) => {
    const colors = [
      "bg-teal-600",
      "bg-blue-600",
      "bg-indigo-600",
      "bg-purple-600",
      "bg-pink-600",
      "bg-orange-500",
      "bg-emerald-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div
      id="add-company"
      className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm"
    >
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Manage Companies
      </h2>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30">
          {error}
        </p>
      )}

      {/* Create Form */}
      <form onSubmit={handleAdd} className="space-y-3 mb-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Company name *"
          className="w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
          disabled={submitting}
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          type="text"
          placeholder="Location *"
          className="w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
          disabled={submitting}
        />

        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows="2"
          placeholder="Short bio (optional)"
          className="w-full border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          disabled={submitting}
        />

        <button
          type="submit"
          disabled={submitting || !form.name.trim() || !form.location.trim()}
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition"
        >
          {submitting ? "Creating..." : "Add Company"}
        </button>
      </form>

      {/* Company List */}
      {loading ? (
        <p className="text-sm text-slate-500">Loading companies...</p>
      ) : companies.length === 0 ? (
        <p className="text-sm text-slate-400">No companies yet. Create one above.</p>
      ) : (
        <div className="space-y-2">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-[#071A19] text-sm"
            >
              {editingId === company.id ? (
                // Edit Mode
                <div className="flex-1 space-y-2">
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="w-full border border-teal-500 rounded px-2 py-1 text-sm dark:bg-[#071A19]"
                    placeholder="Company name"
                  />
                  <input
                    name="location"
                    value={editForm.location}
                    onChange={handleEditChange}
                    className="w-full border border-teal-500 rounded px-2 py-1 text-sm dark:bg-[#071A19]"
                    placeholder="Location"
                  />
                  <textarea
                    name="bio"
                    value={editForm.bio}
                    onChange={handleEditChange}
                    rows="2"
                    className="w-full border border-teal-500 rounded px-2 py-1 text-sm dark:bg-[#071A19] resize-none"
                    placeholder="Bio"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(company.id)}
                      className="text-green-600 hover:text-green-700 flex items-center gap-1 text-xs font-medium"
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-slate-500 hover:text-slate-700 flex items-center gap-1 text-xs"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg ${getAvatarColor(
                        company.name
                      )} text-white text-xs font-bold flex items-center justify-center`}
                    >
                      {company.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-200">
                        {company.name}
                      </p>
                      <p className="text-xs text-slate-400">{company.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-400">
                      {company.vacancy ?? 0} jobs
                    </span>
                    <button
                      onClick={() => startEdit(company)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(company.id, company.name)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyForm;