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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function clearDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.participation.deleteMany();
    });
}
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield clearDatabase(); //clear database before running tests
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
describe("Participation API", () => {
    let participationId;
    it("should create a participation", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/api/participation").send({
            firstName: "Test",
            lastName: "User",
            percentage: 20,
        });
        participationId = res.body.data.id;
        expect(res.status).toEqual(201);
        expect(res.body.data).toHaveProperty("id");
    }));
    it("should get all participations", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get(`/api/participation/user`).send({
            firstName: "Test",
            lastName: "User",
        });
        expect(res.status).toEqual(200);
        expect(res.body.data).toBeInstanceOf(Array);
    }));
    it("should update a participation", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/participation/${participationId}`)
            .send({
            firstName: "Test",
            lastName: "User",
            percentage: 30,
        });
        expect(res.status).toEqual(200);
        expect(res.body.data.percentage).toEqual(30);
    }));
    it("should delete a participation", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).delete(`/api/participation/${participationId}`);
        expect(res.status).toEqual(204);
    }));
});
