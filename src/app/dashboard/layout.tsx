import Link from "next/link";
import { LayoutDashboard, Users, Package, FileText, Settings, LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <Package className="w-6 h-6" />
            ShipSupply
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </Link>
          <Link href="/dashboard/products" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 transition-colors">
            <Package className="w-5 h-5" />
            Products
          </Link>
          <Link href="/dashboard/posts" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 transition-colors">
            <FileText className="w-5 h-5" />
            Posts
          </Link>
          <Link href="/dashboard/users" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 transition-colors">
            <Users className="w-5 h-5" />
            Users
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <form action={logout}>
            <button type="submit" className="flex w-full items-center gap-3 px-3 py-2 text-red-600 rounded-md hover:bg-red-50 transition-colors">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold">
              A
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
