import { Request, Response } from "express";
import { ParticipationService } from "../services/participationService";

const participationService = new ParticipationService();

export const createParticipation = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { firstName, lastName, percentage } = req.body;
  return await participationService.createParticipation(res, {
    firstName,
    lastName,
    percentage,
  });
};

export const getAllParticipationsByUserName = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { firstName, lastName } = req.body;
  return await participationService.getAllParticipationsByUserName(res, {
    firstName,
    lastName,
  });
};

export const getParticipationById = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await participationService.getParticipationById(res, req.params.id);
};

export const updateParticipation = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { firstName, lastName, percentage } = req.body;
  return await participationService.updateParticipation(res, req.params.id, {
    firstName,
    lastName,
    percentage,
  });
};

export const deleteParticipation = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await participationService.deleteParticipation(res, req.params.id);
};
