
import { useEffect, useState } from "react";
import JobsApi from "../../Api/api/JobApi";
import { MdStarOutline } from "react-icons/md";
import { FiUser,FiBriefcase } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";


const StatsCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await JobsApi.get("v1/admin/dashboard/");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard statistics:", error);
        setError("Unable to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading statistics...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!stats) {
    return <p className="text-slate-500">No statistics available.</p>;
  }

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      color: "bg-blue-100 text-blue-600",
      icon: <FiUser />,
    },
    {
      title: "Total Jobs",
      value: stats.total_jobs,
      color: "bg-green-100 text-green-600",
      icon: <FiBriefcase />,
    },
    {
      title: "Total Applications",
      value: stats.applications,
      color: "bg-purple-100 text-purple-600",
      icon: <IoDocumentTextOutline />,
    },
    {
      title: "Featured Jobs",
      value: stats.active_featured,
      color: "bg-orange-100 text-orange-600",
      icon: <MdStarOutline />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">{card.title}</p>

              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                {card.value ?? 0}
              </p>
            </div>

            <div
              className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center text-xl`}
            >
              {card.icon}
            </div>
          </div>


        </div>
      ))}
    </div>
  );
};

export default StatsCards;
