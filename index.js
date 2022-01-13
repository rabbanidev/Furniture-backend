import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// All Routes import
import { errorHandler, notFound } from "./middleware/error.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// All route declear
app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to furnitre backend" });
});
app.use("/api", authRoutes);
app.use("/api", productRoutes);

// Custom Error Handler
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
