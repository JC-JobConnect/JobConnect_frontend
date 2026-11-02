import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import jobsApi from "../../Api/api/JobApi.js";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      // Use admin endpoint so we get full control
      const response = await jobsApi.get("v1/admin/categories/");
      const data = response.data;

      setCategories(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError("Failed to load categories. Make sure you are logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create category
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      setError("");

      await jobsApi.post("v1/admin/categories/", {
        name: name.trim(),
      });

      setName("");
      fetchCategories(); // refresh list
    } catch (err) {
      const msg =
        err.response?.data?.name?.[0] ||
        err.response?.data?.detail ||
        "Could not create category.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Start editing
  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  // Update category
  const handleUpdate = async (id) => {
    if (!editName.trim()) return;

    try {
      setSubmitting(true);
      setError("");

      await jobsApi.patch(`v1/admin/categories/${id}/`, {
        name: editName.trim(),
      });

      setEditingId(null);
      setEditName("");
      fetchCategories();
    } catch (err) {
      const msg =
        err.response?.data?.name?.[0] ||
        err.response?.data?.detail ||
        "Could not update category.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete category
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"? This cannot be undone.`)) {
      return;
    }

    try {
      await jobsApi.delete(`v1/admin/categories/${id}/`);
      fetchCategories();
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Could not delete category. It may be used by existing jobs."
      );
    }
  };

  return (
    <div
      id="add-category"
      className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm"
    >
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Manage Categories
      </h2>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30">
          {error}
        </p>
      )}

      {/* Create Form */}
      <form onSubmit={handleAdd} className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Category name (e.g. Development)"
          className="flex-1 border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting || !name.trim()}
          className="bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold px-5 py-2 rounded-lg text-sm transition"
        >
          {submitting ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Category List */}
      {loading ? (
        <p className="text-sm text-slate-500">Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="text-sm text-slate-400">No categories yet. Create one above.</p>
      ) : (
        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-[#071A19] text-sm"
            >
              {editingId === cat.id ? (
                // Edit mode
                <div className="flex items-center gap-2 flex-1">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 border border-teal-500 rounded px-2 py-1 text-sm dark:bg-[#071A19]"
                    autoFocus
                  />
                  <button
                    onClick={() => handleUpdate(cat.id)}
                    className="text-green-600 hover:text-green-700"
                    title="Save"
                  >
                    <FaSave />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-slate-500 hover:text-slate-700"
                    title="Cancel"
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                // View mode
                <>
                  <span className="text-slate-700 dark:text-slate-200 font-medium">
                    {cat.name}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => startEdit(cat)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
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

export default CategoryForm;