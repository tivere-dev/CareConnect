import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

export default function EditPatientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultValues);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    patientsAPI
      .getById(id)
      .then((patient) => {
        setFormData({
          name: patient.name,
          age: String(patient.age),
          gender: patient.gender,
          condition: patient.condition,
          doctor: patient.doctor,
          status: patient.status,
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="admin-shell patient-shell"><AdminSidebar /><main className="doctor-main"><p>Loading...</p></main></div>;

  if (notFound) {
    return (
      <div className="admin-shell patient-shell">
        <AdminSidebar />
        <main className="doctor-main">
          <p>Patient not found.</p>
          <Link to="/admin/patients" className="doctor-back-link">
            <ArrowLeft size={16} />
            <span>Back to Patients</span>
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
      await patientsAPI.update(id, { ...formData, age: Number(formData.age) });
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
          <h1>Edit Patient</h1>
          <p>Update patient profile details and save changes.</p>
        </div>

        {error && <p style={{ color: "#ef4444" }}>{error}</p>}

        <form className="doctor-form-card" onSubmit={handleSubmit}>
          <label>Full Name<input type="text" name="name" value={formData.name} onChange={handleChange} required /></label>
          <label>Age<input type="number" name="age" value={formData.age} onChange={handleChange} required /></label>
          <label>Gender
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option>Female</option>
              <option>Male</option>
            </select>
          </label>
          <label>Condition<input type="text" name="condition" value={formData.condition} onChange={handleChange} required /></label>
          <label>Assigned Doctor<input type="text" name="doctor" value={formData.doctor} onChange={handleChange} required /></label>
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
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
