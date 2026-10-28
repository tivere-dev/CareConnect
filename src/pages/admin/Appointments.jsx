import { useEffect, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  Download,
  Filter,
  Plus,
  Search,
  Trash2,
  UserCheck2,
  XCircle,
  Check,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { appointmentsAPI } from "../../services/api";

const statusClass = {
  Accepted: "appointment-status appointment-status-confirmed",
  Pending: "appointment-status appointment-status-pending",
  Completed: "appointment-status appointment-status-progress",
  Rejected: "appointment-status appointment-status-canceled",
  Confirmed: "appointment-status appointment-status-confirmed",
  "In Progress": "appointment-status appointment-status-progress",
  Canceled: "appointment-status appointment-status-canceled",
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    appointmentsAPI.getAll().then(setAppointments).catch(console.error).finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    try {
      await appointmentsAPI.delete(id);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      const updated = await appointmentsAPI.updateStatus(id, status);
      setAppointments((prev) => prev.map((a) => (a._id === id ? updated : a)));
      setMessage(`Appointment ${status.toLowerCase()} successfully!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  }

  if (loading)
    return (
      <div className="admin-shell appointment-shell">
        <AdminSidebar />
        <main className="doctor-main appointment-main">
          <p>Loading...</p>
        </main>
      </div>
    );

  return (
    <div className="admin-shell appointment-shell">
      <AdminSidebar />

      <main className="doctor-main appointment-main">
        <div className="doctor-head-row">
          <div>
            <p className="doctor-breadcrumb">Dashboard &gt; Appointments</p>
            <h1>Appointment Management</h1>
          </div>

          <Link to="/admin/appointments/new" className="doctor-add-btn">
            <Plus size={18} />
            <span>New Appointment</span>
          </Link>
        </div>

        {message && (
          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "10px 16px",
              borderRadius: 8,
              marginBottom: 16,
              fontSize: 14,
            }}
          >
            {message}
          </div>
        )}

        <section className="doctor-search-card">
          <label className="doctor-search-input" htmlFor="appointment-search">
            <Search size={18} />
            <input
              id="appointment-search"
              type="search"
              placeholder="Search by appointment ID, patient, or doctor..."
            />
          </label>
          <div className="doctor-search-actions">
            <button type="button" className="doctor-outline-btn">
              <Filter size={16} />
              <span>Filters</span>
            </button>
            <button type="button" className="doctor-outline-btn">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </section>

        <section className="doctor-table-card">
          <div className="doctor-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>PATIENT</th>
                  <th>DOCTOR</th>
                  <th>TYPE</th>
                  <th>DATE &amp; TIME</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.patient}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.type}</td>
                    <td>
                      <strong>{appointment.date}</strong>
                      <small>{appointment.time}</small>
                    </td>
                    <td>
                      <span className={statusClass[appointment.status] || "appointment-status"}>
                        {appointment.status}
                      </span>
                    </td>
                    <td>
                      <div className="doctor-actions-cell" style={{ display: "flex", gap: 6 }}>
                        {appointment.status === "Pending" && (
                          <>
                            <button
                              type="button"
                              title="Accept"
                              onClick={() => handleStatusChange(appointment._id, "Accepted")}
                              style={{
                                background: "#dcfce7",
                                color: "#166534",
                                border: "none",
                                borderRadius: 6,
                                padding: "6px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Check size={16} />
                            </button>

                            <button
                              type="button"
                              title="Reject"
                              onClick={() => handleStatusChange(appointment._id, "Rejected")}
                              style={{
                                background: "#fee2e2",
                                color: "#991b1b",
                                border: "none",
                                borderRadius: 6,
                                padding: "6px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          aria-label="Delete"
                          onClick={() => handleDelete(appointment._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="doctor-table-foot">
            <p>
              Showing 1 to {appointments.length} of {appointments.length} appointments
            </p>
          </div>
        </section>

        <section className="doctor-summary-grid">
          <article className="doctor-summary-card">
            <span className="doctor-summary-icon blue">
              <CalendarClock size={18} />
            </span>
            <div>
              <p>Total</p>
              <strong>{appointments.length}</strong>
            </div>
          </article>

          <article className="doctor-summary-card">
            <span className="doctor-summary-icon green">
              <CheckCircle2 size={18} />
            </span>
            <div>
              <p>Accepted</p>
              <strong>
                {appointments.filter(
                  (a) => a.status === "Accepted" || a.status === "Confirmed"
                ).length}
              </strong>
            </div>
          </article>

          <article className="doctor-summary-card">
            <span className="doctor-summary-icon indigo">
              <Clock3 size={18} />
            </span>
            <div>
              <p>Completed</p>
              <strong>
                {appointments.filter(
                  (a) => a.status === "Completed" || a.status === "In Progress"
                ).length}
              </strong>
            </div>
          </article>

          <article className="doctor-summary-card">
            <span className="doctor-summary-icon amber">
              <UserCheck2 size={18} />
            </span>
            <div>
              <p>Pending</p>
              <strong>
                {appointments.filter((a) => a.status === "Pending").length}
              </strong>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}