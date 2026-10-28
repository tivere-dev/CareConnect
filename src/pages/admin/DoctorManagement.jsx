import { useEffect, useState } from "react";
import { Download, Filter, Pencil, Plus, Search, ShieldPlus, Trash2, UserPlus2, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { doctorsAPI } from "../../services/api";

const statusClass = {
  Active: "doctor-status doctor-status-active",
  Inactive: "doctor-status doctor-status-inactive",
  "On Leave": "doctor-status doctor-status-leave",
};

function DoctorAvatar({ name }) {
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return <span className="doctor-avatar">{initials}</span>;
}

export default function DoctorManagementPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doctorsAPI.getAll().then(setDoctors).catch(console.error).finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    try {
      await doctorsAPI.delete(id);
      setDoctors((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <div className="admin-shell doctor-shell"><AdminSidebar /><main className="doctor-main"><p>Loading...</p></main></div>;

  return (
    <div className="admin-shell doctor-shell">
      <AdminSidebar />

      <main className="doctor-main">
        <div className="doctor-head-row">
          <div>
            <p className="doctor-breadcrumb">Dashboard &gt; Doctors</p>
            <h1>Doctor Management</h1>
          </div>

          <Link className="doctor-add-btn" to="/admin/doctors/new">
            <Plus size={18} />
            <span>Add New Doctor</span>
          </Link>
        </div>

        <section className="doctor-search-card">
          <label className="doctor-search-input" htmlFor="doctor-search">
            <Search size={18} />
            <input
              id="doctor-search"
              type="search"
              placeholder="Search by name, email, or specialty..."
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
                  <th>DOCTOR NAME</th>
                  <th>SPECIALIZATION</th>
                  <th>EMAIL ADDRESS</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>
                      <div className="doctor-name-cell">
                        <DoctorAvatar name={doctor.name} />
                        <div>
                          <strong>{doctor.name}</strong>
                          <small>{doctor.credential}</small>
                        </div>
                      </div>
                    </td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.email}</td>
                    <td>
                      <span className={statusClass[doctor.status] ?? statusClass.Active}>
                        {doctor.status}
                      </span>
                    </td>
                    <td>
                      <div className="doctor-actions-cell">
                        <Link to={`/admin/doctors/${doctor._id}/edit`} aria-label={`Edit ${doctor.name}`}>
                          <Pencil size={16} />
                        </Link>
                        <button
                          type="button"
                          aria-label={`Delete ${doctor.name}`}
                          onClick={() => handleDelete(doctor._id)}
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
              Showing 1 to {doctors.length} of {doctors.length} doctors
            </p>
          </div>
        </section>

        <section className="doctor-summary-grid">
          <article className="doctor-summary-card">
            <span className="doctor-summary-icon blue">
              <UsersRound size={18} />
            </span>
            <div>
              <p>Total Doctors</p>
              <strong>{doctors.length}</strong>
            </div>
          </article>

          <article className="doctor-summary-card">
            <span className="doctor-summary-icon green">
              <UserPlus2 size={18} />
            </span>
            <div>
              <p>Active Duty</p>
              <strong>{doctors.filter((d) => d.status === "Active").length}</strong>
            </div>
          </article>

          <article className="doctor-summary-card">
            <span className="doctor-summary-icon indigo">
              <ShieldPlus size={18} />
            </span>
            <div>
              <p>Specialties</p>
              <strong>{new Set(doctors.map((d) => d.specialization)).size}</strong>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
