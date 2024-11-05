"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipationService = void 0;
const client_1 = require("@prisma/client");
const participation_1 = require("../schema/participation");
const prisma = new client_1.PrismaClient();
class ParticipationService {
    getParticipationById(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const participation = yield prisma.participation.findUnique({
                    where: { id: parseInt(id) },
                });
                if (!participation) {
                    return res.status(404).send({ message: "Participation not found." });
                }
                return res.send({
                    message: "Successfully retrived a participation",
                    data: participation,
                });
            }
            catch (error) {
                if (error) {
                    return res.status(400).send({ message: error.message });
                }
                else {
                    return res.status(500).send({ message: "Internal Server Error" });
                }
            }
        });
    }
    getParticipationsByUserName(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.participation.findMany({
                    where: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                    },
                    orderBy: { percentage: "desc" },
                });
            }
            catch (error) {
                if (error) {
                    throw new Error(error.message);
                }
                else {
                    throw error;
                }
            }
        });
    }
    getAllParticipationsByUserName(res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const participations = yield prisma.participation.findMany({
                    where: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                    },
                    orderBy: { percentage: "desc" },
                });
                return res.send({
                    message: "Successfully retrived a participations",
                    data: participations,
                });
            }
            catch (error) {
                if (error) {
                    return res.status(400).send({ message: error.message });
                }
                else {
                    return res.status(500).send({ message: "Internal Server Error" });
                }
            }
        });
    }
    createParticipation(res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, participation_1.validateParticipation)(data);
            }
            catch (error) {
                return res.status(400).send({ message: error.message });
            }
            const existingParticipations = yield this.getParticipationsByUserName({
                firstName: data.firstName,
                lastName: data.lastName,
            });
            const totalPercentage = existingParticipations.reduce((sum, participation) => sum + participation.percentage, 0);
            //check if the new total percentage equals 100
            const newTotalPercentage = totalPercentage + data.percentage;
            if (newTotalPercentage > 100) {
                return res.status(400).send({
                    message: "Total percentage for all participations add up to 100.",
                });
            }
            try {
                const participation = yield prisma.participation.create({ data });
                return res.status(201).send({
                    message: "Successfully create a user",
                    data: participation,
                });
            }
            catch (error) {
                if (error) {
                    return res.status(400).send({ message: error.message });
                }
                else {
                    return res.status(500).send({ message: "Internal Server Error" });
                }
            }
        });
    }
    updateParticipation(res, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                try {
                    (0, participation_1.validateParticipation)(data);
                }
                catch (error) {
                    return res.status(400).send({ message: error.message });
                }
                const existingParticipations = yield this.getParticipationsByUserName({
                    firstName: data.firstName,
                    lastName: data.lastName,
                });
                const totalPercentage = existingParticipations.reduce((sum, participation) => sum + participation.percentage, 0); //check if the new total percentage equals 100
                const newTotalPercentage = totalPercentage + data.percentage; //total percentages
                if (newTotalPercentage > 100) {
                    return res.status(400).send({
                        message: "Total percentage for all participations must equal 100.",
                    });
                }
                const updatedParticipation = yield prisma.participation.update({
                    where: { id: parseInt(id) },
                    data,
                });
                if (!updatedParticipation) {
                    return res.status(404).send({ message: "Participation not found." });
                }
                return res.send({
                    message: "Successfully  update participation",
                    data: updatedParticipation,
                });
            }
            catch (error) {
                if (error) {
                    return res.status(400).send({ message: error.message });
                }
                else {
                    return res.status(500).send({ message: "Internal Server Error" });
                }
            }
        });
    }
    deleteParticipation(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield prisma.participation.delete({
                    where: { id: parseInt(id) },
                });
                if (!deleted) {
                    return res.status(404).send({ message: "Participation not found." });
                }
                return res
                    .status(204)
                    .send({ message: "Successfully delete participation." });
            }
            catch (error) {
                if (error) {
                    return res.status(400).send({ message: error.message });
                }
                else {
                    return res.status(500).send({ message: "Internal Server Error" });
                }
            }
        });
    }
}
exports.ParticipationService = ParticipationService;
