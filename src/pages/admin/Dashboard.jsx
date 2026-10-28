import { useEffect, useState } from "react";
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
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { dashboardAPI } from "../../services/api";

const PIE_COLORS = ["#f59e0b", "#22c55e", "#ef4444", "#6366f1"];

const statusClass = {
  ACCEPTED: "admin-status admin-status-confirmed",
  CONFIRMED: "admin-status admin-status-confirmed",
  PENDING: "admin-status admin-status-pending",
  "IN PROGRESS": "admin-status admin-status-progress",
  COMPLETED: "admin-status admin-status-progress",
  REJECTED: "admin-status admin-status-canceled",
  CANCELED: "admin-status admin-status-canceled",
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatMonth(key) {
  const [, m] = key.split("-");
  return MONTH_NAMES[parseInt(m, 10) - 1] || key;
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    dashboardAPI.getStats().then(setStats).catch(console.error);
  }, []);

  const statCards = [
    {
      icon: Users,
      label: "TOTAL USERS",
      value: stats ? stats.totalUsers.toLocaleString() : "...",
      note: "Active patients and staff members",
      trend: "+4.2%",
      trendTone: "up",
      tint: "blue",
    },
    {
      icon: Stethoscope,
      label: "ACTIVE DOCTORS",
      value: stats ? stats.activeDoctors.toLocaleString() : "...",
      note: "Specialists currently on duty",
      trend: stats ? `${stats.totalDoctors} Total` : "",
      trendTone: "success",
      tint: "indigo",
    },
    {
      icon: CalendarDays,
      label: "TOTAL APPOINTMENTS",
      value: stats ? stats.totalAppointments.toLocaleString() : "...",
      note: "All booked appointments",
      trend: stats ? `${stats.confirmedAppointments} Accepted` : "",
      trendTone: "up",
      tint: "amber",
    },
  ];

  const pieData = stats?.statusBreakdown
    ? [
        { name: "Pending", value: stats.statusBreakdown.pending },
        { name: "Accepted", value: stats.statusBreakdown.accepted },
        { name: "Rejected", value: stats.statusBreakdown.rejected },
        { name: "Completed", value: stats.statusBreakdown.completed },
      ].filter((d) => d.value > 0)
    : [];

  const barData = (stats?.monthlyTrend || []).map((m) => ({
    month: formatMonth(m.month),
    Accepted: m.accepted,
    Rejected: m.rejected,
    Pending: m.pending,
    Completed: m.completed,
  }));

  const tableRows = stats?.recentAppointments?.map((apt) => ({
    patient: apt.patient,
    patientInitials: apt.patient.split(" ").map((w) => w[0]).join("").toUpperCase(),
    doctor: apt.doctor,
    date: apt.date,
    time: apt.time,
    status: apt.status?.toUpperCase(),
  })) || [];

  return (
    <div className="admin-shell">
      <AdminSidebar />

      <section className="admin-main">
        <header className="admin-topbar">
          <label className="admin-search" htmlFor="admin-search-input">
            <Search size={18} />
            <input id="admin-search-input" type="search" placeholder="Search patients, records, or doctors..." />
          </label>
          <div className="admin-topbar-actions">
            <button className="admin-notify" aria-label="Notifications"><Bell size={18} /><span className="admin-dot" /></button>
            <button className="admin-book-btn"><Plus size={16} /><span>New Booking</span></button>
          </div>
        </header>

        <div className="admin-content">
          <div className="admin-page-head">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Welcome back, here&apos;s what&apos;s happening today.</p>
            </div>
          </div>

          <section className="admin-stat-grid">
            {statCards.map((item) => {
              const Icon = item.icon;
              return (
                <article className="admin-stat-card" key={item.label}>
                  <div className="admin-stat-head">
                    <div className={`admin-stat-icon ${item.tint}`}><Icon size={17} /></div>
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
                  <h3>Appointments by Month</h3>
                  <p>Status breakdown per month from real data</p>
                </div>
              </div>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Accepted" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Rejected" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Completed" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>No appointment data yet</p>
              )}
            </article>

            <article className="admin-card admin-activity-card">
              <div className="admin-card-head">
                <h3>Appointments by Status</h3>
              </div>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>No data</p>
              )}
            </article>
          </section>

          <section className="admin-card admin-table-card">
            <div className="admin-card-head">
              <h3>Recent Appointments</h3>
              <button className="admin-filter-btn"><Filter size={14} /><span>Filter</span></button>
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
                  {tableRows.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="admin-person">
                          <span className="admin-person-avatar">{row.patientInitials}</span>
                          <span>{row.patient}</span>
                        </div>
                      </td>
                      <td><strong>{row.doctor}</strong></td>
                      <td><strong>{row.date}</strong><small>{row.time}</small></td>
                      <td><span className={statusClass[row.status] || "admin-status"}>{row.status}</span></td>
                      <td><button className="admin-kebab" aria-label="More actions"><MoreVertical size={16} /></button></td>
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
