import express from "express";
import cors from "cors";
import routers from "./routers/index.js";
import mongoose from "mongoose";
import "dotenv/config";


const app = express();
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(cors());

app.use("/api", routers);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
