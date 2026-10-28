import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { patientsAPI } from "../../services/api";

const defaultValues = {
  name: "",
  age: "",
  gender: "Female",
  condition: "",
  doctor: "",
  status: "Stable",
};

export default function NewPatientPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultValues);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.age || !formData.condition || !formData.doctor) return;

    try {
      await patientsAPI.create({ ...formData, age: Number(formData.age) });
      navigate("/admin/patients");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-shell patient-shell">
      <AdminSidebar />

      <main className="doctor-main">
        <div className="doctor-form-head">
          <Link to="/admin/patients" className="doctor-back-link">
            <ArrowLeft size={16} />
            <span>Back to Patients</span>
          </Link>
          <h1>Add New Patient</h1>
          <p>Enter patient details and save to add them to the list.</p>
        </div>

        {error && <p style={{ color: "#ef4444" }}>{error}</p>}

        <form className="doctor-form-card" onSubmit={handleSubmit}>
          <label>Full Name<input type="text" name="name" placeholder="e.g. Sarah Jenkins" value={formData.name} onChange={handleChange} required /></label>
          <label>Age<input type="number" name="age" placeholder="e.g. 34" value={formData.age} onChange={handleChange} required /></label>
          <label>Gender
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option>Female</option>
              <option>Male</option>
            </select>
          </label>
          <label>Condition<input type="text" name="condition" placeholder="e.g. Hypertension" value={formData.condition} onChange={handleChange} required /></label>
          <label>Assigned Doctor<input type="text" name="doctor" placeholder="e.g. Dr. Sarah Jenkins" value={formData.doctor} onChange={handleChange} required /></label>
          <label>Status
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>Stable</option>
              <option>Under Review</option>
              <option>Critical</option>
            </select>
          </label>

          <div className="doctor-form-actions">
            <Link to="/admin/patients" className="doctor-outline-btn">Cancel</Link>
            <button type="submit" className="doctor-add-btn">
              <Save size={16} />
              <span>Save Patient</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
