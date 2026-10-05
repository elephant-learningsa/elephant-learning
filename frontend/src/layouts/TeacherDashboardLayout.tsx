import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  X,
} from "lucide-react";

import logo from "../assets/Logo/Logo.png";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    path: "/teacher/profile",
    icon: User,
  },
  {
    label: "Documents",
    path: "/teacher/documents",
    icon: FileText,
  },
  {
    label: "Application Status",
    path: "/teacher/application-status",
    icon: GraduationCap,
  },
  {
    label: "Teaching Preferences",
    path: "/teacher/preferences",
    icon: BookOpen,
  },
  {
    label: "Technical Information",
    path: "/teacher/technical-information",
    icon: Settings,
  },
  {
    label: "Matched Opportunities",
    path: "/teacher/opportunities",
    icon: BriefcaseBusiness,
  },
  {
    label: "Messages",
    path: "/teacher/messages",
    icon: MessageSquare,
  },
  {
    label: "Notifications",
    path: "/teacher/notifications",
    icon: Bell,
  },
];

export default function TeacherDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const storedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const firstName = user?.first_name || "Teacher";
  const lastName = user?.last_name || "";
  const email = user?.email || "";

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
    sessionStorage.removeItem("user");

    navigate("/login");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <Link
            to="/teacher/dashboard"
            onClick={closeSidebar}
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Elephant Learning"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Teacher information */}
        <div className="border-b border-slate-100 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B1F3A] text-sm font-semibold text-white">
              {firstName.charAt(0).toUpperCase()}
              {lastName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {firstName} {lastName}
              </p>

              <p className="truncate text-xs text-slate-500">
                {email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Teacher Portal
          </p>

          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#0B1F3A] text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1F3A]"
                    }`
                  }
                >
                  <Icon size={19} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom navigation */}
        <div className="border-t border-slate-100 p-4">
          <NavLink
            to="/teacher/settings"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-100 text-[#0B1F3A]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1F3A]"
              }`
            }
          >
            <Settings size={19} strokeWidth={1.8} />
            <span>Account Settings</span>
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={19} strokeWidth={1.8} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:pl-72">
        {/* Top header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={24} />
            </button>

            {/* Desktop page identity */}
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-slate-500">
                Teacher Portal
              </p>

              <h1 className="text-lg font-semibold text-[#0B1F3A]">
                Elephant Learning
              </h1>
            </div>

            {/* Header actions */}
            <div className="ml-auto flex items-center gap-2 sm:gap-4">
              {/* Notifications */}
              <button
                type="button"
                className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-[#0B1F3A]"
                aria-label="Notifications"
                onClick={() => navigate("/teacher/notifications")}
              >
                <Bell size={21} strokeWidth={1.8} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-slate-100"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1F3A] text-xs font-semibold text-white">
                    {firstName.charAt(0).toUpperCase()}
                    {lastName.charAt(0).toUpperCase()}
                  </div>

                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold text-slate-800">
                      {firstName} {lastName}
                    </p>

                    <p className="text-xs text-slate-500">
                      Teacher
                    </p>
                  </div>

                  <ChevronDown
                    size={17}
                    className={`hidden text-slate-500 transition sm:block ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                    <Link
                      to="/teacher/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <User size={17} />
                      My Profile
                    </Link>

                    <Link
                      to="/teacher/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Settings size={17} />
                      Account Settings
                    </Link>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-5rem)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

