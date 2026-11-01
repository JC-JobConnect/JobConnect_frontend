const TopBar = () => {
  return (
    <header className="bg-white dark:bg-[#0F2A28] border-b border-slate-200 dark:border-teal-900/40 px-6 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-slate-400">Welcome back, Admin</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 text-sm border border-slate-200 dark:border-teal-800 rounded-lg hover:bg-slate-50 dark:hover:bg-teal-900/30 text-slate-600 dark:text-slate-300">
          🔔 Notifications
        </button>
        <a
          href="#post-job"
          className="px-4 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium"
        >
          + Post Job
        </a>
      </div>
    </header>
  );
};

export default TopBar;