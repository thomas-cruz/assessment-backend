// src/routes/participationRoutes.ts
import { Router } from "express";
import {
  createParticipation,
  getParticipationById,
  getAllParticipationsByUserName,
  updateParticipation,
  deleteParticipation,
} from "../controllers/participationController";

const router = Router();

router.post("/", createParticipation);
router.get("/user", getAllParticipationsByUserName);
router.get("/:id", getParticipationById);
router.put("/:id", updateParticipation);
router.delete("/:id", deleteParticipation);

export default router;
