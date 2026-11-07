import { HiOutlineRefresh } from "react-icons/hi";
import Test from "../Components/Test";
import {
  FiGrid,
  FiSliders,
  FiMapPin,
  FiTrendingUp,
  FiChevronDown,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import jobsApi from "../Api/api/JobApi";

const experienceLevels = [
  { name: "Entry Level", value: "entry" },
  { name: "Mid Level", value: "mid" },
  { name: "Senior Level", value: "senior" },
];

const FilterSection = ({ title, icon, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-100 py-4 dark:border-white/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="flex items-center gap-2.5 text-sm font-bold text-gray-800 dark:text-white">
          {icon}
          {title}
        </span>
        <FiChevronDown
          className={`text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
};

const JobsFilter = ({ onFilterChange, jobsData = [] }) => {
  const [categories, setCategories] = useState([]);
  const locations = [
    ...new Set(jobsData.map((job) => job.location).filter(Boolean)),
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await jobsApi.get("v1/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Category load failed:", error);
      }
    };

    fetchCategories();
  }, []);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      locations: selectedLocations,
      experience: selectedExperience,
      minSalary,
      maxSalary,
    });
  }, [
    selectedCategories,
    selectedLocations,
    selectedExperience,
    minSalary,
    maxSalary,
    onFilterChange,
  ]);

  const toggleFilter = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedExperience([]);
    setMinSalary("");
    setMaxSalary("");
  };
  return (
    <aside className="w-full lg:w-72 shrink-0 ">
      <div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0F2A28] lg:sticky lg:top-24">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4 dark:border-white/10">
            <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
              <FiSliders className="text-teal-600 dark:text-teal-400" />
              Filter Jobs
            </h2>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-200 cursor-pointer"
            >
              Clear All
            </button>
          </div>

          {/* Categories */}
          <FilterSection
            title="Categories"
            icon={<FiGrid className="text-teal-600 dark:text-teal-400" />}
            defaultOpen={true}
          >
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() =>
                    toggleFilter(
                      cat.id,
                      selectedCategories,
                      setSelectedCategories,
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="flex-1">{cat.name}</span>
              </label>
            ))}
          </FilterSection>

          {/* Location */}
          <FilterSection
            title="Location"
            icon={<FiMapPin className="text-teal-600 dark:text-teal-400" />}
            defaultOpen={true}
          >
            {locations.map((loc) => (
              <label
                key={loc}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(loc)}
                  onChange={() =>
                    toggleFilter(loc, selectedLocations, setSelectedLocations)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="flex-1">{loc}</span>
              </label>
            ))}
          </FilterSection>

          {/* Experience Level */}
          <FilterSection
            title="Experience Level"
            icon={<FiTrendingUp className="text-teal-600 dark:text-teal-400" />}
            defaultOpen={true}
          >
            {experienceLevels.map((exp) => (
              <label
                key={exp.value}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  checked={selectedExperience.includes(exp.value)}
                  onChange={() =>
                    toggleFilter(
                      exp.value,
                      selectedExperience,
                      setSelectedExperience,
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span>{exp.name}</span>
              </label>
            ))}
          </FilterSection>
          {/* Salary Range */}
          <FilterSection
            title="Salary Range"
            icon={<FiTrendingUp className="text-teal-600 dark:text-teal-400" />}
          >
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Salary"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                className="w-full min-w-0 rounded-lg border border-gray-200 p-2 text-sm outline-none dark:bg-[#071A19] dark:text-white"
              />

              <input
                type="number"
                placeholder="Max Salary"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                className="w-full min-w-0 rounded-lg border border-gray-200 p-2 text-sm outline-none dark:bg-[#071A19] dark:text-white"
              />
            </div>
          </FilterSection>

          {/* Reset Button */}
          <button
            type="button"
            onClick={clearAll}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-teal-500 px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 dark:text-teal-300 dark:hover:bg-teal-900/30 cursor-pointer"
          >
            <HiOutlineRefresh className="h-4 w-4" />
            Reset Filters
          </button>
        </div>
      </div>
      <Test />
    </aside>
  );
};

export default JobsFilter;
