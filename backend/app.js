import express from "express";
import cors from "cors";
import routers from "./routers/index.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


dotenv.config();


const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser(process.env.COOKIE_SECRET_PARSER));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
  const corsOptions = {
    origin: "http://localhost:5173", // Update this to match your frontend's URL
    credentials: true, // Enable CORS with credentials
  };
   app.use(express.json());
app.use(cors( corsOptions ));

app.use("/api", routers);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
