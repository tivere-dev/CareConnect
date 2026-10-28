import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import './App.css';
import './index.css';
import './public.css';

import LandingPage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/Registration";

import AdminDashboard from "./pages/admin/Dashboard";
import DoctorManagement from "./pages/admin/DoctorManagement";
import NewDoctor from "./pages/admin/NewDoctor";
import EditDoctor from "./pages/admin/EditDoctor";
import Patients from "./pages/admin/Patients";
import NewPatient from "./pages/admin/NewPatient";
import EditPatient from "./pages/admin/EditPatient";
import Appointments from "./pages/admin/Appointments";
import NewAppointment from "./pages/admin/NewAppointment";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import NewAdmin from "./pages/admin/NewAdmin";

import PatientDashboard from "./pages/patients/dashboard";
import DoctorProfile from "./pages/patients/doctorsProfile";
import Booking from "./pages/patients/Appiontments";

import DoctorDashboard from "./pages/doctors/dashboard";
import FindDoctors from "./pages/doctors/find-doctors";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  function getHomeRedirect() {
    if (!user) return "/";
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "doctor") return "/doctor/dashboard";
    return "/patient/dashboard";
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to={getHomeRedirect()} replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={getHomeRedirect()} replace /> : <Register />} />

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/doctors" element={<ProtectedRoute allowedRoles={["admin"]}><DoctorManagement /></ProtectedRoute>} />
      <Route path="/admin/doctors/new" element={<ProtectedRoute allowedRoles={["admin"]}><NewDoctor /></ProtectedRoute>} />
      <Route path="/admin/doctors/:id/edit" element={<ProtectedRoute allowedRoles={["admin"]}><EditDoctor /></ProtectedRoute>} />
      <Route path="/admin/patients" element={<ProtectedRoute allowedRoles={["admin"]}><Patients /></ProtectedRoute>} />
      <Route path="/admin/patients/new" element={<ProtectedRoute allowedRoles={["admin"]}><NewPatient /></ProtectedRoute>} />
      <Route path="/admin/patients/:id/edit" element={<ProtectedRoute allowedRoles={["admin"]}><EditPatient /></ProtectedRoute>} />
      <Route path="/admin/appointments" element={<ProtectedRoute allowedRoles={["admin"]}><Appointments /></ProtectedRoute>} />
      <Route path="/admin/appointments/new" element={<ProtectedRoute allowedRoles={["admin"]}><NewAppointment /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={["admin"]}><Reports /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={["admin"]}><Settings /></ProtectedRoute>} />
      <Route path="/admin/admins/new" element={<ProtectedRoute allowedRoles={["admin"]}><NewAdmin /></ProtectedRoute>} />

      {/* Patient routes */}
      <Route path="/patient/dashboard" element={<ProtectedRoute allowedRoles={["patient"]}><PatientDashboard /></ProtectedRoute>} />
      <Route path="/doctor/profile" element={<ProtectedRoute allowedRoles={["patient"]}><DoctorProfile /></ProtectedRoute>} />
      <Route path="/booking" element={<ProtectedRoute allowedRoles={["patient"]}><Booking /></ProtectedRoute>} />

      {/* Doctor routes */}
      <Route path="/doctor/dashboard" element={<ProtectedRoute allowedRoles={["doctor"]}><DoctorDashboard /></ProtectedRoute>} />
      <Route path="/doctor/find-doctors" element={<ProtectedRoute allowedRoles={["doctor", "patient"]}><FindDoctors /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
