import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { doctorRouter } from "./routers/doctor.router";
import { userRouter } from "./routers/user.router";
import { appointmentRouter } from "./routers/appointment.router";
import { adminRouter } from "./routers/admin.router";
import { serviceRouter } from "./routers/service.router";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/doctors", doctorRouter);
app.use("/users", userRouter);
app.use("/appointments", appointmentRouter);
app.use("/services", serviceRouter);
app.use("/admins", adminRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`> Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});