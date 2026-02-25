import {
  Bell,
  CalendarDays,
  Check,
  CircleDashed,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const stats = [
  {
    icon: Users,
    label: "TOTAL USERS",
    value: "12,450",
    note: "Active patients and staff members",
    trend: "+4.2%",
    trendTone: "up",
    tint: "blue",
  },
  {
    icon: Stethoscope,
    label: "ACTIVE DOCTORS",
    value: "342",
    note: "Specialists currently on duty",
    trend: "98% Online",
    trendTone: "success",
    tint: "indigo",
  },
  {
    icon: CalendarDays,
    label: "MONTHLY APPOINTMENTS",
    value: "1,280",
    note: "Confirmed bookings this month",
    trend: "+12%",
    trendTone: "up",
    tint: "amber",
  },
];

const recentActivity = [
  {
    title: "New appointment booked",
    subtitle: "Patient: Sarah Jenkins • Dr. Miller",
    time: "2 MINS AGO",
    icon: CircleDashed,
    tone: "blue",
  },
  {
    title: "Appointment Completed",
    subtitle: "Patient: John Doe • General Checkup",
    time: "15 MINS AGO",
    icon: Check,
    tone: "green",
  },
  {
    title: "Doctor Profile Updated",
    subtitle: "Dr. Emma Watson changed schedule",
    time: "1 HOUR AGO",
    icon: Search,
    tone: "amber",
  },
  {
    title: "Cancellation Request",
    subtitle: "Patient: Mike Ross • Urgent Review",
    time: "3 HOURS AGO",
    icon: X,
    tone: "red",
  },
];

const appointments = [
  {
    patient: "Sarah Jenkins",
    patientInitials: "SJ",
    doctor: "Dr. Robert Miller",
    dept: "CARDIOLOGY",
    date: "Oct 12, 2023",
    time: "10:30 AM",
    status: "CONFIRMED",
  },
  {
    patient: "Michael Cho",
    patientInitials: "MC",
    doctor: "Dr. Emma Watson",
    dept: "NEUROLOGY",
    date: "Oct 12, 2023",
    time: "01:15 PM",
    status: "PENDING",
  },
  {
    patient: "Olivia Rhye",
    patientInitials: "OR",
    doctor: "Dr. Sarah Johnson",
    dept: "GENERAL HEALTH",
    date: "Oct 12, 2023",
    time: "03:30 PM",
    status: "IN PROGRESS",
  },
];

const statusClass = {
  CONFIRMED: "admin-status admin-status-confirmed",
  PENDING: "admin-status admin-status-pending",
  "IN PROGRESS": "admin-status admin-status-progress",
};

function TrendChart() {
  return (
    <svg
      className="admin-chart"
      viewBox="0 0 660 220"
      preserveAspectRatio="none"
      aria-label="Appointment trend chart"
    >
      <polyline
        points="20,170 125,152 230,162 335,118 440,124 545,98 640,84"
        className="admin-line admin-line-completed"
      />
      <polyline
        points="20,180 125,174 230,180 335,162 440,174 545,150 640,146"
        className="admin-line admin-line-cancelled"
      />
      <g className="admin-point-group">
        <circle cx="545" cy="98" r="5" className="admin-point-completed" />
        <circle cx="640" cy="84" r="5" className="admin-point-completed" />
      </g>
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <div className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <header className="admin-topbar">
          <label className="admin-search" htmlFor="admin-search-input">
            <Search size={18} />
            <input
              id="admin-search-input"
              type="search"
              placeholder="Search patients, records, or doctors..."
            />
          </label>

          <div className="admin-topbar-actions">
            <button className="admin-notify" aria-label="Notifications">
              <Bell size={18} />
              <span className="admin-dot" />
            </button>
            <button className="admin-book-btn">
              <Plus size={16} />
              <span>New Booking</span>
            </button>
          </div>
        </header>

        <div className="admin-content">
          <div className="admin-page-head">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Welcome back, here&apos;s what&apos;s happening today.</p>
            </div>
            <div className="admin-range-switch">
              <button className="active">Daily</button>
              <button>Weekly</button>
              <button>Monthly</button>
            </div>
          </div>

          <section className="admin-stat-grid">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <article className="admin-stat-card" key={item.label}>
                  <div className="admin-stat-head">
                    <div className={`admin-stat-icon ${item.tint}`}>
                      <Icon size={17} />
                    </div>
                    <span className={`admin-trend ${item.trendTone}`}>{item.trend}</span>
                  </div>
                  <p className="admin-stat-label">{item.label}</p>
                  <h2>{item.value}</h2>
                  <p className="admin-stat-note">{item.note}</p>
                </article>
              );
            })}
          </section>

          <section className="admin-mid-grid">
            <article className="admin-card admin-trends-card">
              <div className="admin-card-head">
                <div>
                  <h3>Appointment Trends</h3>
                  <p>Volume comparison for the last 6 months</p>
                </div>
                <div className="admin-legend">
                  <span>
                    <i className="completed" /> Completed
                  </span>
                  <span>
                    <i className="cancelled" /> Canceled
                  </span>
                </div>
              </div>
              <TrendChart />
              <div className="admin-months">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </article>

            <article className="admin-card admin-activity-card">
              <div className="admin-card-head">
                <h3>Recent Activity</h3>
                <a href="#">View All</a>
              </div>

              <div className="admin-activity-list">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div className="admin-activity-item" key={activity.title}>
                      <span className={`admin-activity-icon ${activity.tone}`}>
                        <Icon size={14} />
                      </span>
                      <div>
                        <h4>{activity.title}</h4>
                        <p>{activity.subtitle}</p>
                        <small>{activity.time}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          </section>

          <section className="admin-card admin-table-card">
            <div className="admin-card-head">
              <h3>Today&apos;s Appointment List</h3>
              <button className="admin-filter-btn">
                <Filter size={14} />
                <span>Filter</span>
              </button>
            </div>

            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>PATIENT NAME</th>
                    <th>DOCTOR ASSIGNED</th>
                    <th>DATE &amp; TIME</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((row) => (
                    <tr key={row.patient}>
                      <td>
                        <div className="admin-person">
                          <span className="admin-person-avatar">{row.patientInitials}</span>
                          <span>{row.patient}</span>
                        </div>
                      </td>
                      <td>
                        <strong>{row.doctor}</strong>
                        <small>{row.dept}</small>
                      </td>
                      <td>
                        <strong>{row.date}</strong>
                        <small>{row.time}</small>
                      </td>
                      <td>
                        <span className={statusClass[row.status]}>{row.status}</span>
                      </td>
                      <td>
                        <button className="admin-kebab" aria-label="More actions">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
