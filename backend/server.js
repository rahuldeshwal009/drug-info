// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import drugRoutes from "./routes/drugRoutes.js";
import fs from "fs";
import Drug from "./models/Drug.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api", drugRoutes);

// simple health check
app.get("/", (req, res) => res.send("Drug Info Backend is running"));

// connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/drugdb";
const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGO_URI, { dbName: "DrugCluster" })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Seed DB automatically if collection empty
    const count = await Drug.countDocuments();
    if (count === 0) {
      console.log("No drugs found in DB — seeding from data/drugData.json");
      try {
        const dataPath = path.join(__dirname, "data", "drugData.json");
        const raw = fs.readFileSync(dataPath, "utf8");
        const docs = JSON.parse(raw).map((d) => ({
          ...d,
          // ensure launchDate is a real Date
          launchDate: d.launchDate ? new Date(d.launchDate) : new Date()
        }));
        await Drug.insertMany(docs);
        console.log(`Inserted ${docs.length} drug records`);
      } catch (err) {
        console.error("Seeding error:", err);
      }
    } else {
      console.log(`DB already seeded (${count} documents)`);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// graceful shutdown
process.on("SIGINT", async () => {
  console.log("SIGINT received — closing MongoDB connection");
  await mongoose.disconnect();
  process.exit(0);
});
