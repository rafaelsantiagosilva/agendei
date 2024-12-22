import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./router";

dotenv.config();

const app = express();
app.use(cors());
app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`> Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});