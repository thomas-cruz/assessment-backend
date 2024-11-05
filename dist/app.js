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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const participationRoutes_1 = __importDefault(require("./routes/participationRoutes"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient(); //initialize prisma
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/participation", participationRoutes_1.default);
app.use(errorMiddleware_1.errorHandler);
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        console.log(`Database connected successfully.`);
    }
    catch (error) {
        console.log(`Database error: ${error}`);
        throw error;
    }
});
exports.connectToDatabase = connectToDatabase;
app.use((err, res) => {
    res.status(500).json({ message: "Internal Server Error" });
});
exports.default = app;
