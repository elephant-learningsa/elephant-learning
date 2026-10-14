import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  School,
  User,
} from "lucide-react";
import logo from "../../assets/Logo/Logo.png";

const API_URL = "http://127.0.0.1:8000/api/auth";

const steps = [
  "School Details",
  "Requirements",
  "Contact",
  "Review",
];

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-[#0B1F3A] outline-none transition placeholder:text-gray-400 focus:border-[#1F5EA8] focus:ring-2 focus:ring-[#1F5EA8]/10";

const labelClass =
  "mb-1.5 block text-sm font-medium text-[#0B1F3A]";

const schoolTypes = [
  "Public School",
  "Private School",
  "Independent School",
  "Combined School",
  "Special Needs School",
  "TVET College",
  "Other",
];

const countries = [
  "South Africa",
  "Botswana",
  "Eswatini",
  "Lesotho",
  "Namibia",
  "Zimbabwe",
  "Other",
];

const grades = [
  "Grade R",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

const subjects = [
  "English",
  "Mathematics",
  "Mathematical Literacy",
  "Natural Sciences",
  "Physical Sciences",
  "Life Sciences",
  "Technology",
  "Computer Applications Technology",
  "Information Technology",
  "Accounting",
  "Business Studies",
  "Economics",
  "Geography",
  "History",
  "Life Orientation",
  "Other",
];

type SchoolFormData = {
  school_name: string;
  school_type: string;
  country: string;
  city: string;
  address: string;
  subjects: string[];
  grades: string[];
  number_of_teachers: string;
  employment_type: string;
  qualifications: string;
  experience: string;
  start_date: string;
  additional_requirements: string;
  first_name: string;
  last_name: string;
  position: string;
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
  terms_accepted: boolean;
};

const initialFormData: SchoolFormData = {
  school_name: "",
  school_type: "",
  country: "South Africa",
  city: "",
  address: "",
  subjects: [],
  grades: [],
  number_of_teachers: "1",
  employment_type: "Permanent",
  qualifications: "",
  experience: "",
  start_date: "",
  additional_requirements: "",
  first_name: "",
  last_name: "",
  position: "",
  email: "",
  phone: "",
  password: "",
  password_confirm: "",
  terms_accepted: false,
};

type FieldProps = {
  label: string;
  required?: boolean;
  children: ReactNode;
};

function Field({
  label,
  required = false,
  children,
}: FieldProps) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && (
          <span className="ml-1 text-red-600">*</span>
        )}
      </label>
      {children}
    </div>
  );
}

type ApiError = Record<string, unknown>;

function formatApiError(data: unknown): string {
  if (!data || typeof data !== "object") {
    return "Registration failed. Please check your details and try again.";
  }

  const errors = data as ApiError;

  if (typeof errors.detail === "string") {
    return errors.detail;
  }

  if (typeof errors.non_field_errors === "object") {
    const messages = errors.non_field_errors;

    if (Array.isArray(messages)) {
      return messages.join(" ");
    }
  }

  return Object.entries(errors)
    .map(([field, message]) => {
      const formattedField = field
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

      let detail: string;

      if (Array.isArray(message)) {
        detail = message
          .map((item) =>
            typeof item === "string"
              ? item
              : JSON.stringify(item),
          )
          .join(" ");
      } else if (typeof message === "string") {
        detail = message;
      } else {
        detail = JSON.stringify(message);
      }

      return `${formattedField}: ${detail}`;
    })
    .join("\n");
}

export default function SchoolRegister() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] =
    useState<SchoolFormData>(initialFormData);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, checked, value } = event.target;

    if (name === "terms_accepted") {
      setFormData((previous) => ({
        ...previous,
        terms_accepted: checked,
      }));
    } else if (name === "subjects" || name === "grades") {
      setFormData((previous) => {
        const current = previous[name];

        const updated = checked
          ? [...current, value]
          : current.filter((item) => item !== value);

        return {
          ...previous,
          [name]: updated,
        };
      });
    }

    setError("");
  };

  const validateStep = () => {
    if (step === 1) {
      if (
        !formData.school_name.trim() ||
        !formData.school_type ||
        !formData.country ||
        !formData.city.trim()
      ) {
        setError(
          "Please complete all required school details.",
        );
        return false;
      }
    }

    if (step === 2) {
      const teacherCount = Number(
        formData.number_of_teachers,
      );

      if (
        formData.subjects.length === 0 ||
        formData.grades.length === 0 ||
        !formData.number_of_teachers ||
        !Number.isInteger(teacherCount) ||
        teacherCount < 1 ||
        teacherCount > 500 ||
        !formData.employment_type
      ) {
        setError(
          "Select at least one subject and grade, and enter a whole number of teachers between 1 and 500.",
        );
        return false;
      }
    }

    if (step === 3) {
      if (
        !formData.first_name.trim() ||
        !formData.last_name.trim() ||
        !formData.position.trim() ||
        !formData.email.trim() ||
        !formData.phone.trim() ||
        !formData.password ||
        !formData.password_confirm
      ) {
        setError(
          "Please complete all required contact and account fields.",
        );
        return false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(formData.email.trim())) {
        setError("Please enter a valid email address.");
        return false;
      }

      if (formData.password.length < 8) {
        setError(
          "Your password must contain at least 8 characters.",
        );
        return false;
      }

      if (formData.password !== formData.password_confirm) {
        setError("Your passwords do not match.");
        return false;
      }

      if (!formData.terms_accepted) {
        setError(
          "Please accept the terms and conditions to continue.",
        );
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    setStep((previous) => Math.min(previous + 1, 4));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBack = () => {
    setError("");

    setStep((previous) => Math.max(previous - 1, 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError("");

    if (loading) return;

    if (step !== 4) {
      handleNext();
      return;
    }

    setLoading(true);

    try {
      const payload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        password_confirm: formData.password_confirm,

        school_name: formData.school_name.trim(),
        school_type: formData.school_type,
        country: formData.country,
        city: formData.city.trim(),
        address: formData.address.trim(),

        position: formData.position.trim(),
        phone: formData.phone.trim(),

        subjects: formData.subjects,
        grades: formData.grades,

        number_of_teachers: Number(
          formData.number_of_teachers,
        ),

        employment_type: formData.employment_type,
        qualifications: formData.qualifications.trim(),
        experience: formData.experience,
        start_date: formData.start_date || null,

        additional_requirements:
          formData.additional_requirements.trim(),
      };

      // Use the dedicated school registration endpoint.
      // The backend assigns the SCHOOL role.
      const response = await fetch(
        `${API_URL}/schools/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data: unknown = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        setError(formatApiError(data));
        return;
      }

      navigate("/login", {
        state: {
          message:
            "Your school registration was submitted successfully. You can log in once your account is ready.",
        },
      });
    } catch {
      setError(
        "Unable to connect to the server. Please make sure the Django server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleOptions = (
    name: "subjects" | "grades",
    options: string[],
  ) => (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 transition hover:border-[#1F5EA8]"
        >
          <input
            type="checkbox"
            name={name}
            value={option}
            checked={formData[name].includes(option)}
            onChange={handleCheckboxChange}
            className="h-4 w-4 accent-[#1F5EA8]"
          />
          {option}
        </label>
      ))}
    </div>
  );

  const reviewRow = (label: string, value: ReactNode) => (
    <div className="flex flex-col gap-1 border-b border-gray-100 py-3 sm:flex-row sm:justify-between sm:gap-5">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="text-sm font-medium text-[#0B1F3A] sm:text-right">
        {value || "Not provided"}
      </span>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex justify-center">
          <Link to="/" aria-label="Elephant Learning home">
            <img
              src={logo}
              alt="Elephant Learning"
              className="h-20 w-auto object-contain sm:h-28"
            />
          </Link>
        </div>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 sm:p-8 md:p-12">
          <header className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
              Create Your School Account
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Find the right educators for your school.
            </p>
          </header>

          {/* Progress indicator */}
          <div className="mb-9">
            <div className="flex items-center">
              {steps.map((label, index) => {
                const number = index + 1;
                const active = step === number;
                const completed = step > number;

                return (
                  <div
                    key={label}
                    className="flex min-w-0 flex-1 flex-col items-center"
                  >
                    <div className="flex w-full items-center">
                      {index > 0 && (
                        <div
                          className={`h-1 flex-1 ${
                            completed || active
                              ? "bg-[#1F5EA8]"
                              : "bg-gray-200"
                          }`}
                        />
                      )}

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                          active || completed
                            ? "bg-[#1F5EA8] text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {completed ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          number
                        )}
                      </div>

                      {index < steps.length - 1 && (
                        <div
                          className={`h-1 flex-1 ${
                            step > number
                              ? "bg-[#1F5EA8]"
                              : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>

                    <span
                      className={`mt-2 text-center text-xs font-medium sm:text-sm ${
                        active
                          ? "text-[#1F5EA8]"
                          : "text-gray-500"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-6 whitespace-pre-line rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Step 1: School details */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="mb-5 flex items-center gap-3">
                  <School className="h-6 w-6 text-[#1F5EA8]" />

                  <div>
                    <h2 className="font-semibold text-[#0B1F3A]">
                      School Details
                    </h2>

                    <p className="text-sm text-gray-500">
                      Tell us about your institution.
                    </p>
                  </div>
                </div>

                <Field label="School Name" required>
                  <input
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleChange}
                    placeholder="Enter your school name"
                    className={inputClass}
                    autoComplete="organization"
                  />
                </Field>

                <Field label="School Type" required>
                  <select
                    name="school_type"
                    value={formData.school_type}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">
                      Select school type
                    </option>

                    {schoolTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Country" required>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="City" required>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className={inputClass}
                    autoComplete="address-level2"
                  />
                </Field>

                <Field label="School Address">
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address or school location"
                    rows={3}
                    className={inputClass}
                    autoComplete="street-address"
                  />
                </Field>
              </div>
            )}

            {/* Step 2: Teacher requirements */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-semibold text-[#0B1F3A]">
                    Teacher Requirements
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Describe the educators your school needs.
                    You can provide more detailed requirements below.
                  </p>
                </div>

                <Field label="Subjects Required" required>
                  {toggleOptions("subjects", subjects)}
                </Field>

                <Field label="Grades Required" required>
                  {toggleOptions("grades", grades)}
                </Field>

                <Field
                  label="Number of Teachers Required"
                  required
                >
                  <input
                    type="number"
                    name="number_of_teachers"
                    min="1"
                    max="500"
                    step="1"
                    value={formData.number_of_teachers}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>

                <Field label="Employment Type" required>
                  <select
                    name="employment_type"
                    value={formData.employment_type}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Permanent">Permanent</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Substitute">Substitute</option>
                  </select>
                </Field>

                <Field label="Minimum Qualifications">
                  <input
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    placeholder="e.g. BEd or relevant teaching qualification"
                    className={inputClass}
                  />
                </Field>

                <Field label="Required Teaching Experience">
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">
                      No preference specified
                    </option>
                    <option value="Graduate">
                      Newly qualified teacher
                    </option>
                    <option value="1-2 years">1–2 years</option>
                    <option value="3-5 years">3–5 years</option>
                    <option value="5+ years">
                      More than 5 years
                    </option>
                  </select>
                </Field>

                <Field label="Expected Start Date">
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>

                <Field label="Additional Requirements">
                  <textarea
                    name="additional_requirements"
                    value={formData.additional_requirements}
                    onChange={handleChange}
                    placeholder="Describe any additional skills, experience or requirements."
                    rows={4}
                    className={inputClass}
                  />
                </Field>
              </div>
            )}

            {/* Step 3: Contact and account */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="font-semibold text-[#0B1F3A]">
                    Contact & Account Details
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Provide the details of the person managing
                    recruitment for your school.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="First Name" required>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                      <input
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="First name"
                        autoComplete="given-name"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </Field>

                  <Field label="Last Name" required>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                      <input
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Last name"
                        autoComplete="family-name"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </Field>
                </div>

                <Field label="Position at School" required>
                  <input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="e.g. Principal, HR Manager"
                    className={inputClass}
                  />
                </Field>

                <Field label="Official School Email" required>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@school.org.za"
                      autoComplete="email"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </Field>

                <Field label="Contact Number" required>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    autoComplete="tel"
                    className={inputClass}
                  />
                </Field>

                <Field label="Password" required>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                      className={`${inputClass} pl-10 pr-11`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0B1F3A]"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </Field>

                <Field label="Confirm Password" required>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      name="password_confirm"
                      value={formData.password_confirm}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      className={`${inputClass} pl-10 pr-11`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (previous) => !previous,
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0B1F3A]"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </Field>

                <label className="flex items-start gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="terms_accepted"
                    checked={formData.terms_accepted}
                    onChange={handleCheckboxChange}
                    className="mt-1 h-4 w-4 accent-[#1F5EA8]"
                  />

                  <span>
                    I confirm that I am authorised to register this
                    school and accept the applicable terms and conditions.
                    <span className="ml-1 text-red-600">*</span>
                  </span>
                </label>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-7">
                <div>
                  <h2 className="font-semibold text-[#0B1F3A]">
                    Review Your Registration
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Check your information before submitting.
                  </p>
                </div>

                <section>
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-semibold text-[#0B1F3A]">
                      School Details
                    </h3>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm font-semibold text-[#1F5EA8] hover:underline"
                    >
                      Edit
                    </button>
                  </div>

                  {reviewRow("School name", formData.school_name)}
                  {reviewRow("School type", formData.school_type)}
                  {reviewRow("Country", formData.country)}
                  {reviewRow("City", formData.city)}
                  {reviewRow("Address", formData.address)}
                </section>

                <section>
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-semibold text-[#0B1F3A]">
                      Teacher Requirements
                    </h3>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-sm font-semibold text-[#1F5EA8] hover:underline"
                    >
                      Edit
                    </button>
                  </div>

                  {reviewRow(
                    "Subjects",
                    formData.subjects.join(", "),
                  )}
                  {reviewRow(
                    "Grades",
                    formData.grades.join(", "),
                  )}
                  {reviewRow(
                    "Number of teachers",
                    formData.number_of_teachers,
                  )}
                  {reviewRow(
                    "Employment type",
                    formData.employment_type,
                  )}
                  {reviewRow(
                    "Qualifications",
                    formData.qualifications,
                  )}
                  {reviewRow(
                    "Experience",
                    formData.experience,
                  )}
                  {reviewRow(
                    "Expected start date",
                    formData.start_date,
                  )}
                  {reviewRow(
                    "Additional requirements",
                    formData.additional_requirements,
                  )}
                </section>

                <section>
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-semibold text-[#0B1F3A]">
                      Contact Information
                    </h3>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-sm font-semibold text-[#1F5EA8] hover:underline"
                    >
                      Edit
                    </button>
                  </div>

                  {reviewRow(
                    "Contact person",
                    `${formData.first_name} ${formData.last_name}`,
                  )}
                  {reviewRow("Position", formData.position)}
                  {reviewRow("Email", formData.email)}
                  {reviewRow("Phone", formData.phone)}
                  {reviewRow("Password", "••••••••")}
                </section>

                <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-[#0B1F3A]">
                  After submission, Elephant Learning will review
                  your school registration and teacher requirements.
                  Candidate matching begins after the requirements
                  have been reviewed.
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:bg-gray-50 disabled:opacity-50 sm:flex-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <Link
                  to="/"
                  className="flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:bg-gray-50 sm:flex-1"
                >
                  Cancel
                </Link>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102d52] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-[2]"
              >
                {loading
                  ? "Submitting..."
                  : step === 4
                    ? "Submit Registration"
                    : "Next"}

                {!loading &&
                  (step === 4 ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  ))}
              </button>
            </div>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#1F5EA8] hover:underline"
            >
              Login
            </Link>
          </p>
        </section>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-gray-500 transition hover:text-[#0B1F3A]"
          >
            ← Go back to Elephant Learning
          </Link>
        </div>
      </div>
    </main>
  );
}
