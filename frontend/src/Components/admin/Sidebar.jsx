import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FiBriefcase } from "react-icons/fi";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { MdOutlineMapsHomeWork } from "react-icons/md";

const links = [
  { path: "/admin", label: "Dashboard", icon: <MdSpaceDashboard />, end: true },
  { path: "/admin/jobs", label: "Jobs", icon: <FiBriefcase /> },
  { path: "/admin/categories", label: "Categories", icon: <IoFileTrayFullOutline /> },
  { path: "/admin/companies", label: "Companies", icon:<MdOutlineMapsHomeWork /> },
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
      </nav>

    </aside>
  );
};

export default Sidebar;