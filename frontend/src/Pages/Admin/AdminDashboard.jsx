import Sidebar from "../../Components/Admin/Sidebar";
import TopBar from "../../Components/Admin/TopBar";
import StatsCards from "../../Components/Admin/StatsCards";
import ApplicationsTable from "../../Components/Admin/ApplicationsTable";
import UsersTable from "../../Components/Admin/UsersTable";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#071A19]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <TopBar />

        <div className="p-6 lg:p-8 space-y-8">
          {/* Stats */}
          <StatsCards />

          {/* Applications */}
          <ApplicationsTable />

          {/* Users */}
          <UsersTable />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;