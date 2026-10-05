import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import TeacherDashboardLayout from "../layouts/TeacherDashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import TeacherProfile from "../pages/teacher/TeacherProfile";

// Public pages
import Home from "../pages/public/Home";
import Teachers from "../pages/public/Teachers";
import Schools from "../pages/public/Schools";
import Resources from "../pages/public/Resources";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";

// Authentication pages
import Login from "../pages/auth/Login";
import TeacherRegister from "../pages/auth/TeacherRegister";

// Teacher pages
import TeacherDashboard from "../pages/teacher/TeacherDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* =========================================
          PUBLIC WEBSITE
          These pages use the navbar and footer
      ========================================= */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* =========================================
          AUTHENTICATION
          These pages do not use PublicLayout
      ========================================= */}
      <Route path="/login" element={<Login />} />

      <Route
        path="/teacher/register"
        element={<TeacherRegister />}
      />

      {/* =========================================
          TEACHER PORTAL
          Only authenticated teachers can access
      ========================================= */}
      <Route element={<ProtectedRoute allowedRoles={["TEACHER"]} />}>
        <Route element={<TeacherDashboardLayout />}>
          <Route
            path="/teacher/dashboard"
            element={<TeacherDashboard />}
          />
          </Route>
          <Route
            path="/teacher/profile"
            element={<TeacherProfile />}
          />
      </Route>
    </Routes>
  );
}

