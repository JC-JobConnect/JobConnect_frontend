import CategoryForm from "../../Components/Admin/CategoryForm";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar";
import TopBar from "../../Components/Admin/TopBar";

const AdminCategory = () => {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-[#071A19]">
            <Sidebar />

            <main className="flex-1 overflow-y-auto">
                <TopBar />

                <div className="p-6 lg:p-8 space-y-6">
                    {/* Header + Back link */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                                Categories
                            </h1>
                            <p className="text-sm text-slate-400">
                                Create and manage job categories
                            </p>
                        </div>

                        <Link
                            to="/admin"
                            className="text-sm font-medium text-teal-600 hover:text-teal-700"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>

                    {/* Form */}
                    <div className="max-w-xl">
                        <CategoryForm />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdminCategory