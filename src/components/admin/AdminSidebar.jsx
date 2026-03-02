import {
  ClipboardList,
  FileBarChart2,
  LayoutDashboard,
  Settings,
  ShieldPlus,
  Stethoscope,
  User,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const mainLinks = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
  { label: "Doctors", icon: Stethoscope, to: "/admin/doctors" },
  { label: "Patients", icon: UserRound, to: "/admin/patients" },
  { label: "Appointments", icon: ClipboardList, to: "/admin/appointments" },
];

const systemLinks = [
  { label: "Reports", icon: FileBarChart2 },
  { label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <NavLink className="admin-logo" to="/admin/dashboard" aria-label="CareConnect home">
        <span className="admin-logo-mark">
          <ShieldPlus size={14} />
        </span>
        <span>CareConnect</span>
      </NavLink>

      <nav className="admin-nav" aria-label="Main">
        {mainLinks.map(({ label, icon: Icon, to }) =>
          to ? (
            <NavLink
              className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
              to={to}
              key={label}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ) : (
            <button type="button" className="admin-nav-link admin-nav-button" key={label}>
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ),
        )}
      </nav>

      <div className="admin-nav-label">SYSTEM</div>

      <nav className="admin-nav" aria-label="System">
        {systemLinks.map(({ label, icon: Icon }) => (
          <button type="button" className="admin-nav-link admin-nav-button" key={label}>
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <article className="admin-profile-card">
        <div className="admin-avatar">AR</div>
        <div>
          <h4>Dr. Alex Rivers</h4>
          <p>Chief Administrator</p>
        </div>
      </article>
    </aside>
  );
}
