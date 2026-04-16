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
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SETTINGS_STORAGE_KEY, SETTINGS_UPDATED_EVENT } from "../../constants/adminSettings";

const mainLinks = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin/dashboard" },
  { label: "Doctors", icon: Stethoscope, to: "/admin/doctors" },
  { label: "Patients", icon: UserRound, to: "/admin/patients" },
  { label: "Appointments", icon: ClipboardList, to: "/admin/appointments" },
];

const systemLinks = [
  { label: "Reports", icon: FileBarChart2, to: "/admin/reports" },
  { label: "Settings", icon: Settings, to: "/admin/settings" },
];

const defaultBrandSettings = {
  platformName: "CareConnect",
  logoDataUrl: "",
};

function readBrandSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return defaultBrandSettings;

    const parsed = JSON.parse(raw);
    return {
      platformName: parsed?.platformName?.trim() || defaultBrandSettings.platformName,
      logoDataUrl: parsed?.logoDataUrl || "",
    };
  } catch {
    return defaultBrandSettings;
  }
}

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [brandSettings, setBrandSettings] = useState(() => readBrandSettings());

  useEffect(() => {
    function syncBrand() {
      setBrandSettings(readBrandSettings());
    }

    window.addEventListener("storage", syncBrand);
    window.addEventListener(SETTINGS_UPDATED_EVENT, syncBrand);
    return () => {
      window.removeEventListener("storage", syncBrand);
      window.removeEventListener(SETTINGS_UPDATED_EVENT, syncBrand);
    };
  }, []);

  function isLinkActive(to) {
    if (location.pathname === to) return true;
    if (to === "/admin/reports" && location.pathname === "/reports") return true;
    if (to === "/admin/settings" && location.pathname === "/settings") return true;
    return false;
  }

  return (
    <aside className="admin-sidebar">
      <button
        type="button"
        className="admin-logo admin-logo-btn"
        aria-label="CareConnect home"
        onClick={() => navigate("/admin/dashboard")}
      >
        <span className="admin-logo-mark">
          {brandSettings.logoDataUrl ? (
            <img src={brandSettings.logoDataUrl} alt="Platform logo" className="admin-logo-image" />
          ) : (
            <ShieldPlus size={14} />
          )}
        </span>
        <span>{brandSettings.platformName}</span>
      </button>

      <nav className="admin-nav" aria-label="Main">
        {mainLinks.map(({ label, icon: Icon, to }) => (
          <button
            type="button"
            className={`admin-nav-link admin-nav-button ${isLinkActive(to) ? "active" : ""}`}
            onClick={() => navigate(to)}
            key={label}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="admin-nav-label">SYSTEM</div>

      <nav className="admin-nav" aria-label="System">
        {systemLinks.map(({ label, icon: Icon, to }) => (
          <button
            type="button"
            className={`admin-nav-link admin-nav-button ${isLinkActive(to) ? "active" : ""}`}
            onClick={() => navigate(to)}
            key={label}
          >
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
