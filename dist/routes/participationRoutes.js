"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/participationRoutes.ts
const express_1 = require("express");
const participationController_1 = require("../controllers/participationController");
const router = (0, express_1.Router)();
router.post("/", participationController_1.createParticipation);
router.get("/user", participationController_1.getAllParticipationsByUserName);
router.get("/:id", participationController_1.getParticipationById);
router.put("/:id", participationController_1.updateParticipation);
router.delete("/:id", participationController_1.deleteParticipation);
exports.default = router;
