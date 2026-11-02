const ProfileSidebar = () => {
  return (
    <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm dark:border-teal-900/60 dark:bg-[#0B2421]">

      {/* Profile Picture */}
      <div className="flex justify-center">
        <img
          src="https://placehold.co/120x120"
          alt="Profile"
          className="h-28 w-28 rounded-full border-4 border-teal-100 object-cover"
        />
      </div>

      {/* User Information */}
      <div className="mt-4 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Full Name
        </h2>

        <p className="mt-1 text-sm text-teal-600">
          Junior Frontend Developer
        </p>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Dhaka, Bangladesh
        </p>
      </div>

      {/* Profile Completion */}
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Profile Completion
          </span>

          <span className="font-semibold text-teal-600">
            60%
          </span>
        </div>

        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-teal-900">
          <div className="h-2 w-3/5 rounded-full bg-teal-500"></div>
        </div>
      </div>

      {/* Edit Button */}
      <button className="mt-6 w-full cursor-pointer rounded-xl bg-teal-500 px-5 py-3 font-semibold text-white shadow-md shadow-teal-500/20 transition hover:bg-teal-600">
        Edit Profile
      </button>

    </div>
  );
};

export default ProfileSidebar;