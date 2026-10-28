import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true, trim: true },
    age: { type: Number, default: null },
    gender: { type: String, enum: ["Male", "Female", ""], default: "" },
    condition: { type: String, default: "New Patient" },
    doctor: { type: String, default: "Unassigned" },
    status: { type: String, enum: ["Stable", "Under Review", "Critical"], default: "Stable" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Patient", patientSchema);
