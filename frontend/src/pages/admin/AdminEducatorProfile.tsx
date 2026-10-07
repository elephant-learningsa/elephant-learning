import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
 
  MapPin,
  GraduationCap,
  Briefcase,
  BookOpen,
  User,
  Calendar,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

interface EducatorProfile {
  phone?: string | null;
  location?: string | null;
  province?: string | null;
  highest_qualification?: string | null;
  institution?: string | null;
  field_of_study?: string | null;
  years_of_experience?: number | null;
  subjects?: string | null;
  grade_levels?: string | null;
  employment_type?: string | null;
  preferred_location?: string | null;
  willing_to_relocate?: boolean | null;
  bio?: string | null;
}

interface Educator {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  date_joined: string;
  profile: EducatorProfile | null;
  profile_completion: number;
}

export default function AdminEducatorProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [educator, setEducator] = useState<Educator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const fetchEducator = async () => {
    if (!id) {
      setError("No educator ID was provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    setStatusCode(null);

    try {
      /*
       * Your login may store the JWT token under either
       * "access" or "access_token".
       */
      const token =
        localStorage.getItem("access") ||
        localStorage.getItem("access_token");

      if (!token) {
        setStatusCode(401);
        setError("Your session has expired. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/auth/admin/educators/${id}/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      /*
       * Handle authentication errors separately.
       */
      if (response.status === 401) {
        setStatusCode(401);
        setError("Your session has expired. Please log in again.");

        /*
         * Remove old tokens so the application does not
         * keep trying to use an expired JWT.
         */
        localStorage.removeItem("access");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh");

        return;
      }

      /*
       * 403 means the user is authenticated but does not
       * have permission to access the admin endpoint.
       */
      if (response.status === 403) {
        setStatusCode(403);
        setError(
          "You do not have permission to view educator profiles."
        );
        return;
      }

      /*
       * Handle educator not found.
       */
      if (response.status === 404) {
        setStatusCode(404);
        setError("The educator profile could not be found.");
        return;
      }

      /*
       * Handle other server errors.
       */
      if (!response.ok) {
        let serverMessage = "";

        try {
          const errorData = await response.json();

          if (typeof errorData?.detail === "string") {
            serverMessage = errorData.detail;
          } else if (typeof errorData?.message === "string") {
            serverMessage = errorData.message;
          }
        } catch {
          // Ignore JSON parsing errors.
        }

        throw new Error(
          serverMessage ||
            `Unable to load educator profile. Server returned ${response.status}.`
        );
      }

      const data: Educator = await response.json();

      setEducator(data);
    } catch (err) {
      console.error("Error loading educator:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to load this educator profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducator();
  }, [id]);

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-7 w-7 animate-spin text-[#1769c2]" />

          <p className="text-sm text-gray-500">
            Loading educator profile...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Authentication error
   */
  if (statusCode === 401) {
    return (
      <div className="p-6">
        <Link
          to="/admin/educators"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#1769c2] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Educators
        </Link>

        <div className="max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <h2 className="font-semibold text-red-800">
                Authentication Required
              </h2>

              <p className="mt-1 text-sm leading-6 text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={() => navigate("/admin/login")}
                className="mt-4 rounded-lg bg-[#0B1F3A] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#16345d]"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * General error state
   */
  if (error || !educator) {
    return (
      <div className="p-6">
        <Link
          to="/admin/educators"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#1769c2] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Educators
        </Link>

        <div className="max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <h2 className="font-semibold text-red-800">
                Unable to Load Profile
              </h2>

              <p className="mt-1 text-sm leading-6 text-red-700">
                {error || "Educator not found."}
              </p>

              <button
                type="button"
                onClick={fetchEducator}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const profile = educator.profile;

  /*
   * Safely calculate profile completion.
   */
  const profileCompletion = Math.min(
    100,
    Math.max(0, Number(educator.profile_completion) || 0)
  );

  /*
   * Safely format the registration date.
   */
  const joinedDate = educator.date_joined
    ? new Date(educator.date_joined).toLocaleDateString("en-ZA", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  /*
   * Create initials for the avatar.
   */
  const firstInitial =
    educator.first_name?.charAt(0).toUpperCase() || "";

  const lastInitial =
    educator.last_name?.charAt(0).toUpperCase() || "";

  return (
    <div className="space-y-6 p-6">
      {/* Back */}
      <Link
        to="/admin/educators"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#1769c2] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Educators
      </Link>

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Educator information */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#0B1F3A] text-xl font-semibold text-white">
              {firstInitial}
              {lastInitial}
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-[#0B1F3A]">
                {educator.full_name ||
                  `${educator.first_name} ${educator.last_name}`}
              </h1>

              <p className="mt-1 flex items-center gap-2 break-all text-sm text-gray-500">
                <Mail className="h-4 w-4 shrink-0" />
                {educator.email}
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4 shrink-0" />
                Registered {joinedDate}
              </p>
            </div>
          </div>

          {/* Profile completion */}
          <div className="w-full md:min-w-[220px] md:max-w-[260px]">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Profile Completion
              </span>

              <span className="text-sm font-semibold text-[#1769c2]">
                {profileCompletion}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#1769c2] transition-all duration-500"
                style={{
                  width: `${profileCompletion}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <ProfileSection
        icon={<User className="h-5 w-5" />}
        title="Personal Information"
      >
        <InfoItem
          label="First Name"
          value={educator.first_name}
        />

        <InfoItem
          label="Last Name"
          value={educator.last_name}
        />

        <InfoItem
          label="Email Address"
          value={educator.email}
        />

        <InfoItem
          label="Phone Number"
          value={profile?.phone}
        />
      </ProfileSection>

      {/* Location */}
      <ProfileSection
        icon={<MapPin className="h-5 w-5" />}
        title="Location"
      >
        <InfoItem
          label="Location"
          value={profile?.location}
        />

        <InfoItem
          label="Province"
          value={profile?.province}
        />

        <InfoItem
          label="Preferred Location"
          value={profile?.preferred_location}
        />

        <InfoItem
          label="Willing to Relocate"
          value={
            profile?.willing_to_relocate === true
              ? "Yes"
              : profile?.willing_to_relocate === false
              ? "No"
              : undefined
          }
        />
      </ProfileSection>

      {/* Education */}
      <ProfileSection
        icon={<GraduationCap className="h-5 w-5" />}
        title="Education & Qualifications"
      >
        <InfoItem
          label="Highest Qualification"
          value={profile?.highest_qualification}
        />

        <InfoItem
          label="Institution"
          value={profile?.institution}
        />

        <InfoItem
          label="Field of Study"
          value={profile?.field_of_study}
        />
      </ProfileSection>

      {/* Teaching */}
      <ProfileSection
        icon={<BookOpen className="h-5 w-5" />}
        title="Teaching Information"
      >
        <InfoItem
          label="Subjects"
          value={profile?.subjects}
        />

        <InfoItem
          label="Grade Levels"
          value={profile?.grade_levels}
        />

        <InfoItem
          label="Years of Experience"
          value={
            profile?.years_of_experience !== null &&
            profile?.years_of_experience !== undefined
              ? `${profile.years_of_experience} years`
              : undefined
          }
        />

        <InfoItem
          label="Employment Type"
          value={profile?.employment_type}
        />
      </ProfileSection>

      {/* Bio */}
      <ProfileSection
        icon={<Briefcase className="h-5 w-5" />}
        title="Professional Bio"
      >
        <div className="md:col-span-2">
          <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
            {profile?.bio || "No professional bio provided."}
          </p>
        </div>
      </ProfileSection>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Profile Section                                                            */
/* -------------------------------------------------------------------------- */

function ProfileSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#1769c2]">
          {icon}
        </div>

        <h2 className="text-lg font-semibold text-[#0B1F3A]">
          {title}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Info Item                                                                  */
/* -------------------------------------------------------------------------- */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  const displayValue =
    value !== undefined &&
    value !== null &&
    String(value).trim() !== ""
      ? String(value)
      : "Not provided";

  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p
        className={`text-sm font-medium ${
          displayValue === "Not provided"
            ? "text-gray-400"
            : "text-gray-800"
        }`}
      >
        {displayValue}
      </p>
    </div>
  );
}