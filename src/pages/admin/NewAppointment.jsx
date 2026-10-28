import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { appointmentsAPI, doctorsAPI, patientsAPI } from "../../services/api";

const defaultValues = {
  patient: "",
  doctor: "",
  type: "Consultation",
  date: "",
  time: "",
};

function toDisplayDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function toDisplayTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const hour12 = hours % 12 || 12;
  const suffix = hours >= 12 ? "PM" : "AM";
  return `${String(hour12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export default function NewAppointmentPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultValues);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    doctorsAPI.getAll().then((docs) => setDoctors(docs.filter((d) => d.status === "Active"))).catch(console.error);
    patientsAPI.getAll().then(setPatients).catch(console.error);
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formData.patient || !formData.doctor || !formData.date || !formData.time) return;

    try {
      await appointmentsAPI.create({
        patientId: formData.patient,
        doctorId: formData.doctor,
        type: formData.type,
        date: toDisplayDate(formData.date),
        time: toDisplayTime(formData.time),
      });
      navigate("/admin/appointments");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-shell appointment-shell">
      <AdminSidebar />

      <main className="doctor-main">
        <div className="doctor-form-head">
          <Link to="/admin/appointments" className="doctor-back-link">
            <ArrowLeft size={16} />
            <span>Back to Appointments</span>
          </Link>
          <h1>New Appointment</h1>
          <p>Fill in the details and save to create a new appointment.</p>
        </div>

        {error && <p style={{ color: "#ef4444" }}>{error}</p>}

        <form className="doctor-form-card" onSubmit={handleSubmit}>
          <label>
            Patient
            <select name="patient" value={formData.patient} onChange={handleChange} required>
              <option value="">Select a patient</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>{p.name}{p.email ? ` (${p.email})` : ""}</option>
              ))}
            </select>
          </label>

          <label>
            Doctor (Active Only)
            <select name="doctor" value={formData.doctor} onChange={handleChange} required>
              <option value="">Select a doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>{d.name} — {d.specialization}</option>
              ))}
            </select>
          </label>

          <label>
            Appointment Type
            <select name="type" value={formData.type} onChange={handleChange}>
              <option>Consultation</option>
              <option>Follow-up</option>
              <option>New Visit</option>
              <option>Routine Check</option>
              <option>Emergency</option>
            </select>
          </label>

          <label>Date<input type="date" name="date" value={formData.date} onChange={handleChange} required /></label>
          <label>Time<input type="time" name="time" value={formData.time} onChange={handleChange} required /></label>

          <div className="doctor-form-actions">
            <Link to="/admin/appointments" className="doctor-outline-btn">Cancel</Link>
            <button type="submit" className="doctor-add-btn">
              <Save size={16} />
              <span>Save Appointment</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
