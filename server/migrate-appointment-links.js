// One-time migration: link existing doctors and appointments to user accounts by ID.
// Only fills in links that are missing, and only when a name matches exactly one
// account — ambiguous or unmatched records are reported and left for an admin.
// Safe to run more than once. Usage: npm run migrate:links
import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";
import Doctor from "./models/Doctor.js";
import Appointment from "./models/Appointment.js";

async function uniqueUserByName(name, role) {
  const matches = await User.find({ name, role }).limit(2);
  return matches.length === 1 ? matches[0]._id : null;
}

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // 1. Doctor profiles -> doctor user accounts (match by email first, then unique name)
  let doctorsLinked = 0;
  for (const doctor of await Doctor.find({ userId: null })) {
    const byEmail = await User.findOne({ email: doctor.email.toLowerCase(), role: "doctor" });
    const userId = byEmail?._id ?? (await uniqueUserByName(doctor.name, "doctor"));
    if (userId) {
      doctor.userId = userId;
      await doctor.save();
      doctorsLinked++;
    } else {
      console.log(`  ! No unique doctor account for profile "${doctor.name}"`);
    }
  }
  console.log(`Linked ${doctorsLinked} doctor profile(s)`);

  // 2. Appointments -> patient and doctor user accounts
  let patientLinks = 0;
  let doctorLinks = 0;
  const unlinked = [];
  const appointments = await Appointment.find({
    $or: [{ patientUserId: null }, { doctorUserId: null }],
  });

  for (const appointment of appointments) {
    if (!appointment.patientUserId) {
      appointment.patientUserId = await uniqueUserByName(appointment.patient, "patient");
      if (appointment.patientUserId) patientLinks++;
    }
    if (!appointment.doctorUserId) {
      const profiles = await Doctor.find({ name: appointment.doctor }).limit(2);
      appointment.doctorUserId =
        profiles.length === 1 && profiles[0].userId
          ? profiles[0].userId
          : await uniqueUserByName(appointment.doctor, "doctor");
      if (appointment.doctorUserId) doctorLinks++;
    }
    if (appointment.isModified()) await appointment.save({ validateBeforeSave: false });
    if (!appointment.patientUserId || !appointment.doctorUserId) {
      unlinked.push(`${appointment._id}  ${appointment.patient} with ${appointment.doctor}`);
    }
  }

  console.log(`Linked ${patientLinks} appointment patient(s) and ${doctorLinks} appointment doctor(s)`);
  if (unlinked.length) {
    console.log(`\n${unlinked.length} appointment(s) not fully linked (no account, or the name is shared).`);
    console.log("Admins can still see and manage these:");
    for (const line of unlinked) console.log(`  - ${line}`);
  }

  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
