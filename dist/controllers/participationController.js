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
exports.deleteParticipation = exports.updateParticipation = exports.getParticipationById = exports.getAllParticipations = exports.getAllParticipationsByUserName = exports.createParticipation = void 0;
const participationService_1 = require("../services/participationService");
const participationService = new participationService_1.ParticipationService();
const createParticipation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, percentage } = req.body;
    return yield participationService.createParticipation(req, res, {
        firstName,
        lastName,
        percentage,
    });
});
exports.createParticipation = createParticipation;
const getAllParticipationsByUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName } = req.params;
    return yield participationService.getAllParticipationsByUserName(req, res, {
        firstName,
        lastName,
    });
});
exports.getAllParticipationsByUserName = getAllParticipationsByUserName;
const getAllParticipations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield participationService.getAllParticipations(req, res);
});
exports.getAllParticipations = getAllParticipations;
const getParticipationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield participationService.getParticipationById(req, res, req.params.id);
});
exports.getParticipationById = getParticipationById;
const updateParticipation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, percentage } = req.body;
    return yield participationService.updateParticipation(req, res, req.params.id, {
        firstName,
        lastName,
        percentage,
    });
});
exports.updateParticipation = updateParticipation;
const deleteParticipation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield participationService.deleteParticipation(req, res, req.params.id);
});
exports.deleteParticipation = deleteParticipation;
