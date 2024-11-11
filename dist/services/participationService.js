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
    getParticipationById(req, res, id) {
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
                console.error({ error });
                if (error) {
                    return res.send({
                        message: error.message,
                        status: 400
                    });
                }
                else {
                    return res.send({
                        message: "Internal Server Error",
                        status: 500
                    });
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
    getAllParticipationsByUserName(req, res, data) {
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
                    message: "Successfully retrived participations by user names",
                    data: participations,
                });
            }
            catch (error) {
                console.error({ error });
                if (error) {
                    return res.send({
                        message: error.message,
                        status: 400
                    });
                }
                else {
                    return res.send({
                        message: "Internal Server Error",
                        status: 500
                    });
                }
            }
        });
    }
    getAllParticipations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const participations = yield prisma.participation.findMany({
                    orderBy: { percentage: "desc" },
                });
                console.log('hello world', { participations });
                return res.send({
                    message: "Successfully retrived participations",
                    data: participations,
                });
            }
            catch (error) {
                console.error({ error });
                if (error) {
                    return res.send({
                        message: error.message,
                        status: 400
                    });
                }
                else {
                    return res.send({
                        message: "Internal Server Error",
                        status: 500
                    });
                }
            }
        });
    }
    createParticipation(req, res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, participation_1.validateParticipation)(data);
            }
            catch (error) {
                if (error) {
                    return res.send({
                        message: error.message,
                        status: 400
                    });
                }
                else {
                    return res.send({
                        message: "Internal Server Error",
                        status: 500
                    });
                }
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
                console.error({ error });
                if (error) {
                    return res.send({
                        message: error.message,
                        status: 400
                    });
                }
                else {
                    return res.send({
                        message: "Internal Server Error",
                        status: 500
                    });
                }
            }
        });
    }
    updateParticipation(req, res, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                try {
                    yield (0, participation_1.validateParticipation)(data);
                }
                catch (error) {
                    console.error({ error });
                    if (error) {
                        return res.send({
                            message: error.message,
                            status: 400
                        });
                    }
                    else {
                        return res.send({
                            message: "Internal Server Error",
                            status: 500
                        });
                    }
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
                console.error({ error });
                if (error) {
                    return res.send({
                        message: error.message,
                        status: 400
                    });
                }
                else {
                    return res.send({
                        message: "Internal Server Error",
                        status: 500
                    });
                }
            }
        });
    }
    deleteParticipation(req, res, id) {
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
                console.error({ error });
                if (error) {
                    return res.send({
                        message: error.message,
                        status: 400
                    });
                }
                else {
                    return res.send({
                        message: "Internal Server Error",
                        status: 500
                    });
                }
            }
        });
    }
}
exports.ParticipationService = ParticipationService;
