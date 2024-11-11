import { Request, Response } from "express";
import { ParticipationService } from "../services/participationService";

const participationService = new ParticipationService();

export const createParticipation = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { firstName, lastName, percentage } = req.body;
  return await participationService.createParticipation(req, res, {
    firstName,
    lastName,
    percentage,
  });
};

export const getAllParticipationsByUserName = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { firstName, lastName } = req.params;
  return await participationService.getAllParticipationsByUserName(req, res, {
    firstName,
    lastName,
  });
};

export const getAllParticipations = async (req: Request, res: Response): Promise<any> => {
  return await participationService.getAllParticipations(req, res);
};

export const getParticipationById = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await participationService.getParticipationById(req, res, req.params.id);
};

export const updateParticipation = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { firstName, lastName, percentage } = req.body;
  return await participationService.updateParticipation(req, res, req.params.id, {
    firstName,
    lastName,
    percentage,
  });
};

export const deleteParticipation = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await participationService.deleteParticipation(req, res, req.params.id);
};
