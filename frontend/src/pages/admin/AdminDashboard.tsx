import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck,
  FileText,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/auth";

interface CurrentUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
}

function getAccessToken() {
  return (
    localStorage.getItem("access") ||
    sessionStorage.getItem("access")
  );
}

function getStoredUser(): CurrentUser | null {
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

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] =
    useState<CurrentUser | null>(getStoredUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = getAccessToken();

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/me/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 401) {
          localStorage.clear();
          sessionStorage.clear();

          navigate("/login", { replace: true });
          return;
        }

        if (response.ok) {
          const data = await response.json();

          setUser(data);

          localStorage.setItem(
            "user",
            JSON.stringify(data),
          );
        }
      } catch (error) {
        console.error(
          "Unable to load administrator:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  const firstName =
    user?.first_name?.trim() || "Administrator";

  return (
    <div className="min-h-full bg-[#f7f9fc]">
      <div className="mx-auto max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
            Welcome back,{" "}
            {loading ? "..." : firstName}!
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Here's what's happening across Elephant Learning.
          </p>
        </div>

        {/* Overview statistics */}
        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStat
            icon={<Users size={21} />}
            value="0"
            title="Educators"
            subtitle="Registered educators"
            href="/admin/educators"
          />

          <AdminStat
            icon={<Clock3 size={21} />}
            value="0"
            title="Pending Reviews"
            subtitle="Educators awaiting review"
            href="/admin/educators/pending"
          />

          <AdminStat
            icon={<Building2 size={21} />}
            value="0"
            title="Active Schools"
            subtitle="Schools on the platform"
            href="/admin/schools"
          />

          <AdminStat
            icon={<BriefcaseBusiness size={21} />}
            value="0"
            title="New Vacancies"
            subtitle="Open recruitment requests"
            href="/admin/recruitment/vacancies"
          />
        </section>

        {/* Quick actions */}
        <section className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              Recruitment Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage the main stages of the Elephant Learning
              recruitment process.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <PipelineItem
              number="01"
              title="Educators"
              description="Review educator profiles"
              href="/admin/educators"
            />

            <PipelineItem
              number="02"
              title="Verification"
              description="Verify qualifications"
              href="/admin/educators/verification"
            />

            <PipelineItem
              number="03"
              title="Talent Pool"
              description="Manage approved educators"
              href="/admin/educators/talent-pool"
            />

            <PipelineItem
              number="04"
              title="Matching"
              description="Match educators to schools"
              href="/admin/recruitment/matching"
            />

            <PipelineItem
              number="05"
              title="Interviews"
              description="Manage interviews"
              href="/admin/recruitment/interviews"
            />

            <PipelineItem
              number="06"
              title="Placements"
              description="Track placements"
              href="/admin/recruitment/placements"
            />
          </div>
        </section>

        {/* Activity */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Educator activity */}
          <ActivityCard
            title="Recent Educator Registrations"
            subtitle="The latest educators joining the talent pool."
            action="View All Educators"
            href="/admin/educators"
            icon={<Users size={20} />}
          >
            <EmptyActivity
              icon={<Users size={22} />}
              title="No educator registrations yet"
              description="New educator registrations will appear here."
            />
          </ActivityCard>

          {/* School activity */}
          <ActivityCard
            title="Recent School Requests"
            subtitle="Schools that have recently requested recruitment support."
            action="View School Requests"
            href="/admin/schools/pending"
            icon={<Building2 size={20} />}
          >
            <EmptyActivity
              icon={<Building2 size={22} />}
              title="No school requests yet"
              description="New school recruitment requests will appear here."
            />
          </ActivityCard>

          {/* Applications */}
          <ActivityCard
            title="Application Activity"
            subtitle="Monitor educator applications and recruitment progress."
            action="View Applications"
            href="/admin/applications"
            icon={<FileText size={20} />}
          >
            <EmptyActivity
              icon={<FileText size={22} />}
              title="No applications yet"
              description="Application activity will appear here once recruitment starts."
            />
          </ActivityCard>

          {/* Verification */}
          <ActivityCard
            title="Document Verification"
            subtitle="Keep track of qualifications and documents requiring attention."
            action="Review Documents"
            href="/admin/documents"
            icon={<FileCheck size={20} />}
          >
            <EmptyActivity
              icon={<FileCheck size={22} />}
              title="No documents awaiting review"
              description="Documents requiring verification will appear here."
            />
          </ActivityCard>
        </div>

        {/* System note */}
        <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2
              size={21}
              className="mt-0.5 shrink-0 text-[#1769c2]"
            />

            <div>
              <h3 className="font-semibold text-[#0B1F3A]">
                Admin workspace
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                This dashboard is the starting point for managing
                educators, schools, recruitment requests,
                verification, matching, interviews and placements.
                The statistics will be connected to the Django
                database as each management section is built.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function AdminStat({
  icon,
  value,
  title,
  subtitle,
  href,
}: {
  icon: React.ReactNode;
  value: string;
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c9d9eb] hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef5ff] text-[#1769c2]">
          {icon}
        </div>

        <ChevronRight
          size={19}
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#1769c2]"
        />
      </div>

      <p className="mt-4 text-3xl font-bold text-[#1769c2]">
        {value}
      </p>

      <h3 className="mt-1 font-semibold text-[#0B1F3A]">
        {title}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {subtitle}
      </p>
    </Link>
  );
}

function PipelineItem({
  number,
  title,
  description,
  href,
}: {
  number: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      className="group rounded-xl border border-slate-200 p-4 transition hover:border-[#b9cee4] hover:bg-[#f8fbff]"
    >
      <span className="text-xs font-bold text-[#1769c2]">
        {number}
      </span>

      <h3 className="mt-2 font-semibold text-[#0B1F3A]">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>

      <ArrowRight
        size={16}
        className="mt-3 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#1769c2]"
      />
    </Link>
  );
}

function ActivityCard({
  title,
  subtitle,
  action,
  href,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  action: string;
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-[#1769c2]">
            {icon}
          </div>

          <div>
            <h2 className="font-bold text-[#0B1F3A]">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {subtitle}
            </p>
          </div>
        </div>

        <Link
          to={href}
          className="hidden shrink-0 text-xs font-semibold text-[#1769c2] hover:text-[#0B1F3A] sm:block"
        >
          {action}
        </Link>
      </div>

      {children}
    </section>
  );
}

function EmptyActivity({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[150px] flex-col items-center justify-center px-6 py-8 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        {icon}
      </div>

      <h3 className="mt-3 text-sm font-semibold text-[#0B1F3A]">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}