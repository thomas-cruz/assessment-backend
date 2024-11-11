import { PrismaClient } from "@prisma/client";
import { validateParticipation } from "../schema/participation";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class ParticipationService {
  async getParticipationById(req: Request, res: Response, id: string) {
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
      console.error({error})
      if (error) {
        return res.send({
          message: error.message,
          status: 400
        });
      } else {
        return res.send({
          message: "Internal Server Error",
          status: 500
        });
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
    req: Request, 
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
        message: "Successfully retrived participations by user names",
        data: participations,
      });
    } catch (error: any) {
      console.error({error})
      if (error) {
        return res.send({
          message: error.message,
          status: 400
        });
      } else {
        return res.send({
          message: "Internal Server Error",
          status: 500
        });
      }
    }
  }

  async getAllParticipations(req: Request, res: Response) {
    try {
      const participations = await prisma.participation.findMany({
        orderBy: { percentage: "desc" },
      });
      console.log('hello world', {participations})
      return res.send({
        message: "Successfully retrived participations",
        data: participations,
      });
    } catch (error: any) {
      console.error({error})
      if (error) {
        return res.send({
          message: error.message,
          status: 400
        });
      } else {
        return res.send({
          message: "Internal Server Error",
          status: 500
        });
      }
    }
  }

  async createParticipation(
    req: Request, 
    res: Response,
    data: {
      firstName: string;
      lastName: string;
      percentage: number;
    }
  ) {
    try {
      await validateParticipation(data);
    } catch (error: any) {
      if (error) {
        return res.send({
          message: error.message,
          status: 400
        });
      } else {
        return res.send({
          message: "Internal Server Error",
          status: 500
        });
      }
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
      console.error({error})
      if (error) {
        return res.send({
          message: error.message,
          status: 400
        });
      } else {
        return res.send({
          message: "Internal Server Error",
          status: 500
        });
      }
    }
  }

  async updateParticipation(
    req: Request, 
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
        await validateParticipation(data);
      } catch (error: any) {
        console.error({error})
        if (error) {
          return res.send({
            message: error.message,
            status: 400
          });
        } else {
          return res.send({
            message: "Internal Server Error",
            status: 500
          });
        }
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
      console.error({error})
      if (error) {
        return res.send({
          message: error.message,
          status: 400
        });
      } else {
        return res.send({
          message: "Internal Server Error",
          status: 500
        });
      }
    }
  }

  async deleteParticipation(req: Request, res: Response, id: string) {
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
      console.error({error})
      if (error) {
        return res.send({
          message: error.message,
          status: 400
        });
      } else {
        return res.send({
          message: "Internal Server Error",
          status: 500
        });
      }
    }
  }
}
