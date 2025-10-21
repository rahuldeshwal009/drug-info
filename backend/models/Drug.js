import mongoose from "mongoose";

const drugSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    genericName: { type: String, required: true },
    brandName: { type: String, default: "" },
    company: { type: String, default: "" },
    launchDate: { type: Date, required: true }
  },
  { timestamps: true }
);

drugSchema.index({ company: 1 });

export default mongoose.models.Drug || mongoose.model("Drug", drugSchema);
