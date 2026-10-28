import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { doctorsAPI } from "../../services/api";

const defaultValues = {
  name: "",
  credential: "",
  specialization: "",
  email: "",
  password: "",
  status: "Active",
};

export default function NewDoctorPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultValues);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.specialization || !formData.email) return;

    try {
      await doctorsAPI.create({
        name: formData.name.startsWith("Dr.") ? formData.name : `Dr. ${formData.name}`,
        credential: formData.credential || formData.specialization,
        specialization: formData.specialization,
        email: formData.email,
        password: formData.password,
        status: formData.status,
      });
      navigate("/admin/doctors");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-shell doctor-shell">
      <AdminSidebar />

      <main className="doctor-main">
        <div className="doctor-form-head">
          <Link to="/admin/doctors" className="doctor-back-link">
            <ArrowLeft size={16} />
            <span>Back to Doctors</span>
          </Link>
          <h1>Add New Doctor</h1>
          <p>Fill in the doctor details and save to add them to the management table.</p>
        </div>

        {error && <p style={{ color: "#ef4444" }}>{error}</p>}

        <form className="doctor-form-card" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input type="text" name="name" placeholder="e.g. Sarah Jenkins" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            Professional Title
            <input type="text" name="credential" placeholder="e.g. MD, FACC" value={formData.credential} onChange={handleChange} />
          </label>

          <label>
            Specialization
            <input type="text" name="specialization" placeholder="e.g. Cardiology" value={formData.specialization} onChange={handleChange} required />
          </label>

          <label>
            Email Address
            <input type="email" name="email" placeholder="e.g. s.jenkins@careconnect.com" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            Login Password
            <input type="password" name="password" placeholder="Password for doctor login (min 6 chars)" value={formData.password} onChange={handleChange} required minLength={6} />
          </label>

          <label>
            Status
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>Active</option>
              <option>Inactive</option>
              <option>On Leave</option>
            </select>
          </label>

          <div className="doctor-form-actions">
            <Link to="/admin/doctors" className="doctor-outline-btn">Cancel</Link>
            <button type="submit" className="doctor-add-btn">
              <Save size={16} />
              <span>Save Doctor</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
