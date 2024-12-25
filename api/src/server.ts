import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { doctorRouter } from "./routers/doctor.router";
import { userRouter } from "./routers/user.router";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/doctors", doctorRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`> Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});