
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  LoaderCircle,
  MapPin,
  Plus,
  Search,
  Users,
  UserCheck,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/auth";

interface Requirement {
  id: number;
  title: string;
  school_name: string;
  subjects: string[];
  grades: string[];
  number_of_teachers: number;
  status: "OPEN" | "REVIEWING" | "FILLED" | "CLOSED";
  province: string;
  preferred_location: string;
  created_at: string;
  start_date: string | null;
}

interface Candidate {
  id: number;
  stage:
    | "MATCHED"
    | "SHORTLISTED"
    | "INTERVIEW"
    | "SELECTED"
    | "PLACED"
    | "REJECTED";
  interview_at: string | null;
}

interface DashboardData {
  requirements: Requirement[];
  candidates: Candidate[];
}

const recruitmentStages = [
  {
    number: 1,
    title: "Submit requirement",
    description: "Tell us what teaching support your school needs.",
    icon: ClipboardList,
  },
  {
    number: 2,
    title: "Requirement review",
    description: "Elephant Learning reviews your request.",
    icon: CheckCircle2,
  },
  {
    number: 3,
    title: "Candidate matching",
    description: "Suitable educators are identified.",
    icon: Search,
  },
  {
    number: 4,
    title: "Review candidates",
    description: "Review educator profiles and experience.",
    icon: Users,
  },
  {
    number: 5,
    title: "Shortlisting",
    description: "Choose candidates to progress.",
    icon: UserCheck,
  },
  {
    number: 6,
    title: "Interviews",
    description: "Coordinate interviews with candidates.",
    icon: CalendarDays,
  },
  {
    number: 7,
    title: "Selection",
    description: "Confirm your preferred educator.",
    icon: GraduationCap,
  },
  {
    number: 8,
    title: "Placement",
    description: "Finalise the recruitment outcome.",
    icon: BriefcaseBusiness,
  },
];

function getAccessToken() {
  return (
    localStorage.getItem("access") ||
    sessionStorage.getItem("access")
  );
}

async function apiRequest<T>(path: string): Promise<T> {
  const token = getAccessToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    throw new Error("Your session has expired. Please log in again.");
  }

  if (!response.ok) {
    throw new Error(
      `Unable to load dashboard data (${response.status}).`,
    );
  }

  return response.json() as Promise<T>;
}

function asArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) {
    return data as T[];
  }

  if (
    data &&
    typeof data === "object" &&
    "results" in data &&
    Array.isArray((data as { results: unknown }).results)
  ) {
    return (data as { results: T[] }).results;
  }

  return [];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    OPEN: "Open",
    REVIEWING: "Under review",
    FILLED: "Filled",
    CLOSED: "Closed",
    MATCHED: "Matched",
    SHORTLISTED: "Shortlisted",
    INTERVIEW: "Interview",
    SELECTED: "Selected",
    PLACED: "Placed",
    REJECTED: "Not proceeding",
  };

  return labels[status] ?? status;
}

function statusClass(status: string) {
  const classes: Record<string, string> = {
    OPEN: "bg-blue-50 text-blue-700",
    REVIEWING: "bg-amber-50 text-amber-700",
    FILLED: "bg-emerald-50 text-emerald-700",
    CLOSED: "bg-slate-100 text-slate-600",
    MATCHED: "bg-blue-50 text-blue-700",
    SHORTLISTED: "bg-violet-50 text-violet-700",
    INTERVIEW: "bg-amber-50 text-amber-700",
    SELECTED: "bg-emerald-50 text-emerald-700",
    PLACED: "bg-emerald-100 text-emerald-800",
    REJECTED: "bg-rose-50 text-rose-700",
  };

  return classes[status] ?? "bg-slate-100 text-slate-600";
}

export default function SchoolDashboard() {
  const [data, setData] = useState<DashboardData>({
    requirements: [],
    candidates: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const requirementResponse = await apiRequest<unknown>(
          "/school/requirements/",
        );

        const requirements = asArray<Requirement>(
          requirementResponse,
        );

        const candidateResponses = await Promise.all(
          requirements.map(async (requirement) => {
            try {
              const response = await apiRequest<unknown>(
                `/school/requirements/${requirement.id}/candidates/`,
              );
              return asArray<Candidate>(response);
            } catch {
              return [];
            }
          }),
        );

        if (!cancelled) {
          setData({
            requirements,
            candidates: candidateResponses.flat(),
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your dashboard.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const { requirements, candidates } = data;

  const activeRequirements = requirements.filter(
    (item) => item.status === "OPEN" || item.status === "REVIEWING",
  ).length;

  const shortlisted = candidates.filter(
    (candidate) => candidate.stage === "SHORTLISTED",
  ).length;

  const interviews = candidates.filter(
    (candidate) =>
      candidate.stage === "INTERVIEW" ||
      Boolean(candidate.interview_at),
  ).length;

  const placements = candidates.filter(
    (candidate) => candidate.stage === "PLACED",
  ).length;

  const metrics = [
    {
      label: "Active requirements",
      value: activeRequirements,
      description: "Open or under review",
      icon: ClipboardList,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Matched educators",
      value: candidates.filter(
        (candidate) => candidate.stage === "MATCHED",
      ).length,
      description: "Ready for review",
      icon: Users,
      color: "bg-violet-50 text-violet-700",
    },
    {
      label: "Shortlisted",
      value: shortlisted,
      description: "Candidates progressing",
      icon: UserCheck,
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Interviews",
      value: interviews,
      description: "Interview-stage candidates",
      icon: CalendarDays,
      color: "bg-orange-50 text-orange-700",
    },
    {
      label: "Placements",
      value: placements,
      description: "Successfully placed",
      icon: GraduationCap,
      color: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              School portal
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1F3A]">
              Recruitment dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Manage your teaching requirements, discover educators,
              and follow your recruitment progress in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/school/educators"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:bg-slate-100"
            >
              <Search size={17} />
              Find educators
            </Link>
            <Link
              to="/school/requirements/new"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1F5EA8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              <Plus size={18} />
              Submit requirement
            </Link>
          </div>
        </section>

        {error && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => window.location.assign("/elephant-learning/login")}
              className="shrink-0 font-semibold underline"
            >
              Go to login
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-56 items-center justify-center rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-3 text-slate-600">
              <LoaderCircle className="animate-spin" size={22} />
              <span className="text-sm">Loading your recruitment data...</span>
            </div>
          </div>
        ) : (
          <>
            <section
              aria-label="Recruitment statistics"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5"
            >
              {metrics.map((metric) => {
                const Icon = metric.icon;

                return (
                  <article
                    key={metric.label}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          {metric.label}
                        </p>
                        <p className="mt-3 text-3xl font-bold text-[#0B1F3A]">
                          {metric.value}
                        </p>
                      </div>
                      <div className={`rounded-lg p-3 ${metric.color}`}>
                        <Icon size={21} />
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">
                      {metric.description}
                    </p>
                  </article>
                );
              })}
            </section>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-lg font-bold text-[#0B1F3A]">
                      Your recruitment journey
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      How Elephant Learning coordinates the process.
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    8 stages
                  </span>
                </div>

                <div className="mt-6 space-y-0">
                  {recruitmentStages.map((stage, index) => {
                    const Icon = stage.icon;

                    return (
                      <div key={stage.number} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-700">
                            <Icon size={18} />
                          </div>
                          {index < recruitmentStages.length - 1 && (
                            <div className="my-1 min-h-6 w-px flex-1 bg-slate-200" />
                          )}
                        </div>
                        <div className="pb-6">
                          <p className="font-semibold text-slate-800">
                            {stage.number}. {stage.title}
                          </p>
                          <p className="mt-1 text-sm leading-5 text-slate-500">
                            {stage.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <aside className="space-y-6">
                <div className="rounded-xl bg-[#0B1F3A] p-6 text-white">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
                    <BookOpen size={22} />
                  </div>
                  <h2 className="mt-4 text-lg font-bold">
                    Your recruitment partner
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    Elephant Learning manages and coordinates the
                    recruitment process between your school and educators,
                    from understanding your requirements to supporting
                    placement.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-200"
                  >
                    Contact our team
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <h2 className="font-bold text-[#0B1F3A]">
                    Quick actions
                  </h2>
                  <div className="mt-4 space-y-3">
                    <Link
                      to="/school/educators"
                      className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <span className="flex items-center gap-3">
                        <Search size={18} className="text-blue-700" />
                        Browse educators
                      </span>
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      to="/school/requirements"
                      className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <span className="flex items-center gap-3">
                        <ClipboardList size={18} className="text-blue-700" />
                        View requirements
                      </span>
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      to="/school/candidates"
                      className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <span className="flex items-center gap-3">
                        <Users size={18} className="text-blue-700" />
                        Manage candidates
                      </span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </aside>
            </section>

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-bold text-[#0B1F3A]">
                    Recent requirements
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    The latest teacher requirements submitted by your school.
                  </p>
                </div>
                <Link
                  to="/school/requirements"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                  View all
                  <ArrowRight size={16} />
                </Link>
              </div>

              {requirements.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <ClipboardList size={23} />
                  </div>
                  <h3 className="mt-4 font-semibold text-[#0B1F3A]">
                    No requirements yet
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Submit your first teaching requirement to begin the
                    recruitment process.
                  </p>
                  <Link
                    to="/school/requirements/new"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#1F5EA8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                  >
                    <Plus size={17} />
                    Submit a requirement
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {requirements.slice(0, 5).map((requirement) => (
                    <article
                      key={requirement.id}
                      className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-[#0B1F3A]">
                            {requirement.title}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(requirement.status)}`}
                          >
                            {statusLabel(requirement.status)}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-600">
                          {requirement.subjects?.length
                            ? requirement.subjects.join(", ")
                            : "Subjects not specified"}
                          {" · "}
                          {requirement.number_of_teachers} teacher
                          {requirement.number_of_teachers === 1 ? "" : "s"}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                          {requirement.preferred_location && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={14} />
                              {requirement.preferred_location}
                            </span>
                          )}
                          <span>
                            Submitted {formatDate(requirement.created_at)}
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/school/requirements/${requirement.id}/candidates`}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
                      >
                        View candidates
                        <ArrowRight size={15} />
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
