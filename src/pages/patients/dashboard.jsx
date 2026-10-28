import "./dashboard.css";
import { useState, useEffect } from "react";
import {
  Bell,
  Calendar,
  Video,
  FileText,
  Pill,
  CalendarCheck,
  Search,
  LogOut,
  Clock,
  User,
  Mail,
  ChevronDown,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { appointmentsAPI, doctorsAPI, notificationsAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    doctor: "",
    type: "Consultation",
    date: "",
    time: "",
  });
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadData();
  }, [user]);

  async function loadData() {
    try {
      const [appts, docs, notifs] = await Promise.all([
        appointmentsAPI.getAll({ patient: user?.name }),
        doctorsAPI.getAll(),
        notificationsAPI.getAll().catch(() => []),
      ]);
      setAppointments(appts);
      setDoctors(docs);
      setNotifications(notifs);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkRead(id) {
    try {
      const updated = await notificationsAPI.markRead(id);
      setNotifications((prev) => prev.map((n) => (n._id === id ? updated : n)));
    } catch (err) {
      console.error(err);
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  async function handleBookAppointment(e) {
    e.preventDefault();
    setBookingError("");
    setBookingSuccess("");

    if (!bookingData.doctor || !bookingData.date || !bookingData.time) {
      setBookingError("Please fill in all fields");
      return;
    }

    try {
      await appointmentsAPI.create({
        patient: user.name,
        doctor: bookingData.doctor,
        type: bookingData.type,
        date: bookingData.date,
        time: bookingData.time,
        status: "Pending",
      });
      setBookingSuccess("Appointment booked successfully!");
      setBookingData({ doctor: "", type: "Consultation", date: "", time: "" });
      loadData();
      setTimeout(() => {
        setShowBooking(false);
        setBookingSuccess("");
      }, 1500);
    } catch (err) {
      setBookingError(err.message);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  const now = new Date();
  const upcoming = appointments.filter(
    (a) => a.status !== "Canceled" && new Date(a.date) >= new Date(now.toDateString())
  );
  const past = appointments.filter(
    (a) => a.status === "Canceled" || new Date(a.date) < new Date(now.toDateString())
  );

  if (loading) {
    return <div className="pd-loading">Loading your dashboard...</div>;
  }

  return (
    <div className="pd-dashboard">
      <header className="pd-navbar">
        <div className="pd-logo">
          <div className="pd-logo-icon">+</div>
          <h2>CareConnect</h2>
        </div>

        <div className="pd-nav-right">
          <div className="pd-bell-wrap">
            <Bell className="pd-icon" size={20} />
            {unreadCount > 0 && <span className="pd-bell-badge">{unreadCount}</span>}
          </div>
          <div className="pd-user-badge">
            <div className="pd-avatar">{user?.name?.charAt(0)?.toUpperCase() || "P"}</div>
            <span>{user?.name || "Patient"}</span>
          </div>
          <button className="pd-logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="pd-main">
        <div className="pd-content">
          <div className="pd-welcome">
            <div>
              <h1>Welcome back, {user?.name?.split(" ")[0] || "Patient"}</h1>
              <p>
                {upcoming.length > 0
                  ? `You have ${upcoming.length} upcoming appointment${upcoming.length > 1 ? "s" : ""}.`
                  : "You have no upcoming appointments. Book one now!"}
              </p>
            </div>
            <button className="pd-book-btn" onClick={() => setShowBooking(true)}>
              <CalendarCheck size={18} />
              Book Appointment
            </button>
          </div>

          <div className="pd-profile-card">
            <h3>Your Profile</h3>
            <div className="pd-profile-row">
              <div className="pd-profile-item">
                <User size={16} />
                <div>
                  <label>Full Name</label>
                  <p>{user?.name || "N/A"}</p>
                </div>
              </div>
              <div className="pd-profile-item">
                <Mail size={16} />
                <div>
                  <label>Email</label>
                  <p>{user?.email || "N/A"}</p>
                </div>
              </div>
              <div className="pd-profile-item">
                <FileText size={16} />
                <div>
                  <label>Role</label>
                  <p style={{ textTransform: "capitalize" }}>{user?.role || "patient"}</p>
                </div>
              </div>
            </div>
          </div>

          {notifications.length > 0 && (
            <div className="pd-notifications">
              <h3>Notifications {unreadCount > 0 && <span className="pd-notif-count">{unreadCount} new</span>}</h3>
              <div className="pd-notif-list">
                {notifications.map((n) => (
                  <div
                    key={n._id}
                    className={`pd-notif-item ${n.read ? "pd-notif-read" : "pd-notif-unread"}`}
                    onClick={() => !n.read && handleMarkRead(n._id)}
                    style={{ cursor: n.read ? "default" : "pointer" }}
                  >
                    <div className={`pd-notif-dot ${n.type === "appointment_accepted" ? "pd-notif-dot-green" : "pd-notif-dot-red"}`} />
                    <div className="pd-notif-body">
                      <p>{n.message}</p>
                      <small>{new Date(n.createdAt).toLocaleString()}{!n.read && " — Click to mark as read"}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pd-stats-row">
            <div className="pd-stat">
              <Calendar size={22} />
              <div>
                <p>Upcoming</p>
                <h2>{upcoming.length}</h2>
              </div>
            </div>
            <div className="pd-stat">
              <FileText size={22} />
              <div>
                <p>Total Visits</p>
                <h2>{appointments.length}</h2>
              </div>
            </div>
            <div className="pd-stat">
              <Pill size={22} />
              <div>
                <p>Completed</p>
                <h2>{past.filter((a) => a.status !== "Canceled").length}</h2>
              </div>
            </div>
          </div>

          <section className="pd-section">
            <h3>Upcoming Appointments</h3>
            {upcoming.length === 0 ? (
              <div className="pd-empty">
                <Calendar size={32} />
                <p>No upcoming appointments</p>
                <button className="pd-book-btn-sm" onClick={() => setShowBooking(true)}>
                  Book Now
                </button>
              </div>
            ) : (
              <div className="pd-appt-list">
                {upcoming.map((appt) => (
                  <div key={appt._id} className="pd-appt-card">
                    <div className="pd-appt-left">
                      <div className="pd-appt-date-badge">
                        <Calendar size={14} />
                        <span>{appt.date}</span>
                      </div>
                      <h4>{appt.doctor}</h4>
                      <p>{appt.type}</p>
                    </div>
                    <div className="pd-appt-right">
                      <div className="pd-appt-time">
                        <Clock size={14} />
                        <span>{appt.time}</span>
                      </div>
                      <span className={`pd-status pd-status-${appt.status.toLowerCase().replace(" ", "-")}`}>
                        {appt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="pd-section">
            <h3>Past Appointments</h3>
            {past.length === 0 ? (
              <div className="pd-empty">
                <FileText size={32} />
                <p>No past appointments yet</p>
              </div>
            ) : (
              <table className="pd-table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {past.map((appt) => (
                    <tr key={appt._id}>
                      <td>{appt.doctor}</td>
                      <td>{appt.type}</td>
                      <td>{appt.date}</td>
                      <td>{appt.time}</td>
                      <td>
                        <span className={`pd-status pd-status-${appt.status.toLowerCase().replace(" ", "-")}`}>
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      </div>

      {showBooking && (
        <div className="pd-modal-overlay" onClick={() => setShowBooking(false)}>
          <div className="pd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pd-modal-header">
              <h3>Book Appointment</h3>
              <button className="pd-modal-close" onClick={() => setShowBooking(false)}>
                <X size={20} />
              </button>
            </div>

            {bookingError && <p className="pd-error">{bookingError}</p>}
            {bookingSuccess && <p className="pd-success">{bookingSuccess}</p>}

            <form onSubmit={handleBookAppointment} className="pd-booking-form">
              <label>
                Doctor
                <select
                  value={bookingData.doctor}
                  onChange={(e) => setBookingData((p) => ({ ...p, doctor: e.target.value }))}
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((d) => (
                    <option key={d._id} value={d.name}>
                      {d.name} - {d.specialization}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Appointment Type
                <select
                  value={bookingData.type}
                  onChange={(e) => setBookingData((p) => ({ ...p, type: e.target.value }))}
                >
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
                  value={bookingData.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setBookingData((p) => ({ ...p, date: e.target.value }))}
                  required
                />
              </label>

              <label>
                Time
                <input
                  type="time"
                  value={bookingData.time}
                  onChange={(e) => setBookingData((p) => ({ ...p, time: e.target.value }))}
                  required
                />
              </label>

              <button type="submit" className="pd-submit-btn">
                <CalendarCheck size={18} />
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="pd-footer">
        <p>&copy; 2026 CareConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
