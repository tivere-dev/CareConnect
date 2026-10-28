import { Router } from "express";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import auth, { adminOnly } from "../middleware/auth.js";

const router = Router();

router.get("/stats", auth, adminOnly, async (req, res) => {
  try {
    const [totalUsers, activeDoctors, totalDoctors, totalPatients, totalAppointments, appointments] =
      await Promise.all([
        User.countDocuments(),
        Doctor.countDocuments({ status: "Active" }),
        Doctor.countDocuments(),
        Patient.countDocuments(),
        Appointment.countDocuments(),
        Appointment.find().sort({ createdAt: -1 }).limit(5),
      ]);

    const [pendingCount, acceptedCount, rejectedCount, completedCount] = await Promise.all([
      Appointment.countDocuments({ status: "Pending" }),
      Appointment.countDocuments({ status: "Accepted" }),
      Appointment.countDocuments({ status: "Rejected" }),
      Appointment.countDocuments({ status: "Completed" }),
    ]);

    const allAppointments = await Appointment.find({}, { date: 1, status: 1, createdAt: 1 });
    const monthlyMap = {};
    for (const apt of allAppointments) {
      let d;
      if (apt.date && apt.date.includes("-")) {
        d = new Date(apt.date);
      } else {
        d = new Date(apt.createdAt);
      }
      if (isNaN(d.getTime())) d = new Date(apt.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!monthlyMap[key]) monthlyMap[key] = { month: key, total: 0, accepted: 0, rejected: 0, pending: 0, completed: 0 };
      monthlyMap[key].total++;
      const s = (apt.status || "").toLowerCase();
      if (s === "accepted" || s === "confirmed") monthlyMap[key].accepted++;
      else if (s === "rejected" || s === "canceled") monthlyMap[key].rejected++;
      else if (s === "completed" || s === "in progress") monthlyMap[key].completed++;
      else monthlyMap[key].pending++;
    }
    const monthlyTrend = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));

    res.json({
      totalUsers,
      activeDoctors,
      totalDoctors,
      totalPatients,
      totalAppointments,
      confirmedAppointments: acceptedCount,
      pendingAppointments: pendingCount,
      statusBreakdown: { pending: pendingCount, accepted: acceptedCount, rejected: rejectedCount, completed: completedCount },
      monthlyTrend,
      recentAppointments: appointments,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
