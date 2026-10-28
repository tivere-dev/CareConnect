import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    // Names are kept for display; access control uses the linked user accounts
    patient: { type: String, required: true },
    doctor: { type: String, required: true },
    patientUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    doctorUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    type: {
      type: String,
      enum: ["Consultation", "Follow-up", "New Visit", "Routine Check", "Emergency"],
      default: "Consultation",
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Completed"],
      default: "Pending",
    },
    createdBy: { type: String, enum: ["patient", "admin", "doctor"], default: "patient" },
  },
  { timestamps: true },
);

export default mongoose.model("Appointment", appointmentSchema);
