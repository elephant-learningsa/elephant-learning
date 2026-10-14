import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  LoaderCircle,
  MapPin,
  Users,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/auth";

interface SchoolProfile {
  school_name?: string;
  school_type?: string;
  province?: string;
  town_or_city?: string;
  address?: string;
  subjects?: string[] | string;
  grades?: string[] | string;
  number_of_teachers?: number;
  employment_type?: string;
  qualifications?: string;
  experience?: string | number;
  start_date?: string | null;
  additional_requirements?: string;
  profile_completed?: boolean;
}

interface ApiRequirement {
  id: number;
  title: string;
  school_name?: string;
  subjects?: string[] | string;
  grades?: string[] | string;
  number_of_teachers?: number;
  minimum_experience?: number;
  qualifications?: string;
  employment_type?: string;
  province?: string;
  preferred_location?: string;
  start_date?: string | null;
  additional_requirements?: string;
  status?: string;
  created_at?: string;
}

interface RequirementCard {
  id: string;
  title: string;
  source: "registration" | "submitted";
  subjects: string[];
  grades: string[];
  numberOfTeachers?: number;
  experience?: string;
  qualifications?: string;
  employmentType?: string;
  location?: string;
  startDate?: string | null;
  additionalRequirements?: string;
  status: string;
  createdAt?: string;
}

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
    throw new Error(`Unable to load data (${response.status}).`);
  }

  return response.json() as Promise<T>;
}

function asArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];

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

function toList(value?: string[] | string): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  if (!value?.trim()) return [];

  // Support comma-separated values as well as JSON-encoded lists.
  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map(String).map((item) => item.trim()).filter(Boolean);
    }
  } catch {
    // The value is ordinary text, not JSON.
  }

  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function formatDate(value?: string | null) {
  if (!value) return "Not specified";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusStyle(status: string) {
  switch (status) {
    case "OPEN":
      return "bg-blue-50 text-blue-700";
    case "REVIEWING":
      return "bg-amber-50 text-amber-700";
    case "FILLED":
      return "bg-emerald-50 text-emerald-700";
    case "CLOSED":
      return "bg-slate-100 text-slate-600";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    OPEN: "Open",
    REVIEWING: "Under review",
    FILLED: "Filled",
    CLOSED: "Closed",
    REGISTRATION: "Captured during registration",
  };

  return labels[status] ?? status;
}

function createRegistrationRequirement(
  profile: SchoolProfile,
): RequirementCard | null {
  const subjects = toList(profile.subjects);
  const grades = toList(profile.grades);

  const hasRequirements = Boolean(
    subjects.length ||
      grades.length ||
      profile.number_of_teachers ||
      profile.employment_type ||
      profile.qualifications ||
      profile.experience ||
      profile.start_date ||
      profile.additional_requirements?.trim(),
  );

  if (!hasRequirements) return null;

  return {
    id: "registration",
    title: "Initial teaching requirements",
    source: "registration",
    subjects,
    grades,
    numberOfTeachers: profile.number_of_teachers,
    experience: profile.experience != null && profile.experience !== ""
      ? String(profile.experience)
      : undefined,
    qualifications: profile.qualifications,
    employmentType: profile.employment_type,
    location: [profile.town_or_city, profile.province]
      .filter(Boolean)
      .join(", "),
    startDate: profile.start_date,
    additionalRequirements: profile.additional_requirements,
    status: "REGISTRATION",
  };
}

function createSubmittedRequirement(
  requirement: ApiRequirement,
): RequirementCard {
  return {
    id: String(requirement.id),
    title: requirement.title || "Teaching requirement",
    source: "submitted",
    subjects: toList(requirement.subjects),
    grades: toList(requirement.grades),
    numberOfTeachers: requirement.number_of_teachers,
    experience:
      requirement.minimum_experience != null
        ? `${requirement.minimum_experience} years minimum`
        : undefined,
    qualifications: requirement.qualifications,
    employmentType: requirement.employment_type,
    location: [
      requirement.preferred_location,
      requirement.province,
    ]
      .filter(Boolean)
      .join(", "),
    startDate: requirement.start_date,
    additionalRequirements: requirement.additional_requirements,
    status: requirement.status || "OPEN",
    createdAt: requirement.created_at,
  };
}

function Detail({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (value == null || String(value).trim() === "") return null;

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm leading-6 text-slate-800">{value}</p>
    </div>
  );
}

export default function SchoolRequirements() {
  const [school, setSchool] = useState<SchoolProfile | null>(null);
  const [requirements, setRequirements] = useState<RequirementCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadRequirements() {
      setLoading(true);
      setError("");

      try {
        const [profile, requirementResponse] = await Promise.all([
          apiRequest<SchoolProfile>("/school/profile/"),
          apiRequest<unknown>("/school/requirements/"),
        ]);

        const submitted = asArray<ApiRequirement>(requirementResponse).map(
          createSubmittedRequirement,
        );

        const registration = createRegistrationRequirement(profile);
        const combined = [
          ...(registration ? [registration] : []),
          ...submitted,
        ];

        if (!cancelled) {
          setSchool(profile);
          setRequirements(combined);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load school requirements.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadRequirements();

    return () => {
      cancelled = true;
    };
  }, []);

  const registrationCount = requirements.filter(
    (item) => item.source === "registration",
  ).length;

  const submittedCount = requirements.filter(
    (item) => item.source === "submitted",
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/school/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        <section className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
              School portal
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1F3A]">
              Teacher requirements
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              View the teaching needs captured during registration and
              every additional requirement submitted by your school.
            </p>
            {school?.school_name && (
              <p className="mt-2 font-medium text-slate-700">
                {school.school_name}
              </p>
            )}
          </div>

          <Link
            to="/school/requirements/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1F5EA8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <ClipboardList size={18} />
            Submit new requirement
          </Link>
        </section>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
          >
            <p>{error}</p>
            {error.toLowerCase().includes("session") && (
              <Link
                to="/login"
                className="mt-2 inline-block font-semibold underline"
              >
                Go to login
              </Link>
            )}
          </div>
        )}

        {loading ? (
          <div className="mt-8 flex min-h-48 items-center justify-center rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-3 text-slate-600">
              <LoaderCircle size={22} className="animate-spin" />
              <span className="text-sm">Loading your requirements...</span>
            </div>
          </div>
        ) : !error ? (
          <>
            <section className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Total requirement records</p>
                <p className="mt-2 text-3xl font-bold text-[#0B1F3A]">
                  {requirements.length}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Captured at registration</p>
                <p className="mt-2 text-3xl font-bold text-[#0B1F3A]">
                  {registrationCount}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Submitted afterwards</p>
                <p className="mt-2 text-3xl font-bold text-[#0B1F3A]">
                  {submittedCount}
                </p>
              </div>
            </section>

            {requirements.length === 0 ? (
              <section className="mt-6 rounded-xl border border-slate-200 bg-white px-6 py-14 text-center">
                <ClipboardList
                  size={32}
                  className="mx-auto text-blue-700"
                />
                <h2 className="mt-4 text-lg font-bold text-[#0B1F3A]">
                  No teaching requirements recorded
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
                  No requirement details were found in your registration
                  profile or your submitted requirements. You can submit
                  a new requirement to get started.
                </p>
                <Link
                  to="/school/requirements/new"
                  className="mt-5 inline-flex rounded-lg bg-[#1F5EA8] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Submit a requirement
                </Link>
              </section>
            ) : (
              <section className="mt-6 space-y-5">
                {requirements.map((requirement) => (
                  <article
                    key={`${requirement.source}-${requirement.id}`}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg font-bold text-[#0B1F3A]">
                            {requirement.title}
                          </h2>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              requirement.source === "registration"
                                ? "bg-violet-50 text-violet-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {requirement.source === "registration"
                              ? "From registration"
                              : "Additional submission"}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">
                          {requirement.source === "registration"
                            ? "Initial teaching needs provided when the school registered."
                            : "A separate requirement submitted through the school portal."}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(requirement.status)}`}
                      >
                        {statusLabel(requirement.status)}
                      </span>
                    </div>

                    <div className="grid gap-6 p-5 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#0B1F3A]">
                          <GraduationCap size={17} className="text-blue-700" />
                          Subjects
                        </div>
                        <p className="mt-2 text-sm text-slate-600">
                          {requirement.subjects.length
                            ? requirement.subjects.join(", ")
                            : "Not specified"}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#0B1F3A]">
                          <Users size={17} className="text-blue-700" />
                          Grade levels
                        </div>
                        <p className="mt-2 text-sm text-slate-600">
                          {requirement.grades.length
                            ? requirement.grades.join(", ")
                            : "Not specified"}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#0B1F3A]">
                          <MapPin size={17} className="text-blue-700" />
                          Location
                        </div>
                        <p className="mt-2 text-sm text-slate-600">
                          {requirement.location || "Not specified"}
                        </p>
                      </div>

                      <Detail
                        label="Number of teachers"
                        value={requirement.numberOfTeachers}
                      />
                      <Detail
                        label="Minimum experience"
                        value={requirement.experience}
                      />
                      <Detail
                        label="Required qualifications"
                        value={requirement.qualifications}
                      />
                      <Detail
                        label="Employment type"
                        value={requirement.employmentType}
                      />

                      <div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#0B1F3A]">
                          <CalendarDays size={17} className="text-blue-700" />
                          Expected start date
                        </div>
                        <p className="mt-2 text-sm text-slate-600">
                          {formatDate(requirement.startDate)}
                        </p>
                      </div>

                      {requirement.additionalRequirements && (
                        <div className="sm:col-span-2 lg:col-span-3">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Additional requirements
                          </p>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                            {requirement.additionalRequirements}
                          </p>
                        </div>
                      )}

                      {requirement.createdAt && (
                        <div className="sm:col-span-2 lg:col-span-3">
                          <p className="text-xs text-slate-500">
                            Submitted on {formatDate(requirement.createdAt)}
                          </p>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </section>
            )}

            {school && (
              <section className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-700"
                />
                <div>
                  <h2 className="text-sm font-semibold text-[#0B1F3A]">
                    Registration information is included
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    The initial requirement card is built from your existing
                    school profile. Additional submissions remain separate
                    records, so the registration data is not duplicated in
                    the database.
                  </p>
                </div>
              </section>
            )}
          </>
        ) : null}
      </div>
    </main>
  );
}
