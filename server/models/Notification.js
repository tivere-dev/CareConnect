import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["appointment_accepted", "appointment_rejected", "general"], default: "general" },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
