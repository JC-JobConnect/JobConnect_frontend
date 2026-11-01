import { NavLink } from "react-router-dom";

const links = [
  { path: "/admin", label: "Dashboard", icon: "📊", end: true },
  { path: "/admin/jobs", label: "Jobs", icon: "💼" },
  { path: "/admin/categories", label: "Categories", icon: "📁" },
  { path: "/admin/companies", label: "Companies", icon: "🏢" },
  { path: "/admin/applications", label: "Applications", icon: "📄" },
  { path: "/admin/users", label: "Users", icon: "👥" },
];

const quickActions = [
  { path: "/admin/jobs", label: "Post a Job", icon: "➕" },
  { path: "/admin/categories", label: "Add Category", icon: "🏷️" },
  { path: "/admin/companies", label: "Add Company", icon: "🏛️" },
];

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
      isActive
        ? "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-medium"
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-teal-900/20"
    }`;

  return (
    <aside className="hidden lg:flex w-64 bg-white dark:bg-[#0F2A28] border-r border-slate-200 dark:border-teal-900/40 flex-col sticky top-0 h-screen">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-100 dark:border-teal-900/40 flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center">
          JC
        </div>
        <div>
          <p className="font-bold text-slate-900 dark:text-white leading-tight">
            JobConnect
          </p>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Main
        </p>

        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.end}
            className={linkClass}
          >
            <span>{link.icon}</span> {link.label}
          </NavLink>
        ))}

        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-6">
          Quick Actions
        </p>

        {quickActions.map((link) => (
          <NavLink key={link.label} to={link.path} className={linkClass}>
            <span>{link.icon}</span> {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Admin info */}
      <div className="px-4 py-4 border-t border-slate-100 dark:border-teal-900/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Admin
            </p>
            <p className="text-xs text-slate-400">admin@jobconnect.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;