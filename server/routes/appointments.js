import { Router } from "express";
import Appointment from "../models/Appointment.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.patient) filter.patient = req.query.patient;
    if (req.query.doctor) filter.doctor = req.query.doctor;
    const appointments = await Appointment.find(filter).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.createdBy === "admin") {
      data.status = "Accepted";
    } else {
      data.status = data.status || "Pending";
    }
    const appointment = await Appointment.create(data);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id/status", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "doctor") {
      return res.status(403).json({ message: "Only admins and doctors can update appointment status" });
    }

    const { status } = req.body;
    if (!["Pending", "Accepted", "Rejected", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after', runValidators: true },
    );
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    if (status === "Accepted" || status === "Rejected") {
      const patientUser = await User.findOne({ name: appointment.patient, role: "patient" });
      if (patientUser) {
        const verb = status === "Accepted" ? "accepted" : "rejected";
        await Notification.create({
          userId: patientUser._id,
          message: `Your appointment with ${appointment.doctor} on ${appointment.date} at ${appointment.time} has been ${verb}.`,
          type: status === "Accepted" ? "appointment_accepted" : "appointment_rejected",
          appointmentId: appointment._id,
        });
      }
    }

    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
