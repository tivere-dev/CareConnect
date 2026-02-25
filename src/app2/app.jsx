import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/admin/Dashboard";
import DoctorManagementPage from "./pages/admin/DoctorManagement";
import EditDoctorPage from "./pages/admin/EditDoctor";
import NewDoctorPage from "./pages/admin/NewDoctor";
import EditPatientPage from "./pages/admin/EditPatient";
import NewPatientPage from "./pages/admin/NewPatient";
import AppointmentsPage from "./pages/admin/Appointments";
import NewAppointmentPage from "./pages/admin/NewAppointment";
import PatientsPage from "./pages/admin/Patients";
import LandingPage from "./pages/homepage";

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    credential: "MD, FACC",
    specialization: "Cardiology",
    email: "s.jenkins@careconnect.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Mark Sloan",
    credential: "MBBS, Pediatrics",
    specialization: "Pediatrics",
    email: "m.sloan@careconnect.com",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Dr. Elena Rodriguez",
    credential: "Neurologist",
    specialization: "Neurology",
    email: "e.rodriguez@careconnect.com",
    status: "Active",
  },
  {
    id: 4,
    name: "Dr. Michael Chen",
    credential: "Dermatologist",
    specialization: "Dermatology",
    email: "m.chen@careconnect.com",
    status: "Active",
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    credential: "Orthopedic Surgeon",
    specialization: "Orthopedics",
    email: "l.thompson@careconnect.com",
    status: "On Leave",
  },
];

const initialPatients = [
  {
    id: "P-1001",
    name: "Sarah Jenkins",
    age: 34,
    gender: "Female",
    condition: "Hypertension",
    doctor: "Dr. Sarah Jenkins",
    status: "Stable",
  },
  {
    id: "P-1002",
    name: "Michael Cho",
    age: 42,
    gender: "Male",
    condition: "Migraine",
    doctor: "Dr. Elena Rodriguez",
    status: "Under Review",
  },
  {
    id: "P-1003",
    name: "Olivia Rhye",
    age: 29,
    gender: "Female",
    condition: "Dermatitis",
    doctor: "Dr. Michael Chen",
    status: "Stable",
  },
  {
    id: "P-1004",
    name: "David Wilson",
    age: 51,
    gender: "Male",
    condition: "Cardiac follow-up",
    doctor: "Dr. Mark Sloan",
    status: "Critical",
  },
  {
    id: "P-1005",
    name: "Emma Lawson",
    age: 38,
    gender: "Female",
    condition: "Asthma",
    doctor: "Dr. Lisa Thompson",
    status: "Stable",
  },
];

const initialAppointments = [
  {
    id: "APT-2401",
    patient: "Sarah Jenkins",
    doctor: "Dr. Robert Miller",
    type: "Follow-up",
    date: "Oct 12, 2023",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    id: "APT-2402",
    patient: "Michael Cho",
    doctor: "Dr. Emma Watson",
    type: "New Visit",
    date: "Oct 12, 2023",
    time: "01:15 PM",
    status: "Pending",
  },
  {
    id: "APT-2403",
    patient: "Olivia Rhye",
    doctor: "Dr. Sarah Johnson",
    type: "Consultation",
    date: "Oct 12, 2023",
    time: "03:30 PM",
    status: "In Progress",
  },
  {
    id: "APT-2404",
    patient: "David Wilson",
    doctor: "Dr. Mark Sloan",
    type: "Emergency",
    date: "Oct 13, 2023",
    time: "09:00 AM",
    status: "Canceled",
  },
  {
    id: "APT-2405",
    patient: "Emma Lawson",
    doctor: "Dr. Lisa Thompson",
    type: "Routine Check",
    date: "Oct 13, 2023",
    time: "11:45 AM",
    status: "Confirmed",
  },
];

function App2() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [patients, setPatients] = useState(initialPatients);
  const [appointments, setAppointments] = useState(initialAppointments);

  function handleAddDoctor(doctor) {
    const newDoctor = {
      ...doctor,
      id: Date.now(),
    };


    setDoctors((prev) => [newDoctor, ...prev]);
  }


  function handleDeleteDoctor(id) {
    setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
  }

  function handleUpdateDoctor(id, updates) {
    setDoctors((prev) =>
      prev.map((doctor) => (doctor.id === id ? { ...doctor, ...updates } : doctor)),
    );
  }

  function handleAddPatient(patient) {
    const nextId = `P-${Date.now().toString().slice(-6)}`;
    setPatients((prev) => [{ ...patient, id: nextId }, ...prev]);
  }

  function handleUpdatePatient(id, updates) {
    setPatients((prev) =>
      prev.map((patient) => (patient.id === id ? { ...patient, ...updates } : patient)),
    );
  }

  function handleAddAppointment(appointment) {
    const nextId = `APT-${Date.now().toString().slice(-6)}`;
    setAppointments((prev) => [{ ...appointment, id: nextId }, ...prev]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage doctors={doctors} onDeleteDoctor={handleDeleteDoctor} />}
        />
        <Route
          path="/doctors"
          element={<DoctorManagementPage doctors={doctors} onDeleteDoctor={handleDeleteDoctor} />}
        />
        <Route path="/doctors/new" element={<NewDoctorPage onAddDoctor={handleAddDoctor} />} />
        <Route
          path="/doctors/:id/edit"
          element={<EditDoctorPage doctors={doctors} onUpdateDoctor={handleUpdateDoctor} />}
        />
        <Route path="/patients/new" element={<NewPatientPage onAddPatient={handleAddPatient} />} />
        <Route
          path="/patients/:id/edit"
          element={<EditPatientPage patients={patients} onUpdatePatient={handleUpdatePatient} />}
        />
        <Route path="/patients" element={<PatientsPage patients={patients} />} />
        <Route path="/appointments/new" element={<NewAppointmentPage onAddAppointment={handleAddAppointment} />} />
        <Route path="/appointments" element={<AppointmentsPage appointments={appointments} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App2;