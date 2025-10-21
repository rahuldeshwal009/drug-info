import express from "express";
import Drug from "../models/Drug.js";

const router = express.Router();

router.get("/config", (req, res) => {
  res.json({
    columns: [
      { key: "id", label: "Id" },
      { key: "code", label: "Code" },
      { key: "name", label: "Name" },
      { key: "company", label: "Company" },
      { key: "launchDate", label: "Launch Date" }
    ]
  });
});

router.get("/drugs", async (req, res) => {
  try {
    const { company } = req.query;
    const filter = company ? { company } : {};
    // sort by launchDate descending
    const drugs = await Drug.find(filter).sort({ launchDate: -1 }).lean();
    res.json(drugs);
  } catch (err) {
    console.error("Error fetching drugs:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/companies", async (req, res) => {
  try {
    const companies = await Drug.distinct("company");
    res.json(companies.filter(Boolean).sort());
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
