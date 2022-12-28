import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.routes";
import { errorHandler } from "./errors/appErrors.error";
import categoryRoutes from "./routes/category.routes";
import propertieRoutes from "./routes/propertie.routes";
import schedulesRoutes from "./routes/schedule.routes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use("/login", sessionRoutes);

app.use("/categories", categoryRoutes);

app.use("/properties", propertieRoutes);

app.use("/schedules", schedulesRoutes);

app.use(errorHandler);

export default app;
