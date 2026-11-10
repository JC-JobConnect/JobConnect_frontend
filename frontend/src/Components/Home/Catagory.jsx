import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiPenTool,
  FiLayers,
  FiMonitor,
  FiBriefcase,
  FiHome,
  FiTarget,
  FiBookOpen,
  FiDollarSign,
  FiGrid,
} from "react-icons/fi";
import jobsApi from "../../Services/JobApi"; 

const iconMap = {
  "art & design": FiPenTool,
  "ui/ux design": FiLayers,
  "it & software": FiMonitor,
  "business development": FiBriefcase,
  "property": FiHome,
  "marketing": FiTarget,
  "education": FiBookOpen,
  "accounting & finance": FiDollarSign,
};

const getIcon = (name = "") => {
  const key = name.toLowerCase().trim();
  return iconMap[key] || FiGrid; 
};

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await jobsApi.get("/v1/categories/");

        // Handle both array and paginated response
        const results = Array.isArray(data) ? data : data.results || [];

        const mapped = results.map((cat) => ({
          id: cat.id,
          name: cat.name,
          // If your API later returns job_count, use it
          vacancies: cat.job_count
            ? `${cat.job_count.toLocaleString()} Job Vacancy`
            : "Browse jobs",
          icon: getIcon(cat.name),
        }));

        setCategories(mapped);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-[#071A19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Browse Job By <span className="text-teal-500">Category</span>
        </h2>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl border border-gray-100 bg-gray-100 dark:border-teal-900/50 dark:bg-white/5"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center dark:border-red-900/40 dark:bg-red-900/20">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Category Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.length > 0 ? (
              categories.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.id}
                    to={`/jobs?category=${item.id}`}
                    className="block"
                  >
                    <div className="group relative bg-white dark:bg-[#0F2A28] rounded-2xl p-6 text-center shadow-sm border border-gray-100 dark:border-teal-900/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
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
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center dark:border-white/10">
                <p className="text-gray-500 dark:text-gray-400">
                  No categories available yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;