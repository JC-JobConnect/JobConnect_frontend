import {
  FiPenTool,
  FiLayers,
  FiMonitor,
  FiBriefcase,
  FiHome,
  FiTarget,
  FiBookOpen,
  FiDollarSign,
} from "react-icons/fi";

const categories = [
  {
    id: 1,
    name: "Art & Design",
    vacancies: "3500 Job Vacancy",
    icon: FiPenTool,
  },
  {
    id: 2,
    name: "UI/UX Design",
    vacancies: "750 Job Vacancy",
    icon: FiLayers,
  },
  {
    id: 3,
    name: "IT & Software",
    vacancies: "8520 Job Vacancy",
    icon: FiMonitor,
  },
  {
    id: 4,
    name: "Business Development",
    vacancies: "120 Job Vacancy",
    icon: FiBriefcase,
  },
  {
    id: 5,
    name: "Property",
    vacancies: "1200 Job Vacancy",
    icon: FiHome,
  },
  {
    id: 6,
    name: "Marketing",
    vacancies: "1920 Job Vacancy",
    icon: FiTarget,
  },
  {
    id: 7,
    name: "Education",
    vacancies: "10K Job Vacancy",
    icon: FiBookOpen,
  },
  {
    id: 8,
    name: "Accounting & Finance",
    vacancies: "2200 Job Vacancy",
    icon: FiDollarSign,
  },
];

const Category = () => {
  return (
    <section className="py-16 bg-white dark:bg-[#071A19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Browse Job <span className="text-teal-500">Category</span>
        </h2>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group relative bg-white dark:bg-[#0F2A28] rounded-2xl p-6 text-center shadow-sm border border-gray-100 dark:border-teal-900/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Active bottom border on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-400 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon */}
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-900/40 text-teal-500">
                  <Icon className="text-2xl" />
                </div>

                {/* Name */}
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">
                  {item.name}
                </h3>

                {/* Vacancies */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.vacancies}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;