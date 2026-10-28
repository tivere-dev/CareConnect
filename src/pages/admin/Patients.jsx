import { useEffect, useState } from "react";
import {
  Download,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserCheck2,
  UserPlus2,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { patientsAPI } from "../../services/api";

const statusClass = {
  Stable: "patient-status patient-status-stable",
  "Under Review": "patient-status patient-status-review",
  Critical: "patient-status patient-status-critical",
};

function PatientAvatar({ name }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return <span className="patient-avatar">{initials}</span>;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    patientsAPI.getAll().then(setPatients).catch(console.error).finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    try {
      await patientsAPI.delete(id);
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <div className="admin-shell patient-shell"><AdminSidebar /><main className="doctor-main patient-main"><p>Loading...</p></main></div>;

  return (
    <div className="admin-shell patient-shell">
      <AdminSidebar />

      <main className="doctor-main patient-main">
        <div className="doctor-head-row">
          <div>
            <p className="doctor-breadcrumb">Dashboard &gt; Patients</p>
            <h1>Patient Management</h1>
          </div>

          <Link to="/admin/patients/new" className="doctor-add-btn">
            <Plus size={18} />
            <span>Add New Patient</span>
          </Link>
        </div>

        <section className="doctor-search-card patient-search-card">
          <label className="doctor-search-input" htmlFor="patient-search">
            <Search size={18} />
            <input
              id="patient-search"
              type="search"
              placeholder="Search by patient name, ID, or condition..."
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
                  <th>PATIENT NAME</th>
                  <th>AGE / GENDER</th>
                  <th>CONDITION</th>
                  <th>ASSIGNED DOCTOR</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id}>
                    <td>
                      <div className="doctor-name-cell">
                        <PatientAvatar name={patient.name} />
                        <strong>{patient.name}</strong>
                      </div>
                    </td>
                    <td>
                      {patient.age} / {patient.gender}
                    </td>
                    <td>{patient.condition}</td>
                    <td>{patient.doctor}</td>
                    <td>
                      <span className={statusClass[patient.status]}>{patient.status}</span>
                    </td>
                    <td>
                      <div className="doctor-actions-cell">
                        <Link to={`/admin/patients/${patient._id}/edit`} aria-label={`Edit ${patient.name}`}>
                          <Pencil size={16} />
                        </Link>
                        <button type="button" aria-label={`Delete ${patient.name}`} onClick={() => handleDelete(patient._id)}>
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
              Showing 1 to {patients.length} of {patients.length} patients
            </p>
          </div>
        </section>

        <section className="doctor-summary-grid">
          <article className="doctor-summary-card">
            <span className="doctor-summary-icon blue">
              <UsersRound size={18} />
            </span>
            <div>
              <p>Total Patients</p>
              <strong>{patients.length}</strong>
            </div>
          </article>

          <article className="doctor-summary-card">
            <span className="doctor-summary-icon green">
              <UserCheck2 size={18} />
            </span>
            <div>
              <p>Stable Patients</p>
              <strong>{patients.filter((p) => p.status === "Stable").length}</strong>
            </div>
          </article>

          <article className="doctor-summary-card">
            <span className="doctor-summary-icon indigo">
              <UserPlus2 size={18} />
            </span>
            <div>
              <p>Under Review</p>
              <strong>{patients.filter((p) => p.status === "Under Review").length}</strong>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
