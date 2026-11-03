import Sidebar from "../Components/admin/Sidebar";
import TopBar from "../Components/admin/TopBar";
import StatsCards from "../Components/admin/StatsCards";
import ApplicationsTable from "../Components/admin/ApplicationsTable";
import UsersTable from "../Components/admin/UsersTable";

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