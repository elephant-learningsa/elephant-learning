import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  GraduationCap,
  Loader2,
  MapPin,
  Save,
  User,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/auth";

interface TeacherProfileData {
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

interface Step {
  number: number;
  title: string;
  description: string;
  icon: typeof User;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Personal Details",
    description: "Your basic information",
    icon: User,
  },
  {
    number: 2,
    title: "Education & Qualifications",
    description: "Your academic background",
    icon: GraduationCap,
  },
  {
    number: 3,
    title: "Teaching Information",
    description: "Your teaching experience",
    icon: BriefcaseBusiness,
  },
  {
    number: 4,
    title: "Teaching Preferences",
    description: "What you are looking for",
    icon: MapPin,
  },
];

const emptyProfile: TeacherProfileData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  location: "",
  province: "",
  highest_qualification: "",
  institution: "",
  field_of_study: "",
  years_of_experience: 0,
  subjects: "",
  grade_levels: "",
  employment_type: "",
  bio: "",
  preferred_location: "",
  willing_to_relocate: false,
  profile_completed: false,
};

export default function TeacherProfile() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] =
    useState<TeacherProfileData>(emptyProfile);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getAccessToken = () => {
    return (
      localStorage.getItem("access") ||
      sessionStorage.getItem("access")
    );
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
    sessionStorage.removeItem("user");

    window.location.href = "/elephant-learning/login";
  };

  const getAuthHeaders = (): HeadersInit => {
    const token = getAccessToken();

    if (!token) {
      throw new Error(
        "Your session has expired. Please log in again."
      );
    }

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/teacher/profile/`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        console.error("Profile loading error:", errorData);

        throw new Error(
          errorData?.detail ||
            "Unable to load your profile."
        );
      }

      const data = await response.json();

      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        date_of_birth: data.date_of_birth || "",
        location: data.location || "",
        province: data.province || "",
        highest_qualification:
          data.highest_qualification || "",
        institution: data.institution || "",
        field_of_study: data.field_of_study || "",
        years_of_experience:
          Number(data.years_of_experience) || 0,
        subjects: data.subjects || "",
        grade_levels: data.grade_levels || "",
        employment_type: data.employment_type || "",
        bio: data.bio || "",
        preferred_location:
          data.preferred_location || "",
        willing_to_relocate:
          Boolean(data.willing_to_relocate),
        profile_completed:
          Boolean(data.profile_completed),
      });

      if (data.profile_completed) {
        setCompleted(true);
      }
    } catch (err) {
      console.error("Profile loading error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const updateField = <
    K extends keyof TeacherProfileData
  >(
    field: K,
    value: TeacherProfileData[K]
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
    setSuccessMessage("");
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      if (!formData.first_name.trim()) {
        setError("Please enter your first name.");
        return false;
      }

      if (!formData.last_name.trim()) {
        setError("Please enter your last name.");
        return false;
      }

      if (!formData.phone.trim()) {
        setError("Please enter your phone number.");
        return false;
      }

      if (!formData.location.trim()) {
        setError("Please enter your current location.");
        return false;
      }

      if (!formData.province.trim()) {
        setError("Please select your province.");
        return false;
      }
    }

    if (currentStep === 2) {
      if (!formData.highest_qualification.trim()) {
        setError("Please enter your highest qualification.");
        return false;
      }

      if (!formData.institution.trim()) {
        setError(
          "Please enter the institution where you obtained your qualification."
        );
        return false;
      }

      if (!formData.field_of_study.trim()) {
        setError("Please enter your field of study.");
        return false;
      }
    }

    if (currentStep === 3) {
      if (!formData.subjects.trim()) {
        setError(
          "Please enter the subjects you are able to teach."
        );
        return false;
      }

      if (!formData.grade_levels.trim()) {
        setError(
          "Please enter the grade levels you can teach."
        );
        return false;
      }

      if (!formData.employment_type) {
        setError(
          "Please select your preferred employment type."
        );
        return false;
      }
    }

    if (currentStep === 4) {
      if (!formData.preferred_location.trim()) {
        setError(
          "Please enter your preferred teaching location."
        );
        return false;
      }
    }

    setError("");
    return true;
  };

  const saveProfile = async (
    markComplete = false
  ): Promise<boolean> => {
    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const response = await fetch(
        `${API_URL}/teacher/profile/`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            ...formData,
            profile_completed: markComplete,
          }),
        }
      );

      if (response.status === 401) {
        logout();
        return false;
      }

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        console.error(
          "Profile save error:",
          responseData
        );

        throw new Error(
          responseData?.detail ||
            "Unable to save your profile."
        );
      }

      setFormData((previous) => ({
        ...previous,
        ...responseData,
        profile_completed: markComplete
          ? true
          : Boolean(responseData?.profile_completed),
      }));

      return true;
    } catch (err) {
      console.error("Profile save error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save your profile."
      );

      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleContinue = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    const saved = await saveProfile(false);

    if (!saved) {
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep((previous) => previous + 1);
      setSuccessMessage(
        "Your information has been saved."
      );
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
      setError("");
      setSuccessMessage("");
    }
  };

  const handleComplete = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    const saved = await saveProfile(true);

    if (!saved) {
      return;
    }

    setCompleted(true);
    setSuccessMessage("");
  };

  const progressPercentage = useMemo(() => {
    if (completed) {
      return 100;
    }

    return Math.round(
      (currentStep / steps.length) * 100
    );
  }, [currentStep, completed]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-[#0B1F3A]" />

          <p className="text-sm text-slate-600">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (error && !formData.email) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <User className="h-7 w-7" />
          </div>

          <h2 className="text-xl font-semibold text-[#0B1F3A]">
            Unable to Load Profile
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {error}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={loadProfile}
              className="rounded-lg bg-[#0B1F3A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#142d50]"
            >
              Try Again
            </button>

            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Log In Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-8 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="text-sm font-medium text-[#0B1F3A]">
              My Profile
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[#0B1F3A] md:text-3xl">
              Profile Complete
            </h1>

            <p className="mt-2 text-slate-600">
              Your teacher profile has been completed
              successfully.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="mx-auto flex max-w-xl flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#0B1F3A]">
                You're all set!
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Your profile has been saved. Elephant
                Learning can now review your information
                and consider you for suitable teaching
                opportunities.
              </p>

              <div className="mt-8 w-full">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    Profile completion
                  </span>

                  <span className="font-semibold text-[#0B1F3A]">
                    100%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-full rounded-full bg-[#0B1F3A]" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCompleted(false);
                  setCurrentStep(1);
                  setError("");
                  setSuccessMessage("");
                }}
                className="mt-8 rounded-lg border border-[#0B1F3A] px-6 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:bg-slate-50"
              >
                Review My Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm font-medium text-[#0B1F3A]">
            My Profile
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#0B1F3A] md:text-3xl">
            Complete Your Teacher Profile
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Complete each section of your profile so we
            can understand your experience, qualifications
            and teaching preferences.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#0B1F3A]">
                Profile Progress
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Step {currentStep} of {steps.length}
              </p>
            </div>

            <span className="text-sm font-bold text-[#0B1F3A]">
              {progressPercentage}%
            </span>
          </div>

          <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#0B1F3A] transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isCurrent =
                currentStep === step.number;
              const isCompleted =
                currentStep > step.number;

              return (
                <div
                  key={step.number}
                  className="flex items-start gap-3"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      isCompleted
                        ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
                        : isCurrent
                        ? "border-[#0B1F3A] bg-white text-[#0B1F3A]"
                        : "border-slate-200 bg-slate-50 text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-xs font-semibold md:text-sm ${
                        isCurrent || isCompleted
                          ? "text-[#0B1F3A]"
                          : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </p>

                    <p className="mt-0.5 hidden text-xs text-slate-500 md:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success */}
        {successMessage && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#0B1F3A]">
                  <User className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-bold text-[#0B1F3A]">
                  Personal Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Tell us a little about yourself.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    First Name
                  </label>

                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(event) =>
                      updateField(
                        "first_name",
                        event.target.value
                      )
                    }
                    placeholder="Enter your first name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(event) =>
                      updateField(
                        "last_name",
                        event.target.value
                      )
                    }
                    placeholder="Enter your last name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
                  />

                  <p className="mt-1.5 text-xs text-slate-400">
                    Your email address is linked to your
                    account.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(event) =>
                      updateField(
                        "phone",
                        event.target.value
                      )
                    }
                    placeholder="e.g. 071 234 5678"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(event) =>
                      updateField(
                        "date_of_birth",
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Province
                  </label>

                  <select
                    value={formData.province}
                    onChange={(event) =>
                      updateField(
                        "province",
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  >
                    <option value="">
                      Select your province
                    </option>
                    <option value="Eastern Cape">
                      Eastern Cape
                    </option>
                    <option value="Free State">
                      Free State
                    </option>
                    <option value="Gauteng">Gauteng</option>
                    <option value="KwaZulu-Natal">
                      KwaZulu-Natal
                    </option>
                    <option value="Limpopo">Limpopo</option>
                    <option value="Mpumalanga">
                      Mpumalanga
                    </option>
                    <option value="Northern Cape">
                      Northern Cape
                    </option>
                    <option value="North West">
                      North West
                    </option>
                    <option value="Western Cape">
                      Western Cape
                    </option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Current Location
                  </label>

                  <input
                    type="text"
                    value={formData.location}
                    onChange={(event) =>
                      updateField(
                        "location",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Gqeberha"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#0B1F3A]">
                  <GraduationCap className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-bold text-[#0B1F3A]">
                  Education & Qualifications
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add your academic qualifications and
                  educational background.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Highest Qualification
                  </label>

                  <input
                    type="text"
                    value={formData.highest_qualification}
                    onChange={(event) =>
                      updateField(
                        "highest_qualification",
                        event.target.value
                      )
                    }
                    placeholder="e.g. BEd, PGCE, Diploma in Education"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Institution
                  </label>

                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(event) =>
                      updateField(
                        "institution",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Walter Sisulu University"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Field of Study
                  </label>

                  <input
                    type="text"
                    value={formData.field_of_study}
                    onChange={(event) =>
                      updateField(
                        "field_of_study",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Mathematics Education"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#0B1F3A]">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-bold text-[#0B1F3A]">
                  Teaching Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Tell us about your teaching experience
                  and areas of expertise.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Years of Teaching Experience
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={formData.years_of_experience}
                    onChange={(event) =>
                      updateField(
                        "years_of_experience",
                        Number(event.target.value) || 0
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Employment Type
                  </label>

                  <select
                    value={formData.employment_type}
                    onChange={(event) =>
                      updateField(
                        "employment_type",
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  >
                    <option value="">
                      Select employment type
                    </option>
                    <option value="Permanent">
                      Permanent
                    </option>
                    <option value="Contract">
                      Contract
                    </option>
                    <option value="Temporary">
                      Temporary
                    </option>
                    <option value="Part-time">
                      Part-time
                    </option>
                    <option value="Substitute">
                      Substitute
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Subjects
                  </label>

                  <input
                    type="text"
                    value={formData.subjects}
                    onChange={(event) =>
                      updateField(
                        "subjects",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Mathematics, Physical Sciences"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />

                  <p className="mt-1.5 text-xs text-slate-400">
                    Separate multiple subjects with commas.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Grade Levels
                  </label>

                  <input
                    type="text"
                    value={formData.grade_levels}
                    onChange={(event) =>
                      updateField(
                        "grade_levels",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Grade 8 - Grade 12"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Professional Bio
                  </label>

                  <textarea
                    rows={5}
                    value={formData.bio}
                    onChange={(event) =>
                      updateField(
                        "bio",
                        event.target.value
                      )
                    }
                    placeholder="Briefly tell us about your teaching experience, strengths and professional background."
                    className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />

                  <p className="mt-1.5 text-xs text-slate-400">
                    Keep your introduction clear and
                    relevant to your teaching experience.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#0B1F3A]">
                  <MapPin className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-bold text-[#0B1F3A]">
                  Teaching Preferences
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Tell us what type of teaching opportunity
                  you are looking for.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Preferred Teaching Location
                  </label>

                  <input
                    type="text"
                    value={formData.preferred_location}
                    onChange={(event) =>
                      updateField(
                        "preferred_location",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Gqeberha, East London, Cape Town or Remote"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                  />
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.willing_to_relocate}
                      onChange={(event) =>
                        updateField(
                          "willing_to_relocate",
                          event.target.checked
                        )
                      }
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        I am willing to relocate
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Select this if you would consider
                        teaching opportunities outside your
                        current location.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                  <p className="text-sm font-semibold text-[#0B1F3A]">
                    Before you complete your profile
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Please make sure the information you
                    have entered is correct. Your profile
                    will be used by Elephant Learning when
                    reviewing and matching teachers with
                    suitable schools.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1 || saving}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${
                currentStep === 1 || saving
                  ? "cursor-not-allowed text-slate-300"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => saveProfile(false)}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Progress
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#142d50] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Save & Continue
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#142d50] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Completing...
                    </>
                  ) : (
                    <>
                      Complete Profile
                      <Check className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
