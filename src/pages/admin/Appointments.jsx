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
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

const statusClass = {
  Confirmed: "appointment-status appointment-status-confirmed",
  Pending: "appointment-status appointment-status-pending",
  "In Progress": "appointment-status appointment-status-progress",
  Canceled: "appointment-status appointment-status-canceled",
};

export default function AppointmentsPage({ appointments }) {
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
                  <th>APPOINTMENT ID</th>
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
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.patient}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.type}</td>
                    <td>
                      <strong>{appointment.date}</strong>
                      <small>{appointment.time}</small>
                    </td>
                    <td>
                      <span className={statusClass[appointment.status]}>{appointment.status}</span>
                    </td>
                    <td>
                      <div className="doctor-actions-cell">
                        <button type="button" aria-label={`Delete ${appointment.id}`}>
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
            <div className="doctor-pagination">
              <button type="button" aria-label="Previous page">
                ‹
              </button>
              <button type="button" className="active">
                1
              </button>
              <button type="button">2</button>
              <button type="button">3</button>
              <span>...</span>
              <button type="button">5</button>
              <button type="button" aria-label="Next page">
                ›
              </button>
            </div>
          </div>
        </section>

        <section className="doctor-summary-grid">
          <article className="doctor-summary-card">
            <span className="doctor-summary-icon blue">
              <CalendarClock size={18} />
            </span>
            <div>
              <p>Total Appointments</p>
              <strong>{appointments.length}</strong>
            </div>
          </article>

          <article className="doctor-summary-card">
            <span className="doctor-summary-icon green">
              <CheckCircle2 size={18} />
            </span>
            <div>
              <p>Confirmed</p>
              <strong>{appointments.filter((item) => item.status === "Confirmed").length}</strong>
            </div>
          </article>

          <article className="doctor-summary-card">
            <span className="doctor-summary-icon indigo">
              <Clock3 size={18} />
            </span>
            <div>
              <p>In Progress</p>
              <strong>
                {appointments.filter((item) => item.status === "In Progress").length}
              </strong>
            </div>
          </article>

          <article className="doctor-summary-card">
            <span className="doctor-summary-icon amber">
              <UserCheck2 size={18} />
            </span>
            <div>
              <p>Pending</p>
              <strong>{appointments.filter((item) => item.status === "Pending").length}</strong>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
