import { PrismaClient } from "@prisma/client";
import { validateParticipation } from "../schema/participation";
import { Response } from "express";

const prisma = new PrismaClient();

export class ParticipationService {
  async getParticipationById(res: Response, id: string) {
    try {
      const participation = await prisma.participation.findUnique({
        where: { id: parseInt(id) },
      });
      if (!participation) {
        return res.status(404).send({ message: "Participation not found." });
      }

      return res.send({
        message: "Successfully retrived a participation",
        data: participation,
      });
    } catch (error: any) {
      if (error) {
        return res.status(400).send({ message: error.message });
      } else {
        return res.status(500).send({ message: "Internal Server Error" });
      }
    }
  }

  async getParticipationsByUserName(data: {
    firstName: string;
    lastName: string;
  }) {
    try {
      return await prisma.participation.findMany({
        where: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        orderBy: { percentage: "desc" },
      });
    } catch (error: any) {
      if (error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  }

  async getAllParticipationsByUserName(
    res: Response,
    data: { firstName: string; lastName: string }
  ) {
    try {
      const participations = await prisma.participation.findMany({
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
    } catch (error: any) {
      if (error) {
        return res.status(400).send({ message: error.message });
      } else {
        return res.status(500).send({ message: "Internal Server Error" });
      }
    }
  }

  async createParticipation(
    res: Response,
    data: {
      firstName: string;
      lastName: string;
      percentage: number;
    }
  ) {
    try {
      validateParticipation(data);
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }

    const existingParticipations = await this.getParticipationsByUserName({
      firstName: data.firstName,
      lastName: data.lastName,
    });
    const totalPercentage = existingParticipations.reduce(
      (sum, participation) => sum + participation.percentage,
      0
    );

    //check if the new total percentage equals 100
    const newTotalPercentage = totalPercentage + data.percentage;
    if (newTotalPercentage > 100) {
      return res.status(400).send({
        message: "Total percentage for all participations add up to 100.",
      });
    }

    try {
      const participation = await prisma.participation.create({ data });
      return res.status(201).send({
        message: "Successfully create a user",
        data: participation,
      });
    } catch (error: any) {
      if (error) {
        return res.status(400).send({ message: error.message });
      } else {
        return res.status(500).send({ message: "Internal Server Error" });
      }
    }
  }

  async updateParticipation(
    res: Response,
    id: string,
    data: {
      firstName: string;
      lastName: string;
      percentage: number;
    }
  ) {
    try {
      try {
				validateParticipation(data);
			} catch (error: any) {
				return res.status(400).send({ message: error.message });
			}

      const existingParticipations = await this.getParticipationsByUserName({
        firstName: data.firstName,
        lastName: data.lastName,
      });
      const totalPercentage = existingParticipations.reduce(
        (sum, participation) => sum + participation.percentage,
        0
      ); //check if the new total percentage equals 100
      const newTotalPercentage = totalPercentage + data.percentage; //total percentages

      if (newTotalPercentage > 100) {
        return res.status(400).send({
          message: "Total percentage for all participations must equal 100.",
        });
      }

      const updatedParticipation = await prisma.participation.update({
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
    } catch (error: any) {
      if (error) {
        return res.status(400).send({ message: error.message });
      } else {
        return res.status(500).send({ message: "Internal Server Error" });
      }
    }
  }

  async deleteParticipation(res: Response, id: string) {
    try {
      const deleted = await prisma.participation.delete({
        where: { id: parseInt(id) },
      });
      if (!deleted) {
        return res.status(404).send({ message: "Participation not found." });
      }
      return res
        .status(204)
        .send({ message: "Successfully delete participation." });
    } catch (error: any) {
      if (error) {
        return res.status(400).send({ message: error.message });
      } else {
        return res.status(500).send({ message: "Internal Server Error" });
      }
    }
  }
}
