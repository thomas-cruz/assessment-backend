import express from "express";
import "express-async-errors";
import { errorHandler } from "./middlewares/errorMiddleware";
import participationRoutes from "./routes/participationRoutes";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient(); //initialize prisma

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/participation", participationRoutes);
app.use(errorHandler);

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log(`Database connected successfully.`);
  } catch (error) {
    console.log(`Database error: ${error}`);
    throw error;
  }
};

app.use((err, res) => {
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
