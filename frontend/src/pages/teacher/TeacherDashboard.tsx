import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileCheck,
  FileText,
  GraduationCap,
  Loader2,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

interface TeacherProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  location: string;
  province: string;
  highest_qualification: string;
  institution: string;
  field_of_study: string;
  years_of_experience: number;
  subjects: string;
  grade_levels: string;
  employment_type: string;
  bio: string;
  preferred_location: string;
  willing_to_relocate: boolean;
  profile_completed: boolean;
}

const API_URL = "http://127.0.0.1:8000/api/auth";

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [profile, setProfile] =
    useState<TeacherProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    if (storedUser) {
      try {
        setTeacher(JSON.parse(storedUser));
      } catch (error) {
        console.error(
          "Unable to read stored user:",
          error
        );
      }
    }
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setProfileLoading(true);

        const token =
          localStorage.getItem("access") ||
          sessionStorage.getItem("access");

        if (!token) {
          console.error("No access token found.");
          return;
        }

        const response = await fetch(
          `${API_URL}/teacher/profile/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          console.error(
            "Your session has expired."
          );

          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("user");

          sessionStorage.removeItem("access");
          sessionStorage.removeItem("refresh");
          sessionStorage.removeItem("user");

          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            "Unable to load teacher profile."
          );
        }

        const data = await response.json();

        setProfile(data);
      } catch (error) {
        console.error(
          "Unable to load teacher profile:",
          error
        );
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const firstName =
    profile?.first_name ||
    teacher?.first_name ||
    "Teacher";

  /*
   * Profile completion is calculated from the actual
   * information stored in the Django TeacherProfile.
   *
   * 1. Personal Details = 25%
   * 2. Education & Qualifications = 50%
   * 3. Teaching Information = 75%
   * 4. Teaching Preferences = 100%
   */
  const calculateProfileCompletion = () => {
    if (!profile) {
      return 0;
    }

    let completedSections = 0;

    // Step 1: Personal Details
    const personalDetailsComplete =
      Boolean(profile.first_name?.trim()) &&
      Boolean(profile.last_name?.trim()) &&
      Boolean(profile.phone?.trim()) &&
      Boolean(profile.location?.trim()) &&
      Boolean(profile.province?.trim());

    if (personalDetailsComplete) {
      completedSections += 1;
    }

    // Step 2: Education & Qualifications
    const educationComplete =
      Boolean(
        profile.highest_qualification?.trim()
      ) &&
      Boolean(profile.institution?.trim()) &&
      Boolean(profile.field_of_study?.trim());

    if (educationComplete) {
      completedSections += 1;
    }

    // Step 3: Teaching Information
    const teachingInformationComplete =
      Boolean(profile.subjects?.trim()) &&
      Boolean(profile.grade_levels?.trim()) &&
      Boolean(profile.employment_type);

    if (teachingInformationComplete) {
      completedSections += 1;
    }

    // Step 4: Teaching Preferences
    const teachingPreferencesComplete =
      Boolean(profile.preferred_location?.trim());

    if (teachingPreferencesComplete) {
      completedSections += 1;
    }

    return completedSections * 25;
  };

  const profileCompletion =
    calculateProfileCompletion();

  const getProfileMessage = () => {
    if (profileCompletion === 100) {
      return "Your profile is complete.";
    }

    if (profileCompletion === 75) {
      return "Your profile is almost complete. Add your teaching preferences.";
    }

    if (profileCompletion === 50) {
      return "Continue adding your teaching experience and information.";
    }

    if (profileCompletion === 25) {
      return "Continue adding your qualifications and education.";
    }

    return "Complete your profile to improve your chances of being matched.";
  };

  const getNextStepText = () => {
    if (profileCompletion === 100) {
      return "Your profile is complete";
    }

    if (profileCompletion === 75) {
      return "Complete your teaching preferences";
    }

    if (profileCompletion === 50) {
      return "Complete your teaching information";
    }

    if (profileCompletion === 25) {
      return "Complete your education and qualifications";
    }

    return "Complete your teacher profile";
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Welcome section */}
      <section>
        <p className="mb-2 text-sm font-medium text-slate-500">
          Teacher Portal
        </p>

        <h1 className="text-2xl font-bold text-[#0B1F3A] sm:text-3xl">
          Welcome back, {firstName}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Manage your teacher profile, documents and
          application status from your Elephant Learning
          dashboard.
        </p>
      </section>

      {/* Overview cards */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* Profile */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B1F3A]">
              <User size={21} />
            </div>

            {profileLoading ? (
              <Loader2
                size={19}
                className="animate-spin text-slate-400"
              />
            ) : (
              <span className="text-sm font-semibold text-[#0B1F3A]">
                {profileCompletion}%
              </span>
            )}
          </div>

          <h2 className="mt-5 text-base font-semibold text-slate-900">
            Profile Completion
          </h2>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#0B1F3A] transition-all duration-500"
              style={{
                width: `${profileCompletion}%`,
              }}
            />
          </div>

          <p className="mt-3 text-sm text-slate-500">
            {profileLoading
              ? "Checking your profile..."
              : getProfileMessage()}
          </p>

          {profileCompletion < 100 && (
            <button
              type="button"
              onClick={() =>
                navigate("/teacher/profile")
              }
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:underline"
            >
              Continue profile
              <ArrowRight size={15} />
            </button>
          )}
        </div>

        {/* Application */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Clock3 size={21} />
            </div>

            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              Under Review
            </span>
          </div>

          <h2 className="mt-5 text-base font-semibold text-slate-900">
            Application Status
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your teacher application is currently being
            reviewed by Elephant Learning.
          </p>

          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:underline"
          >
            View status
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Documents */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <FileCheck size={21} />
            </div>

            <CheckCircle2
              size={21}
              className="text-emerald-600"
            />
          </div>

          <h2 className="mt-5 text-base font-semibold text-slate-900">
            Documents
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your required documents have been submitted
            and are ready for verification.
          </p>

          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:underline"
          >
            View documents
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Opportunities */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
              <BriefcaseBusiness size={21} />
            </div>

            <span className="text-sm font-semibold text-slate-500">
              0
            </span>
          </div>

          <h2 className="mt-5 text-base font-semibold text-slate-900">
            Matched Opportunities
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            No school opportunities have been matched to
            your profile yet.
          </p>

          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:underline"
          >
            View opportunities
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Main dashboard content */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Application progress */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#0B1F3A]">
                Your Recruitment Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track your progress through the Elephant
                Learning teacher recruitment process.
              </p>
            </div>

            <GraduationCap
              size={25}
              className="text-[#0B1F3A]"
            />
          </div>

          <div className="mt-8 space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Application Submitted
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Your application has been successfully
                  received.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Clock3 size={18} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  CV Review
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Our recruitment team is reviewing your
                  qualifications and experience.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <FileText size={18} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500">
                  Qualification Verification
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  This step will become available once your
                  CV review is complete.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <BriefcaseBusiness size={18} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500">
                  School Matching
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Approved teachers can be matched with
                  suitable school opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#0B1F3A]">
                Recent Notifications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest updates
              </p>
            </div>

            <Bell
              size={22}
              className="text-[#0B1F3A]"
            />
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-800">
                Welcome to Elephant Learning
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Your teacher profile has been created
                successfully.
              </p>
            </div>

            {profileCompletion < 100 && (
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-800">
                  Complete your profile
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {getProfileMessage()}
                </p>
              </div>
            )}

            {profileCompletion === 100 && (
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-sm font-medium text-emerald-800">
                  Profile complete
                </p>

                <p className="mt-1 text-xs leading-5 text-emerald-700">
                  Your teacher profile is complete and ready
                  for review.
                </p>
              </div>
            )}

            <button
              type="button"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:bg-slate-50"
            >
              View all notifications
            </button>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="rounded-2xl bg-[#0B1F3A] p-6 shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-slate-300">
            Next step
          </p>

          <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
            {getNextStepText()}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
            {profileCompletion === 100
              ? "Your profile information is complete. You can review your details at any time."
              : "Make sure your qualifications, teaching experience and preferences are up to date."}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/teacher/profile")
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:bg-slate-100"
          >
            {profileCompletion === 100
              ? "Review Profile"
              : "Continue Profile"}

            <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}
