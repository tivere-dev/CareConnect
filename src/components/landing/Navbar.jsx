import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShieldPlus, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Doctors", href: "#doctors" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  function getDashboardPath() {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "doctor") return "/doctor/dashboard";
    return "/patient/dashboard";
  }

  return (
    <header className="site-header">
      <nav className="container nav-row" aria-label="Main navigation">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-icon">
            <ShieldPlus size={14} />
          </span>
          <span>CareConnect</span>
        </Link>

        <ul className="nav-links" role="list">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {user ? (
            <>
              <Link to={getDashboardPath()} className="pill-btn">Dashboard</Link>
              <button className="text-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-btn">Sign In</Link>
              <Link to="/register" className="pill-btn">Register</Link>
            </>
          )}
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open ? (
        <div className="mobile-menu">
          <div className="container mobile-menu-inner">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <div className="mobile-actions">
              {user ? (
                <>
                  <Link to={getDashboardPath()} className="pill-btn" onClick={() => setOpen(false)}>Dashboard</Link>
                  <button className="text-btn" onClick={() => { logout(); setOpen(false); }}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-btn" onClick={() => setOpen(false)}>Sign In</Link>
                  <Link to="/register" className="pill-btn" onClick={() => setOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
