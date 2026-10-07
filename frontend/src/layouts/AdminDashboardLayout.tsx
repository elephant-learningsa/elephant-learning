import { useState } from "react";
import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  FileCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  BarChart3,
  Settings,
  Users,
  UserRound,
  X,
} from "lucide-react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/Logo/Logo.png";

interface StoredUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
}

const mainNavigation = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
];

const educatorNavigation = [
  {
    label: "All Educators",
    path: "/admin/educators",
    icon: Users,
  },
  {
    label: "Pending Reviews",
    path: "/admin/educators/pending",
    icon: ClipboardList,
  },
  {
    label: "Verification",
    path: "/admin/educators/verification",
    icon: FileCheck,
  },
  {
    label: "Talent Pool",
    path: "/admin/educators/talent-pool",
    icon: UserRound,
  },
];

const schoolNavigation = [
  {
    label: "All Schools",
    path: "/admin/schools",
    icon: Building2,
  },
  {
    label: "Pending Requests",
    path: "/admin/schools/pending",
    icon: ClipboardList,
  },
  {
    label: "School Profiles",
    path: "/admin/schools/profiles",
    icon: Building2,
  },
];

const recruitmentNavigation = [
  {
    label: "Vacancies",
    path: "/admin/recruitment/vacancies",
    icon: BriefcaseBusiness,
  },
  {
    label: "Matching",
    path: "/admin/recruitment/matching",
    icon: Users,
  },
  {
    label: "Interviews",
    path: "/admin/recruitment/interviews",
    icon: CalendarDays,
  },
  {
    label: "Placements",
    path: "/admin/recruitment/placements",
    icon: BriefcaseBusiness,
  },
];

const managementNavigation = [
  {
    label: "Applications",
    path: "/admin/applications",
    icon: FileText,
  },
  {
    label: "Documents",
    path: "/admin/documents",
    icon: FileCheck,
  },
  {
    label: "Messages",
    path: "/admin/messages",
    icon: MessageSquare,
  },
  {
    label: "Reports",
    path: "/admin/reports",
    icon: BarChart3,
  },
];

function getStoredUser(): StoredUser | null {
  const storedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
}

export default function AdminDashboardLayout() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = getStoredUser();

  const firstName =
    user?.first_name?.trim() || "Administrator";

  const lastName =
    user?.last_name?.trim() || "";

  const fullName =
    `${firstName} ${lastName}`.trim();

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
    sessionStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const renderNavigation = (
    items: typeof mainNavigation,
  ) => {
    return items.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={closeMobileMenu}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-[#1769c2] text-white shadow-sm"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <Icon size={19} />
          <span>{item.label}</span>
        </NavLink>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col bg-[#0B1F3A] transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-24 items-center px-6">
          <Link
            to="/admin/dashboard"
            onClick={closeMobileMenu}
          >
            <img
              src={logo}
              alt="Elephant Learning"
              className="w-[185px] object-contain"
            />
          </Link>

          <button
            type="button"
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 lg:hidden"
            onClick={closeMobileMenu}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 pb-6">
          <div className="space-y-1">
            {renderNavigation(mainNavigation)}
          </div>

          {/* Educators */}
          <NavigationSection title="Educators">
            {renderNavigation(educatorNavigation)}
          </NavigationSection>

          {/* Schools */}
          <NavigationSection title="Schools">
            {renderNavigation(schoolNavigation)}
          </NavigationSection>

          {/* Recruitment */}
          <NavigationSection title="Recruitment">
            {renderNavigation(recruitmentNavigation)}
          </NavigationSection>

          {/* Management */}
          <NavigationSection title="Management">
            {renderNavigation(managementNavigation)}
          </NavigationSection>

          <div className="my-5 border-t border-white/10" />

          <NavLink
            to="/admin/settings"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-[#1769c2] text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={19} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-[270px]">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-[#0B1F3A] lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={21} />
            </button>

            <div className="ml-auto flex items-center gap-3">
              {/* Notifications */}
              <button
                type="button"
                onClick={() =>
                  navigate("/admin/notifications")
                }
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-[#0B1F3A] hover:bg-slate-50"
                aria-label="Notifications"
              >
                <Bell size={19} />

                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1769c2] px-1 text-[10px] font-bold text-white">
                  0
                </span>
              </button>

              {/* Admin profile */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen((open) => !open)
                  }
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 hover:bg-slate-50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf2fb] text-xs font-bold text-[#0B1F3A]">
                    {initials || "A"}
                  </div>

                  <div className="hidden text-left sm:block">
                    <p className="max-w-[150px] truncate text-sm font-semibold text-[#0B1F3A]">
                      {fullName}
                    </p>

                    <p className="text-xs text-slate-500">
                      Administrator
                    </p>
                  </div>

                  <ChevronDown
                    size={16}
                    className="text-slate-500"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                    <Link
                      to="/admin/settings"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Settings size={17} />
                      Settings
                    </Link>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      type="button"
                      onClick={logout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavigationSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="mb-2 px-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
        {title}
      </p>

      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}