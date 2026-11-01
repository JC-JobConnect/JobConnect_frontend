import Sidebar from "../Components/admin/Sidebar";
import TopBar from "../Components/admin/TopBar";
import StatsCards from "../Components/admin/StatsCards";
import PostJobForm from "../Components/admin/PostJobForm";
import ApplicationsTable from "../Components/admin/ApplicationsTable";
import CategoryForm from "../Components/admin/CategoryForm";
import CompanyForm from "../Components/admin/CompanyForm";
import UsersTable from "../Components/admin/UsersTable";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#071A19]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <TopBar />

        <div className="p-6 lg:p-8 space-y-8">
          <StatsCards />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1">
              <PostJobForm />
            </div>
            <div className="xl:col-span-2">
              <ApplicationsTable />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryForm />
            <CompanyForm />
          </div>

          <UsersTable />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;