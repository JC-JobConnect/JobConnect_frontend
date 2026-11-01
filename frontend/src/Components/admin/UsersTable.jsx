const users = [
  { name: "Rahim Ahmed", email: "rahim@email.com", joined: "Jan 12, 2025", apps: 5, status: "Active" },
  { name: "Sara Khan", email: "sara@email.com", joined: "Feb 3, 2025", apps: 3, status: "Active" },
  { name: "Nabil Islam", email: "nabil@email.com", joined: "Mar 18, 2025", apps: 2, status: "Inactive" },
];

const UsersTable = () => {
  return (
    <div id="users" className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          className="border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 w-56"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 border-b border-slate-100 dark:border-teal-900/40">
              <th className="pb-3 font-semibold">User</th>
              <th className="pb-3 font-semibold">Email</th>
              <th className="pb-3 font-semibold">Joined</th>
              <th className="pb-3 font-semibold">Applications</th>
              <th className="pb-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-teal-900/30">
            {users.map((user) => (
              <tr key={user.email}>
                <td className="py-3 font-medium text-slate-800 dark:text-white">{user.name}</td>
                <td className="py-3 text-slate-500">{user.email}</td>
                <td className="py-3 text-slate-500">{user.joined}</td>
                <td className="py-3">{user.apps}</td>
                <td className="py-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      user.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;