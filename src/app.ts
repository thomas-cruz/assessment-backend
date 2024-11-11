import express from "express";
import "express-async-errors";
import participationRoutes from "./routes/participationRoutes";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/participation", participationRoutes);

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log(`Database connected successfully.`);
  } catch (error) {
    console.log(`Database error: ${error}`);
    throw error;
  }
};

export default app;
