import express from "express";
import { authRouter } from "./routers/auth.js";
const app = express();
export const App = app;

app.use("/auth", authRouter);