import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import logo from "../../assets/Logo/Logo.png";

const API_URL = "http://127.0.0.1:8000/api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.detail || "Invalid email address or password.",
        );
        return;
      }

      if (!data.access || !data.refresh) {
        setError(
          "Login failed. No authentication token was returned.",
        );
        return;
      }

      // Clear any old authentication data first
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      sessionStorage.removeItem("access");
      sessionStorage.removeItem("refresh");
      sessionStorage.removeItem("user");

      // Store the tokens using the same names expected
      // by ProtectedRoute and TeacherDashboardLayout.
      const storage = rememberMe
        ? localStorage
        : sessionStorage;

      storage.setItem("access", data.access);
      storage.setItem("refresh", data.refresh);

      // Get the logged-in user's details
      const userResponse = await fetch(`${API_URL}/me/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      });

      if (!userResponse.ok) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
        sessionStorage.removeItem("user");

        setError("Unable to load your account information.");
        return;
      }

      const user = await userResponse.json();

      storage.setItem("user", JSON.stringify(user));

      // Redirect based on the user's role
      if (user.role === "TEACHER") {
        navigate("/teacher/dashboard", {
          replace: true,
        });
        return;
      }

      if (user.role === "SCHOOL") {
        navigate("/school/dashboard", {
          replace: true,
        });
        return;
      }

      if (user.role === "ADMIN") {
        navigate("/admin/dashboard", {
          replace: true,
        });
        return;
      }

      navigate("/", {
        replace: true,
      });
    } catch {
      setError(
        "Unable to connect to the server. Please make sure the Django server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-200 sm:p-9">
          {/* Logo */}
          <div className="mb-5 flex justify-center">
            <Link to="/">
              <img
                src={logo}
                alt="Elephant Learning"
                className="h-20 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold text-[#0B1F3A]">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to your Elephant Learning account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">
              {error}
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-11 text-sm outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
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
            </div>

            {/* Remember me / Forgot password */}
            <div className="flex items-center justify-between gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 accent-[#0B1F3A]"
                />

                <span className="text-sm text-gray-600">
                  Remember me
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-[#0B1F3A] transition hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#102d52] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}

              {!loading && (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={() => {
              setError(
                "Google login will be available once Google authentication is configured.",
              );
            }}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <span className="text-base font-bold text-[#4285F4]">
              G
            </span>

            Continue with Google
          </button>

          {/* LinkedIn */}
          <button
            type="button"
            onClick={() => {
              setError(
                "LinkedIn login will be available once LinkedIn authentication is configured.",
              );
            }}
            className="mt-3 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#0A66C2] text-xs font-bold text-white">
              in
            </span>

            Continue with LinkedIn
          </button>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/teacher/register"
              className="font-semibold text-[#0B1F3A] transition hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Back link */}
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

