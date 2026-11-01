import { useState } from "react";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([
    { name: "Development", count: 320 },
    { name: "Design", count: 120 },
    { name: "Marketing", count: 98 },
    { name: "Sales", count: 78 },
  ]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCategories((prev) => [...prev, { name: name.trim(), count: 0 }]);
    setName("");
  };

  return (
    <div id="add-category" className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Create Category
      </h2>

      <form onSubmit={handleAdd} className="flex gap-3 mb-5">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Category name (e.g. Development)"
          className="flex-1 border border-slate-200 dark:border-teal-800 dark:bg-[#071A19] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition"
        >
          Add
        </button>
      </form>

      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#071A19] text-sm"
          >
            <span className="text-slate-700 dark:text-slate-200">{cat.name}</span>
            <span className="text-xs text-slate-400">{cat.count} jobs</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryForm;