import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    credential: { type: String, default: "" },
    specialization: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Active", "Inactive", "On Leave"], default: "Active" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Doctor", doctorSchema);
