import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

const defaultValues = {
  patient: "",
  doctor: "",
  type: "Consultation",
  date: "",
  time: "",
  status: "Pending",
};

function toDisplayDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function toDisplayTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const hour12 = hours % 12 || 12;
  const suffix = hours >= 12 ? "PM" : "AM";
  return `${String(hour12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export default function NewAppointmentPage({ onAddAppointment }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultValues);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.patient || !formData.doctor || !formData.date || !formData.time) {
      return;
    }

    onAddAppointment({
      ...formData,
      date: toDisplayDate(formData.date),
      time: toDisplayTime(formData.time),
    });

    navigate("/admin/appointments");
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

        <form className="doctor-form-card" onSubmit={handleSubmit}>
          <label>
            Patient Name
            <input
              type="text"
              name="patient"
              placeholder="e.g. Sarah Jenkins"
              value={formData.patient}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Assigned Doctor
            <input
              type="text"
              name="doctor"
              placeholder="e.g. Dr. Robert Miller"
              value={formData.doctor}
              onChange={handleChange}
              required
            />
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

          <label>
            Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Time
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Status
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>In Progress</option>
              <option>Canceled</option>
            </select>
          </label>

          <div className="doctor-form-actions">
            <Link to="/admin/appointments" className="doctor-outline-btn">
              Cancel
            </Link>
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
