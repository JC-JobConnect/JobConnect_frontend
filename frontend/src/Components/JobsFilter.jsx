import { HiOutlineRefresh } from "react-icons/hi";
import {
  FiGrid,
  FiSliders,
  FiMapPin,
  FiTrendingUp,
  FiChevronDown,
} from "react-icons/fi";
import { useState } from "react";

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

const JobsFilter = ({
  categories,
  locations,
  experienceLevels,
  selectedCategories,
  setSelectedCategories,
  selectedLocations,
  setSelectedLocations,
  selectedExperience,
  setSelectedExperience,
  clearAll,
}) => {
  const toggleFilter = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  return (
    <aside className="w-full shrink-0 lg:w-72">
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
            className="cursor-pointer text-xs font-semibold text-teal-700 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-200"
          >
            Clear All
          </button>
        </div>

        {/* Categories */}
        <FilterSection
          title="Categories"
          icon={<FiGrid className="text-teal-600 dark:text-teal-400" />}
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

              <span className="text-xs text-slate-400">({cat.count})</span>
            </label>
          ))}
        </FilterSection>

        {/* Location */}
        <FilterSection
          title="Location"
          icon={<FiMapPin className="text-teal-600 dark:text-teal-400" />}
        >
          {locations.map((loc) => (
            <label
              key={loc.name}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"
            >
              <input
                type="checkbox"
                checked={selectedLocations.includes(loc.name)}
                onChange={() =>
                  toggleFilter(
                    loc.name,
                    selectedLocations,
                    setSelectedLocations,
                  )
                }
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />

              <span className="flex-1">{loc.name}</span>

              <span className="text-xs text-slate-400">({loc.count})</span>
            </label>
          ))}
        </FilterSection>

        {/* Experience Level */}
        <FilterSection
          title="Experience Level"
          icon={<FiTrendingUp className="text-teal-600 dark:text-teal-400" />}
        >
          {experienceLevels.map((exp) => {
            const value = exp.value ?? exp.name;

            return (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  checked={selectedExperience.includes(value)}
                  onChange={() =>
                    toggleFilter(
                      value,
                      selectedExperience,
                      setSelectedExperience,
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />

                <span>{exp.label ?? exp.name}</span>
              </label>
            );
          })}
        </FilterSection>

        {/* Reset Button */}
        <button
          type="button"
          onClick={clearAll}
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-teal-500 px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 dark:text-teal-300 dark:hover:bg-teal-900/30"
        >
          <HiOutlineRefresh className="h-4 w-4" />
          Reset Filters
        </button>
      </div>
    </aside>
  );
};

export default JobsFilter;
