import request from "supertest";
import app from "../app";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.participation.deleteMany();
}

beforeAll(async () => {
  await clearDatabase(); //clear database before running tests
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Participation API", () => {
  let participationId: number;
  it("should create a participation", async () => {
    const res = await request(app).post("/api/participation").send({
      firstName: "Test",
      lastName: "User",
      percentage: 20,
    });

    participationId = res.body.data.id;
    expect(res.status).toEqual(201);
    expect(res.body.data).toHaveProperty("id");
  });

  it("should get all participations", async () => {
    const res = await request(app).get(`/api/participation/user`).send({
      firstName: "Test",
      lastName: "User",
    });

    expect(res.status).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it("should update a participation", async () => {
    const res = await request(app)
      .put(`/api/participation/${participationId}`)
      .send({
        firstName: "Test",
        lastName: "User",
        percentage: 30,
      });

    expect(res.status).toEqual(200);
    expect(res.body.data.percentage).toEqual(30);
  });

  it("should delete a participation", async () => {
    const res = await request(app).delete(
      `/api/participation/${participationId}`
    );

    expect(res.status).toEqual(204);
  });
});
