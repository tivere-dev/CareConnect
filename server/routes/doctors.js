import { Router } from "express";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import auth, { adminOnly } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const { password, ...doctorData } = req.body;

    if (password && doctorData.email) {
      const existingUser = await User.findOne({ email: doctorData.email });
      if (!existingUser) {
        await User.create({
          name: doctorData.name,
          email: doctorData.email,
          password,
          role: "doctor",
        });
      }
    }

    const doctor = await Doctor.create(doctorData);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, adminOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
