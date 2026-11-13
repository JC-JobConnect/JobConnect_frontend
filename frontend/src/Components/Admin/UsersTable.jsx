
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaUserSlash,
  FaUserCheck,
  FaTrash,
  FaUsers,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";
import jobsApi from "../../Services/JobApi";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";

  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await jobsApi.get("v1/admin/users/");
      const list = Array.isArray(data) ? data : data.results || [];

      setUsers(list);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to load users. Make sure you are logged in as admin."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Toggle active / block user
  const handleToggleStatus = async (user) => {
    const newStatus = !user.is_active;

    const action = newStatus ? "unblock" : "block";

    if (
      !window.confirm(
        `Are you sure you want to ${action} "${user.username}"?`
      )
    ) {
      return;
    }

    setActionLoading(user.id);

    try {
      await jobsApi.patch(`v1/admin/users/${user.id}/`, {
        is_active: newStatus,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_active: newStatus } : u
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.detail || "Could not update user status."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // Delete user
  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${user.username}"?\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    setActionLoading(user.id);

    try {
      await jobsApi.delete(`v1/admin/users/${user.id}/`);

      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (err) {
      alert(err.response?.data?.detail || "Could not delete user.");
    } finally {
      setActionLoading(null);
    }
  };

  // Search users
  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();

    const fullName = `${user.first_name || ""} ${
      user.last_name || ""
    }`.toLowerCase();

    return (
      user.username?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      fullName.includes(search)
    );
  });

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-8 shadow-sm">
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
          <FaSyncAlt className="animate-spin text-teal-500" />
          <p className="text-sm">Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-red-200 dark:border-red-900/40 p-6 shadow-sm">
        <p className="text-sm text-red-500 mb-4">{error}</p>

        <button
          onClick={fetchUsers}
          className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-teal-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <FaUsers size={18} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  All Users
                </h2>

                <p className="text-xs text-slate-400 mt-0.5">
                  Manage registered users
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {filteredUsers.length} of {users.length} users
            </span>

            <button
              onClick={fetchUsers}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-teal-900/50 text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#071A19] transition"
              title="Refresh users"
            >
              <FaSyncAlt size={13} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-5 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, username or email..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071A19] border border-slate-200 dark:border-teal-900/40 text-sm text-slate-700 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[750px]">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-slate-400 bg-slate-50/70 dark:bg-[#071A19]/50 border-b border-slate-100 dark:border-teal-900/40">
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Joined</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-teal-900/30">
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-12 text-center text-slate-400"
                >
                  {searchTerm
                    ? "No users match your search."
                    : "No users found."}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-[#071A19]/50 transition-colors"
                >
                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 flex items-center justify-center text-sm font-bold">
                        {user.username?.charAt(0).toUpperCase() || "U"}
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 dark:text-white">
                          {user.username}
                        </p>

                        <p className="text-xs text-slate-400 mt-0.5">
                          {[
                            user.first_name,
                            user.last_name,
                          ]
                            .filter(Boolean)
                            .join(" ") || "No name provided"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    {user.email || "—"}
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {formatDate(user.date_joined)}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.is_active
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                          : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.is_active
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        }`}
                      />
                      {user.is_active ? "Active" : "Blocked"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-5">

                      {/* View Profile */}
                      <Link
                        to={`/admin/users/${user.id}`}
                        className="inline-flex items-center gap-1.5 text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 text-lg font-semibold transition whitespace-nowrap"
                      >
                        <FaEye size={13} />
                        View Profile
                      </Link>

                      {/* Block / Unblock */}
                      <button
                        onClick={() => handleToggleStatus(user)}
                        disabled={actionLoading === user.id}
                        className={`inline-flex items-center gap-1.5 text-lg font-semibold transition cursor-pointer whitespace-nowrap  ${
                          user.is_active
                            ? " text-amber-600 hover:text-amber-800 dark:text-amber-400 cursor-pointer"
                            : " text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 cursor-pointer"
                        }`}
                        title={user.is_active ? "Block user" : "Unblock user"}
                      >
                        {user.is_active ? (
                          <>
                            <FaUserSlash size={12} />
                            Block
                          </>
                        ) : (
                          <>
                            <FaUserCheck size={12} />
                            Unblock
                          </>
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(user)}
                        disabled={actionLoading === user.id}
                        className="inline-flex items-center gap-1.5 text-lg font-semibold text-red-500 hover:text-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                        title="Delete user"
                      >
                        <FaTrash size={12} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-100 dark:border-teal-900/40 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Showing {filteredUsers.length} users
        </p>

        <p className="text-xs text-slate-400">
          JobConnect Admin
        </p>
      </div>
    </div>
  );
};

export default UsersTable;
