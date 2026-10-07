import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import TeacherDashboardLayout from "../layouts/TeacherDashboardLayout";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";

import ProtectedRoute from "./ProtectedRoute";

// Public pages
import Home from "../pages/public/Home";
import Teachers from "../pages/public/Teachers";
import Schools from "../pages/public/Schools";
import Resources from "../pages/public/Resources";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";

// Authentication
import Login from "../pages/auth/Login";
import TeacherRegister from "../pages/auth/TeacherRegister";

// Teacher
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import TeacherProfile from "../pages/teacher/TeacherProfile";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminEducators from "../pages/admin/AdminEducators";
import AdminEducatorProfile from "../pages/admin/AdminEducatorProfile";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route
        path="/teacher/register"
        element={<TeacherRegister />}
      />

      {/* Teacher */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["TEACHER"]} />
        }
      >
        <Route element={<TeacherDashboardLayout />}>
          <Route
            path="/teacher/dashboard"
            element={<TeacherDashboard />}
          />

          <Route
            path="/teacher/profile"
            element={<TeacherProfile />}
          />
        </Route>
      </Route>

      {/* Admin */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]} />
        }
      >
        <Route element={<AdminDashboardLayout />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
           <Route
            path="/admin/educators"
            element={<AdminEducators />}
          />
          <Route
            path="/admin/educators/:id"
            element={<AdminEducatorProfile />}
          />
        </Route>
      </Route>
    </Routes>
  );
}