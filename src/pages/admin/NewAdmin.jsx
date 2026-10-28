import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { authAPI } from "../../services/api";

export default function NewAdminPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) return;

    try {
      await authAPI.createAdmin(formData);
      setSuccess("Admin account created successfully!");
      setTimeout(() => navigate("/admin/settings"), 1500);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-shell doctor-shell">
      <AdminSidebar />

      <main className="doctor-main">
        <div className="doctor-form-head">
          <Link to="/admin/settings" className="doctor-back-link">
            <ArrowLeft size={16} />
            <span>Back to Settings</span>
          </Link>
          <h1>Add New Admin</h1>
          <p>Create a new administrator account with full system access.</p>
        </div>

        {error && <p style={{ color: "#ef4444", marginBottom: "1rem" }}>{error}</p>}
        {success && <p style={{ color: "#22c55e", marginBottom: "1rem" }}>{success}</p>}

        <form className="doctor-form-card" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input type="text" name="name" placeholder="e.g. Jane Smith" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            Email Address
            <input type="email" name="email" placeholder="e.g. admin@careconnect.com" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            Password
            <input type="password" name="password" placeholder="Min 6 characters" value={formData.password} onChange={handleChange} required minLength={6} />
          </label>

          <div className="doctor-form-actions">
            <Link to="/admin/settings" className="doctor-outline-btn">Cancel</Link>
            <button type="submit" className="doctor-add-btn">
              <Save size={16} />
              <span>Create Admin</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
