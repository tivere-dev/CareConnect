import { useState } from "react";
import {Link} from "react-router-dom";
import { Menu, ShieldPlus, X } from "lucide-react";

const navItems = [
  { label: "Doctors", href: "#doctors" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="container nav-row" aria-label="Main navigation">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-icon">
            <ShieldPlus size={14} />
          </span>
          <span>CareConnect</span>
        </a>

        <ul className="nav-links" role="list">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="text-btn">Sign In</button>
          <button className="pill-btn">Register</button>
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
              <button className="text-btn">Sign In</button>
              <button className="pill-btn">Register</button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
