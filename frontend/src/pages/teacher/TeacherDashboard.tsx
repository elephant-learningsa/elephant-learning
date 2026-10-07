import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Eye,
  FileText,
  Heart,
  MapPin,
  MessageSquare,
  Pencil,
  Search,
  Users,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/auth";

interface TeacherProfile {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  location?: string;
  province?: string;
  highest_qualification?: string;
  institution?: string;
  field_of_study?: string;
  years_of_experience?: number;
  subjects?: string;
  grade_levels?: string;
  employment_type?: string;
  preferred_location?: string;
  willing_to_relocate?: boolean;
  bio?: string;
  profile_completed?: boolean;
}

interface Opportunity {
  id: number;
  title: string;
  school: string;
  location: string;
  employmentType: string;
  workType: string;
  icon: "book" | "math" | "science";
}

function getAccessToken() {
  return (
    localStorage.getItem("access") ||
    sessionStorage.getItem("access")
  );
}

function calculateProfileCompletion(
  profile: TeacherProfile | null,
) {
  if (!profile) {
    return 0;
  }

  const steps = [
    Boolean(
      profile.first_name?.trim() &&
        profile.last_name?.trim() &&
        profile.phone?.trim() &&
        profile.location?.trim() &&
        profile.province?.trim(),
    ),

    Boolean(
      profile.highest_qualification?.trim() &&
        profile.institution?.trim() &&
        profile.field_of_study?.trim(),
    ),

    Boolean(
      profile.subjects?.trim() &&
        profile.grade_levels?.trim() &&
        profile.employment_type?.trim(),
    ),

    Boolean(profile.preferred_location?.trim()),
  ];

  const completedSteps = steps.filter(Boolean).length;

  return completedSteps * 25;
}

function getInitials(profile: TeacherProfile | null) {
  const first = profile?.first_name?.charAt(0) || "";
  const last = profile?.last_name?.charAt(0) || "";

  return `${first}${last}`.toUpperCase() || "T";
}

function getFullName(profile: TeacherProfile | null) {
  if (!profile) {
    return "Teacher";
  }

  const name = `${profile.first_name || ""} ${
    profile.last_name || ""
  }`.trim();

  return name || "Teacher";
}

function getQualification(profile: TeacherProfile | null) {
  if (!profile?.highest_qualification) {
    return "Educator";
  }

  return profile.highest_qualification;
}

function getProfileMessage(completion: number) {
  if (completion === 100) {
    return "Your educator profile is complete and ready for matching.";
  }

  if (completion >= 75) {
    return "Your profile is almost complete. Finish the remaining details to improve your chances of being matched.";
  }

  if (completion >= 50) {
    return "You're making good progress. Complete the remaining sections of your profile.";
  }

  return "Complete your educator profile so Elephant Learning can match you with suitable opportunities.";
}

const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "English Teacher",
    school: "Sunrise International School",
    location: "Cape Town, Western Cape",
    employmentType: "Full-time",
    workType: "On-site",
    icon: "book",
  },
  {
    id: 2,
    title: "Mathematics Teacher",
    school: "Global Learning Academy",
    location: "Remote",
    employmentType: "Part-time",
    workType: "Online",
    icon: "math",
  },
  {
    id: 3,
    title: "Science Teacher",
    school: "Bright Future College",
    location: "Johannesburg, Gauteng",
    employmentType: "Full-time",
    workType: "On-site",
    icon: "science",
  },
];

function OpportunityIcon({
  type,
}: {
  type: Opportunity["icon"];
}) {
  if (type === "math") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-[#0B1F3A]">
        <span className="text-lg font-bold">∑</span>
      </div>
    );
  }

  if (type === "science") {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-[#0B1F3A]">
        <Search size={22} />
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-[#0B1F3A]">
      <FileText size={21} />
    </div>
  );
}

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] =
    useState<TeacherProfile | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getAccessToken();

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/teacher/profile/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 401) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("user");

          sessionStorage.removeItem("access");
          sessionStorage.removeItem("refresh");
          sessionStorage.removeItem("user");

          navigate("/login", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to load your profile.");
        }

        const data = await response.json();

        setProfile(data);
      } catch (err) {
        console.error("Dashboard profile error:", err);

        setError(
          "We could not load your profile information.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const completion = calculateProfileCompletion(profile);

  const fullName = getFullName(profile);

  const firstName =
    profile?.first_name?.trim() || "Teacher";

  const initials = getInitials(profile);

  const qualification = getQualification(profile);

  return (
    <div className="min-h-full bg-[#f7f9fc]">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
              Welcome back, {firstName}!
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Here's what's happening with your educator profile.
            </p>
          </div>

          <button
            type="button"
            className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0B1F3A] shadow-sm transition hover:border-[#0B1F3A] sm:block"
            onClick={() => navigate("/teacher/notifications")}
          >
            <span className="flex items-center gap-2">
              <MessageSquare size={17} />
              Notifications
            </span>
          </button>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Profile card */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              {loading ? (
                <div className="h-20 w-20 shrink-0 animate-pulse rounded-full bg-slate-200" />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#eaf2fb] text-xl font-bold text-[#0B1F3A] shadow-sm ring-1 ring-slate-200">
                  {initials}
                </div>
              )}

              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold text-[#0B1F3A]">
                  {loading ? "Loading profile..." : fullName}
                </h2>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {qualification}
                  {profile?.years_of_experience !== undefined &&
                    profile.years_of_experience > 0 && (
                      <>
                        {" "}
                        | {profile.years_of_experience}{" "}
                        {profile.years_of_experience === 1
                          ? "year"
                          : "years"}{" "}
                        experience
                      </>
                    )}
                </p>
              </div>
            </div>

            <div className="w-full lg:max-w-[620px]">
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-[#0B1F3A]">
                  Profile Completion
                </span>

                <span className="text-lg font-bold text-[#0B1F3A]">
                  {completion}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#1769c2] transition-all duration-500"
                  style={{
                    width: `${completion}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {getProfileMessage(completion)}
              </p>
            </div>

            <Link
              to="/teacher/profile"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#1769c2] px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] transition hover:bg-[#f2f7fc]"
            >
              Edit Profile
              <Pencil size={16} />
            </Link>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardStat
            icon={<FileText size={21} />}
            value="0"
            title="Applications"
            subtitle="View your applications"
            href="/teacher/applications"
          />

          <DashboardStat
            icon={<Users size={21} />}
            value="0"
            title="Interviews"
            subtitle="Upcoming interviews"
            href="/teacher/interviews"
          />

          <DashboardStat
            icon={<BriefcaseBusiness size={21} />}
            value="0"
            title="Job Offers"
            subtitle="Offers received"
            href="/teacher/offers"
          />

          <DashboardStat
            icon={<Eye size={21} />}
            value="0"
            title="Profile Views"
            subtitle="By schools this month"
            href="/teacher/profile-views"
          />
        </section>

        {/* Profile progress */}
        {completion < 100 && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={20}
                    className="text-[#1769c2]"
                  />

                  <h2 className="font-bold text-[#0B1F3A]">
                    Complete your educator profile
                  </h2>
                </div>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  A complete profile gives Elephant Learning the
                  information we need to match you with suitable
                  teaching opportunities.
                </p>
              </div>

              <Link
                to="/teacher/profile"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#15345c]"
              >
                Continue Profile
                <ArrowRight size={17} />
              </Link>
            </div>
          </section>
        )}

        {/* Recommended opportunities */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-[#0B1F3A]">
                Recommended Opportunities
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Opportunities that may be a good match for your
                profile.
              </p>
            </div>

            <Link
              to="/teacher/opportunities"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#1769c2] hover:text-[#0B1F3A]"
            >
              View All Opportunities
              <ChevronRight size={17} />
            </Link>
          </div>

          <div>
            {opportunities.map((opportunity) => (
              <OpportunityRow
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))}
          </div>
        </section>

        {/* Bottom information */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Availability */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-[#1769c2]">
                <CalendarDays size={21} />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-[#0B1F3A]">
                  Your Availability
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Let Elephant Learning know when you are available
                  for teaching opportunities.
                </p>

                <Link
                  to="/teacher/availability"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1769c2]"
                >
                  Manage Availability
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          {/* Messages */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-[#1769c2]">
                <MessageSquare size={21} />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-[#0B1F3A]">
                  Messages
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Keep track of communication from the Elephant
                  Learning recruitment team and schools.
                </p>

                <Link
                  to="/teacher/messages"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1769c2]"
                >
                  View Messages
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

interface DashboardStatProps {
  icon: React.ReactNode;
  value: string;
  title: string;
  subtitle: string;
  href: string;
}

function DashboardStat({
  icon,
  value,
  title,
  subtitle,
  href,
}: DashboardStatProps) {
  return (
    <Link
      to={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c9d9eb] hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef5ff] text-[#1769c2]">
          {icon}
        </div>

        <ChevronRight
          size={20}
          className="mt-2 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#1769c2]"
        />
      </div>

      <div className="mt-4">
        <div className="text-3xl font-bold text-[#1769c2]">
          {value}
        </div>

        <h3 className="mt-1 font-semibold text-[#0B1F3A]">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}

function OpportunityRow({
  opportunity,
}: {
  opportunity: Opportunity;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 last:border-b-0 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <OpportunityIcon type={opportunity.icon} />

        <div className="min-w-0">
          <h3 className="font-semibold text-[#0B1F3A]">
            {opportunity.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {opportunity.school}
          </p>

          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <MapPin size={14} />
            {opportunity.location}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
        <span className="rounded-full bg-[#e9f7ef] px-3 py-1.5 text-xs font-semibold text-[#28734a]">
          {opportunity.employmentType}
        </span>

        <span className="rounded-full bg-[#eef5ff] px-3 py-1.5 text-xs font-semibold text-[#245a91]">
          {opportunity.workType}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to={`/teacher/opportunities/${opportunity.id}`}
          className="inline-flex items-center justify-center rounded-lg bg-[#0B1F3A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#15345c]"
        >
          View Opportunity
        </Link>

        <button
          type="button"
          aria-label={`Save ${opportunity.title}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#0B1F3A] transition hover:border-[#0B1F3A] hover:bg-slate-50"
        >
          <Heart size={19} />
        </button>
      </div>
    </div>
  );
}