import {
  FiUser,
  FiClock,
  FiBriefcase,
  FiCreditCard,
  FiMapPin,
} from "react-icons/fi";

const JobOverview = ({ job }) => {
  // Format values such as full_time → Full Time
  const formatValue = (value) => {
    if (!value) return "Not specified";

    return String(value)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const items = [
    {
      icon: FiUser,
      label: "Job Title",
      value: job?.title,
    },
    {
      icon: FiClock,
      label: "Job Type",
      value: job?.employmentType,
    },
    {
      icon: FiBriefcase,
      label: "Category",
      value: job?.categoryName,
    },
    {
      icon: FiCreditCard,
      label: "Offered Salary",
      value: job?.salary,
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: job?.location,
    },
  ];

  return (
    <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/40 rounded-2xl p-5 md:p-6">
      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-5">
        Job Overview
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white dark:bg-teal-900/40 border border-teal-100 dark:border-teal-800 flex items-center justify-center shrink-0 text-teal-600 dark:text-teal-400">
                <Icon className="text-base" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                  {item.label}
                </p>

                <p className="text-sm font-semibold text-gray-800 dark:text-white leading-snug wrap-break-word">
                  {item.label === "Offered Salary"
                    ? item.value || "Negotiable"
                    : formatValue(item.value)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobOverview;
