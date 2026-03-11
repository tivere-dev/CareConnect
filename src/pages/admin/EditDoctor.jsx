import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

const defaultValues = {
  name: "",
  credential: "",
  specialization: "",
  email: "",
  status: "Active",
};

export default function EditDoctorPage({ doctors, onUpdateDoctor }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((item) => String(item.id) === id);
  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name,
        credential: doctor.credential,
        specialization: doctor.specialization,
        email: doctor.email,
        status: doctor.status,
      });
    }
  }, [doctor]);

  if (!doctor) {
    return (
      <div className="admin-shell doctor-shell">
        <AdminSidebar />
        <main className="doctor-main">
          <p>Doctor not found.</p>
          <Link to="/doctors" className="doctor-back-link">
            <ArrowLeft size={16} />
            <span>Back to Doctors</span>
          </Link>
        </main>
      </div>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateDoctor(doctor.id, formData);
    navigate("/doctors");
  }

  return (
    <div className="admin-shell doctor-shell">
      <AdminSidebar />

      <main className="doctor-main">
        <div className="doctor-form-head">
          <Link to="/doctors" className="doctor-back-link">
            <ArrowLeft size={16} />
            <span>Back to Doctors</span>
          </Link>
          <h1>Edit Doctor</h1>
          <p>Update doctor profile details and save changes.</p>
        </div>

        <form className="doctor-form-card" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="name"
              placeholder="e.g. Dr. Sarah Jenkins"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Professional Title
            <input
              type="text"
              name="credential"
              placeholder="e.g. MD, FACC"
              value={formData.credential}
              onChange={handleChange}
            />
          </label>

          <label>
            Specialization
            <input
              type="text"
              name="specialization"
              placeholder="e.g. Cardiology"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              name="email"
              placeholder="e.g. s.jenkins@careconnect.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
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
            <Link to="/doctors" className="doctor-outline-btn">
              Cancel
            </Link>
            <button type="submit" className="doctor-add-btn">
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
