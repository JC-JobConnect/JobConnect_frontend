import { useState, useEffect } from "react";
import { FaTimes, FaUserSlash, FaUserCheck, FaTrash, } from "react-icons/fa";
import jobsApi from "../../Api/api/JobApi";

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
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
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
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Toggle active / block
  const handleToggleStatus = async (user) => {
    const newStatus = !user.is_active;

    // optimistic update
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, is_active: newStatus } : u
      )
    );

    if (selectedUser?.id === user.id) {
      setSelectedUser((prev) => ({ ...prev, is_active: newStatus }));
    }

    try {
      await jobsApi.patch(`v1/admin/users/${user.id}/`, {
        is_active: newStatus,
      });
    } catch (err) {
      // rollback
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_active: user.is_active } : u
        )
      );
      alert(err.response?.data?.detail || "Could not update user status.");
    }
  };

  // Delete user
  const handleDelete = async (user) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete "${user.username}"?\nThis action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setActionLoading(true);
      await jobsApi.delete(`v1/admin/users/${user.id}/`);

      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setSelectedUser(null);
    } catch (err) {
      alert(err.response?.data?.detail || "Could not delete user.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm">
        <p className="text-sm text-slate-500">Loading users...</p>
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
    <>
      <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              All Users
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Manage registered users
            </p>
          </div>
          <span className="text-sm text-slate-400">{users.length} users</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-100 dark:border-teal-900/40">
                <th className="pb-3 font-semibold">User</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold">Joined</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-teal-900/30">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-slate-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-[#071A19]/transition">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 flex items-center justify-center text-sm font-bold">
                          {user.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">
                            {user.username}
                          </p>
                          <p className="text-xs text-slate-400">
                            {[user.first_name, user.last_name]
                              .filter(Boolean)
                              .join(" ") || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 text-slate-600 dark:text-slate-300">
                      {user.email || "—"}
                    </td>

                    <td className="py-3.5 text-slate-500">
                      {formatDate(user.date_joined)}
                    </td>

                    <td className="py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.is_active
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                      >
                        {user.is_active ? "Active" : "Blocked"}
                      </span>
                    </td>

                    <td className="py-3.5">
                      <div className="flex items-center gap-5">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-teal-600 hover:text-teal-800 text-[16px] cursor-pointer"
                          title="View profile"
                        >
                          View Profile
                        </button>

                        <button
                          onClick={() => handleToggleStatus(user)}
                          className={
                            user.is_active
                              ? "text-amber-600 hover:text-amber-800 cursor-pointer text-[16px] "
                              : "text-emerald-600 hover:text-emerald-800 cursor-pointer text-[16px] "
                          }
                          title={user.is_active ? "Block user" : "Unblock user"}
                        >
                          {user.is_active ? (
                            "Block"
                          ) : (
                            "Unblock"
                          )}
                        </button>

                        <button
                          onClick={() => handleDelete(user)}
                          className="text-red-500 text-[16px]  hover:text-red-700 cursor-pointer"
                          title="Delete user"
                        >
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
      </div>

      {/* ========== USER PROFILE MODAL ========== */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedUser(null)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0F2A28] rounded-2xl shadow-xl border border-slate-200 dark:border-teal-900/40 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-teal-900/40">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                User Profile
              </h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#071A19] text-slate-500"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Avatar + Name */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 flex items-center justify-center text-2xl font-bold">
                  {selectedUser.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {selectedUser.username}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {[selectedUser.first_name, selectedUser.last_name]
                      .filter(Boolean)
                      .join(" ") || "No name provided"}
                  </p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-[#071A19] rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">Email</p>
                  <p className="font-medium text-slate-800 dark:text-white break-all">
                    {selectedUser.email || "—"}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-[#071A19] rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">Joined</p>
                  <p className="font-medium text-slate-800 dark:text-white">
                    {formatDate(selectedUser.date_joined)}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-[#071A19] rounded-xl p-4 col-span-2">
                  <p className="text-xs text-slate-400 mb-1">Status</p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedUser.is_active
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    }`}
                  >
                    {selectedUser.is_active ? "Active" : "Blocked"}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row gap-3 px-6 py-4 border-t border-slate-100 dark:border-teal-900/40 bg-slate-50 dark:bg-[#071A19]">
              <button
                onClick={() => handleToggleStatus(selectedUser)}
                disabled={actionLoading}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition ${
                  selectedUser.is_active
                    ? "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300"
                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300"
                }`}
              >
                {selectedUser.is_active ? (
                  <>
                    <FaUserSlash /> Block User
                  </>
                ) : (
                  <>
                    <FaUserCheck /> Unblock User
                  </>
                )}
              </button>

              <button
                onClick={() => handleDelete(selectedUser)}
                disabled={actionLoading}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 transition"
              >
                <FaTrash /> Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersTable;