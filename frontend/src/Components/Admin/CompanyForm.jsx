
import { useEffect, useRef, useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import jobsApi from "../../Services/JobApi.js";

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

  // Logo states
  const [logo, setLogo] = useState(null);
  const [editLogo, setEditLogo] = useState(null);

  // File input references
  const logoInputRef = useRef(null);
  const editLogoInputRef = useRef(null);

  // Fetch companies
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await jobsApi.get("v1/admin/companies/");
      const data = response.data;

      setCompanies(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError(
        "Failed to load companies. Make sure you are logged in as admin."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Handle create form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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

      const formData = new FormData();

      formData.append("name", form.name.trim());
      formData.append("location", form.location.trim());
      formData.append("bio", form.bio.trim());

      if (logo) {
        formData.append("logo", logo);
      }

      await jobsApi.post("v1/admin/companies/", formData);

      setForm(initialForm);
      setLogo(null);

      if (logoInputRef.current) {
        logoInputRef.current.value = "";
      }

      await fetchCompanies();
    } catch (err) {
      const data = err.response?.data;

      setError(
        data?.logo?.[0] ||
        data?.name?.[0] ||
        data?.location?.[0] ||
        data?.detail ||
        "Could not create company."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Start editing
  const startEdit = (company) => {
    setEditingId(company.id);
    setEditLogo(null);

    setEditForm({
      name: company.name || "",
      location: company.location || "",
      bio: company.bio || "",
    });

    if (editLogoInputRef.current) {
      editLogoInputRef.current.value = "";
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(initialForm);
    setEditLogo(null);

    if (editLogoInputRef.current) {
      editLogoInputRef.current.value = "";
    }
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

      const formData = new FormData();

      formData.append("name", editForm.name.trim());
      formData.append("location", editForm.location.trim());
      formData.append("bio", editForm.bio.trim());

      if (editLogo) {
        formData.append("logo", editLogo);
      }

      await jobsApi.patch(
        `v1/admin/companies/${id}/`,
        formData
      );

      setEditingId(null);
      setEditForm(initialForm);
      setEditLogo(null);

      if (editLogoInputRef.current) {
        editLogoInputRef.current.value = "";
      }

      await fetchCompanies();
    } catch (err) {
      const data = err.response?.data;

      setError(
        data?.logo?.[0] ||
        data?.name?.[0] ||
        data?.location?.[0] ||
        data?.detail ||
        "Could not update company."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Delete company
  const handleDelete = async (id, name) => {
    if (
      !window.confirm(
        `Delete company "${name}"? This will also affect related jobs.`
      )
    ) {
      return;
    }

    try {
      setError("");
      await jobsApi.delete(`v1/admin/companies/${id}/`);
      await fetchCompanies();
    } catch (err) {
      alert(err.response?.data?.detail || "Could not delete company.");
    }
  };

  // Avatar fallback colors
  const getAvatarColor = (name = "") => {
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

      {/* Error Message */}
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30">
          {error}
        </p>
      )}

      {/* Create Company Form */}
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

        {/* Company Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
            Company Logo (optional)
          </label>

          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files?.[0] || null)}
            disabled={submitting}
            className="w-full text-xs text-slate-500 bg-slate-100 dark:bg-[#0F2A28] border border-slate-200 dark:border-teal-800 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-teal-600 file:text-white file:font-medium file:cursor-pointer hover:file:bg-teal-700 transition"
          />

          {logo && (
            <div className="flex items-center gap-3 mt-3">
              <img
                src={URL.createObjectURL(logo)}
                alt="Selected company logo"
                className="w-12 h-12 object-contain rounded-lg border border-slate-200 bg-white p-1"
              />

              <div className="min-w-0">
                <p className="text-xs text-teal-600 truncate">
                  {logo.name}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setLogo(null);
                    if (logoInputRef.current) {
                      logoInputRef.current.value = "";
                    }
                  }}
                  className="text-xs text-red-500 hover:text-red-700 mt-1"
                >
                  Remove image
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={
            submitting ||
            !form.name.trim() ||
            !form.location.trim()
          }
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 cursor-pointer text-white font-semibold py-2.5 rounded-lg text-sm transition"
        >
          {submitting ? "Creating..." : "Add a Company"}
        </button>
      </form>

      {/* Company List */}
      {loading ? (
        <p className="text-sm text-slate-500">
          Loading companies...
        </p>
      ) : companies.length === 0 ? (
        <p className="text-sm text-slate-400">
          No companies yet. Create one above.
        </p>
      ) : (
        <div className="space-y-2">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex items-center justify-between gap-3 px-3 py-3 rounded-lg bg-slate-50 dark:bg-[#071A19] text-sm"
            >
              {editingId === company.id ? (
                /* Edit Mode */
                <div className="flex-1 space-y-3 min-w-0">
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="w-full border border-teal-500 rounded px-2 py-2 text-sm dark:bg-[#071A19]"
                    placeholder="Company name"
                    disabled={submitting}
                  />

                  <input
                    name="location"
                    value={editForm.location}
                    onChange={handleEditChange}
                    className="w-full border border-teal-500 rounded px-2 py-2 text-sm dark:bg-[#071A19]"
                    placeholder="Location"
                    disabled={submitting}
                  />

                  <textarea
                    name="bio"
                    value={editForm.bio}
                    onChange={handleEditChange}
                    rows="2"
                    className="w-full border border-teal-500 rounded px-2 py-2 text-sm dark:bg-[#071A19] resize-none"
                    placeholder="Bio"
                    disabled={submitting}
                  />

                  {/* Current Logo */}
                  {company.logo && (
                    <div>
                      <p className="text-xs text-slate-500 mb-2">
                        Current logo:
                      </p>

                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-14 h-14 object-contain rounded-lg border border-slate-200 bg-white p-1"
                      />
                    </div>
                  )}

                  {/* Replace Logo */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
                      Change Company Logo
                    </label>

                    <input
                      ref={editLogoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditLogo(e.target.files?.[0] || null)
                      }
                      disabled={submitting}
                      className="w-full text-xs text-slate-500 bg-slate-100 dark:bg-[#0F2A28] border border-slate-200 dark:border-teal-800 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-teal-600 file:text-white file:font-medium file:cursor-pointer hover:file:bg-teal-700 transition"
                    />

                    {editLogo && (
                      <div className="flex items-center gap-3 mt-2 ">
                        <img
                          src={URL.createObjectURL(editLogo)}
                          alt="New company logo preview"
                          className="w-12 h-12 object-contain rounded-lg border border-slate-200 bg-white p-1"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            setEditLogo(null);

                            if (editLogoInputRef.current) {
                              editLogoInputRef.current.value = "";
                            }
                          }}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Remove selection
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Edit Actions */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleUpdate(company.id)}
                      disabled={submitting}
                      className="text-green-600 hover:text-green-700 flex items-center gap-1 text-sm font-medium disabled:opacity-50"
                    >
                      <FaSave /> Save
                    </button>

                    <button
                      type="button"
                      onClick={cancelEdit}
                      disabled={submitting}
                      className="text-slate-500 hover:text-slate-700 flex items-center gap-1 text-sm disabled:opacity-50"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <>
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 shrink-0 rounded-lg ${getAvatarColor(
                        company.name
                      )} text-white text-xs font-bold flex items-center justify-center overflow-hidden`}
                    >
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="w-full h-full object-contain bg-white"
                        />
                      ) : (
                        company.name?.charAt(0).toUpperCase() || "?"
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium text-slate-700 dark:text-slate-200 truncate">
                        {company.name}
                      </p>

                      <p className="text-xs text-slate-400 truncate">
                        {company.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-slate-400">
                      {company.vacancy ?? 0} jobs
                    </span>

                    <button
                      type="button"
                      onClick={() => startEdit(company)}
                      className="text-yellow-400 hover:text-yellow-600 text-lg font-semibold cursor-pointer"
                      title="Edit"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(company.id, company.name)
                      }
                      className="text-red-400 hover:text-red-600 text-lg font-semibold cursor-pointer"
                      title="Delete"
                    >
                      Delete
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
