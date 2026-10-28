import { Router } from "express";
import Appointment from "../models/Appointment.js";
import Notification from "../models/Notification.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import auth, { adminOnly } from "../middleware/auth.js";

const router = Router();

router.use(auth);

// Patients and doctors can only access appointments linked to their own account
function canAccess(user, appointment) {
  if (user.role === "admin") return true;
  if (user.role === "patient") return String(appointment.patientUserId) === user.id;
  if (user.role === "doctor") return String(appointment.doctorUserId) === user.id;
  return false;
}

router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === "patient") filter.patientUserId = req.user.id;
    else if (req.user.role === "doctor") filter.doctorUserId = req.user.id;
    else if (req.user.role !== "admin") return res.json([]);
    const appointments = await Appointment.find(filter).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment || !canAccess(req.user, appointment)) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { type, date, time, doctorId, patientId } = req.body;
    const data = { type, date, time };

    if (req.user.role === "admin") {
      data.createdBy = "admin";
      data.status = "Accepted";
    } else if (req.user.role === "patient") {
      data.createdBy = "patient";
      data.status = "Pending";
    } else {
      return res.status(403).json({ message: "Only patients and admins can book appointments" });
    }

    // Doctor: always resolved from the selected doctor profile
    const doctor = doctorId && (await Doctor.findById(doctorId).catch(() => null));
    if (!doctor) return res.status(400).json({ message: "Please select a valid doctor" });
    data.doctor = doctor.name;
    data.doctorUserId = doctor.userId;

    // Patient: patients book for themselves; admins pick a patient profile
    if (req.user.role === "patient") {
      data.patient = req.user.name;
      data.patientUserId = req.user.id;
    } else {
      const patient = patientId && (await Patient.findById(patientId).catch(() => null));
      if (!patient) return res.status(400).json({ message: "Please select a valid patient" });
      data.patient = patient.name;
      data.patientUserId = patient.userId;
    }

    const appointment = await Appointment.create(data);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "doctor") {
      return res.status(403).json({ message: "Only admins and doctors can update appointment status" });
    }

    const { status } = req.body;
    if (!["Pending", "Accepted", "Rejected", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const existing = await Appointment.findById(req.params.id);
    if (!existing || !canAccess(req.user, existing)) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after', runValidators: true },
    );

    if ((status === "Accepted" || status === "Rejected") && appointment.patientUserId) {
      const verb = status === "Accepted" ? "accepted" : "rejected";
      await Notification.create({
        userId: appointment.patientUserId,
        message: `Your appointment with ${appointment.doctor} on ${appointment.date} at ${appointment.time} has been ${verb}.`,
        type: status === "Accepted" ? "appointment_accepted" : "appointment_rejected",
        appointmentId: appointment._id,
      });
    }

    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", adminOnly, async (req, res) => {
  try {
    const { patientUserId, doctorUserId, ...updates } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, updates, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", adminOnly, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
