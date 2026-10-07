import {
  ChevronRight,
  Mail,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/auth";

interface EducatorProfile {
  phone?: string;
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

function getAccessToken() {
  return (
    localStorage.getItem("access") ||
    sessionStorage.getItem("access")
  );
}

export default function AdminEducators() {
  const navigate = useNavigate();

  const [educators, setEducators] = useState<Educator[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEducators = async () => {
      const token = getAccessToken();

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/admin/educators/`,
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

        if (!response.ok) {
          throw new Error(
            "Unable to load educators.",
          );
        }

        const data = await response.json();

        setEducators(data);
      } catch (err) {
        console.error(err);

        setError(
          "We couldn't load the educators. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEducators();
  }, [navigate]);

  const filteredEducators = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return educators;
    }

    return educators.filter((educator) => {
      const profile = educator.profile;

      return (
        educator.full_name
          .toLowerCase()
          .includes(query) ||
        educator.email
          .toLowerCase()
          .includes(query) ||
        profile?.location
          ?.toLowerCase()
          .includes(query) ||
        profile?.highest_qualification
          ?.toLowerCase()
          .includes(query) ||
        profile?.subjects
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [educators, search]);

  return (
    <div className="min-h-full bg-[#f7f9fc]">
      <div className="mx-auto max-w-[1450px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F3A] sm:text-3xl">
              Educators
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Manage and review educators registered with
              Elephant Learning.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 shadow-sm">
            <Users size={18} className="text-[#1769c2]" />

            <span>
              {educators.length}{" "}
              {educators.length === 1
                ? "educator"
                : "educators"}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by name, email, location, qualification or subject..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#1769c2] focus:ring-2 focus:ring-[#1769c2]/10"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading educators...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          filteredEducators.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef5ff] text-[#1769c2]">
                <Users size={25} />
              </div>

              <h2 className="mt-4 font-semibold text-[#0B1F3A]">
                {search
                  ? "No educators found"
                  : "No educators registered yet"}
              </h2>

              <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                {search
                  ? "Try changing your search."
                  : "Educators who register through the platform will appear here."}
              </p>
            </div>
          )}

        {/* Educators */}
        {!loading &&
          filteredEducators.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Desktop heading */}
              <div className="hidden border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid md:grid-cols-[2fr_1.5fr_1.2fr_1.2fr_auto] md:items-center md:gap-4">
                <span>Educator</span>
                <span>Qualification</span>
                <span>Location</span>
                <span>Profile</span>
                <span />
              </div>

              <div className="divide-y divide-slate-100">
                {filteredEducators.map((educator) => {
                  const profile =
                    educator.profile;

                  const location =
                    profile?.location ||
                    profile?.province ||
                    "Location not provided";

                  const qualification =
                    profile?.highest_qualification ||
                    "Qualification not provided";

                  return (
                    <div
                      key={educator.id}
                      className="px-5 py-5 transition hover:bg-slate-50/70 sm:px-6"
                    >
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1.5fr_1.2fr_1.2fr_auto] md:items-center md:gap-4">
                        {/* Educator */}
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf2fb] font-bold text-[#0B1F3A]">
                            {educator.first_name?.charAt(
                              0,
                            )}
                            {educator.last_name?.charAt(
                              0,
                            )}
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-semibold text-[#0B1F3A]">
                              {educator.full_name}
                            </h3>

                            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                              <Mail size={13} />

                              <span className="truncate">
                                {educator.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Qualification */}
                        <div>
                          <p className="text-xs font-medium text-slate-400 md:hidden">
                            Qualification
                          </p>

                          <p className="mt-1 text-sm text-slate-600 md:mt-0">
                            {qualification}
                          </p>

                          {profile?.field_of_study && (
                            <p className="mt-1 text-xs text-slate-400">
                              {profile.field_of_study}
                            </p>
                          )}
                        </div>

                        {/* Location */}
                        <div>
                          <p className="text-xs font-medium text-slate-400 md:hidden">
                            Location
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-600 md:mt-0">
                            <MapPin
                              size={14}
                              className="shrink-0 text-slate-400"
                            />

                            <span>
                              {location}
                            </span>
                          </div>
                        </div>

                        {/* Profile completion */}
                        <div>
                          <div className="flex items-center justify-between md:block">
                            <p className="text-xs font-medium text-slate-400 md:hidden">
                              Profile Completion
                            </p>

                            <span className="text-sm font-semibold text-[#0B1F3A]">
                              {educator.profile_completion}%
                            </span>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-[#1769c2]"
                              style={{
                                width: `${educator.profile_completion}%`,
                              }}
                            />
                          </div>

                          <p className="mt-1 text-[11px] text-slate-400">
                            {educator.profile_completion ===
                            100
                              ? "Complete"
                              : "Incomplete"}
                          </p>
                        </div>

                        {/* Action */}
                        <Link
                          to={`/admin/educators/${educator.id}`}
                          className="flex items-center justify-center gap-1.5 rounded-xl border border-[#1769c2] px-4 py-2 text-sm font-semibold text-[#1769c2] transition hover:bg-[#1769c2] hover:text-white"
                        >
                          View
                          <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}