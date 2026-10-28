import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { doctorsAPI } from "../../services/api";

const defaultValues = {
  name: "",
  credential: "",
  specialization: "",
  email: "",
  status: "Active",
};

export default function EditDoctorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultValues);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    doctorsAPI
      .getById(id)
      .then((doctor) => {
        setFormData({
          name: doctor.name,
          credential: doctor.credential,
          specialization: doctor.specialization,
          email: doctor.email,
          status: doctor.status,
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="admin-shell doctor-shell"><AdminSidebar /><main className="doctor-main"><p>Loading...</p></main></div>;

  if (notFound) {
    return (
      <div className="admin-shell doctor-shell">
        <AdminSidebar />
        <main className="doctor-main">
          <p>Doctor not found.</p>
          <Link to="/admin/doctors" className="doctor-back-link">
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

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await doctorsAPI.update(id, formData);
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
          <h1>Edit Doctor</h1>
          <p>Update doctor profile details and save changes.</p>
        </div>

        {error && <p style={{ color: "#ef4444" }}>{error}</p>}

        <form className="doctor-form-card" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            Professional Title
            <input type="text" name="credential" value={formData.credential} onChange={handleChange} />
          </label>

          <label>
            Specialization
            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
          </label>

          <label>
            Email Address
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
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
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
