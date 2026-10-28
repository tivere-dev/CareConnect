import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";
import Doctor from "./models/Doctor.js";
import Patient from "./models/Patient.js";
import Appointment from "./models/Appointment.js";

const doctors = [
  {
    name: "Dr. Sarah Jenkins",
    credential: "MD, FACC",
    specialization: "Cardiology",
    email: "s.jenkins@careconnect.com",
    status: "Active",
    location: "St. Mary's Medical Plaza, NY",
    bio: "Board-certified Senior Cardiologist with over 15 years of experience in advanced cardiovascular health.",
    rating: 4.9,
    reviewCount: 120,
  },
  {
    name: "Dr. Mark Sloan",
    credential: "MBBS, Pediatrics",
    specialization: "Pediatrics",
    email: "m.sloan@careconnect.com",
    status: "Inactive",
    location: "Children's Medical Center, NY",
    bio: "Experienced pediatrician specializing in child development and preventive care.",
    rating: 4.7,
    reviewCount: 95,
  },
  {
    name: "Dr. Elena Rodriguez",
    credential: "Neurologist",
    specialization: "Neurology",
    email: "e.rodriguez@careconnect.com",
    status: "Active",
    location: "Neuro Care Institute, NY",
    bio: "Specialist in neurological disorders with a focus on stroke recovery and migraine treatment.",
    rating: 4.8,
    reviewCount: 88,
  },
  {
    name: "Dr. Michael Chen",
    credential: "Dermatologist",
    specialization: "Dermatology",
    email: "m.chen@careconnect.com",
    status: "Active",
    location: "Skin Health Clinic, NY",
    bio: "Expert dermatologist treating a wide range of skin conditions and cosmetic dermatology.",
    rating: 4.6,
    reviewCount: 72,
  },
  {
    name: "Dr. Lisa Thompson",
    credential: "Orthopedic Surgeon",
    specialization: "Orthopedics",
    email: "l.thompson@careconnect.com",
    status: "On Leave",
    location: "Joint & Spine Center, NY",
    bio: "Orthopedic surgeon specializing in joint replacement and sports medicine.",
    rating: 4.9,
    reviewCount: 110,
  },
];

const patients = [
  { name: "Sarah Jenkins", age: 34, gender: "Female", condition: "Hypertension", doctor: "Dr. Sarah Jenkins", status: "Stable" },
  { name: "Michael Cho", age: 42, gender: "Male", condition: "Migraine", doctor: "Dr. Elena Rodriguez", status: "Under Review" },
  { name: "Olivia Rhye", age: 29, gender: "Female", condition: "Dermatitis", doctor: "Dr. Michael Chen", status: "Stable" },
  { name: "David Wilson", age: 51, gender: "Male", condition: "Cardiac follow-up", doctor: "Dr. Mark Sloan", status: "Critical" },
  { name: "Emma Lawson", age: 38, gender: "Female", condition: "Asthma", doctor: "Dr. Lisa Thompson", status: "Stable" },
];

const appointments = [
  { patient: "Sarah Jenkins", doctor: "Dr. Robert Miller", type: "Follow-up", date: "Oct 12, 2023", time: "10:30 AM", status: "Accepted" },
  { patient: "Michael Cho", doctor: "Dr. Emma Watson", type: "New Visit", date: "Oct 12, 2023", time: "01:15 PM", status: "Pending" },
  { patient: "Olivia Rhye", doctor: "Dr. Sarah Johnson", type: "Consultation", date: "Oct 12, 2023", time: "03:30 PM", status: "Completed" },
  { patient: "David Wilson", doctor: "Dr. Mark Sloan", type: "Emergency", date: "Oct 13, 2023", time: "09:00 AM", status: "Rejected" },
  { patient: "Emma Lawson", doctor: "Dr. Lisa Thompson", type: "Routine Check", date: "Oct 13, 2023", time: "11:45 AM", status: "Accepted" },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  await Promise.all([
    User.deleteMany(),
    Doctor.deleteMany(),
    Patient.deleteMany(),
    Appointment.deleteMany(),
  ]);
  console.log("Cleared existing data");

  const [, john, sarah] = await User.create([
    { name: "Admin User", email: "admin@careconnect.com", password: "admin123", role: "admin" },
    { name: "John Doe", email: "john@careconnect.com", password: "patient123", role: "patient" },
    { name: "Dr. Sarah Jenkins", email: "sarah@careconnect.com", password: "doctor123", role: "doctor" },
  ]);
  console.log("Seeded users");

  // Link the demo doctor and patient accounts to their profiles
  await Doctor.insertMany(
    doctors.map((d) => (d.name === sarah.name ? { ...d, userId: sarah._id } : d)),
  );
  console.log("Seeded doctors");

  await Patient.insertMany([
    ...patients,
    { userId: john._id, name: john.name, email: john.email, age: 30, gender: "Male", condition: "Annual check-up", doctor: sarah.name },
  ]);
  console.log("Seeded patients");

  await Appointment.insertMany([
    ...appointments,
    { patient: john.name, patientUserId: john._id, doctor: sarah.name, doctorUserId: sarah._id, type: "Consultation", date: "Nov 18, 2026", time: "10:00 AM", status: "Pending" },
    { patient: john.name, patientUserId: john._id, doctor: sarah.name, doctorUserId: sarah._id, type: "Follow-up", date: "Oct 02, 2026", time: "02:30 PM", status: "Completed" },
  ]);
  console.log("Seeded appointments");

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
