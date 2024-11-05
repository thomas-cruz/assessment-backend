import { z } from "zod";

interface Participation {
  firstName: string;
  lastName: string;
  percentage: number;
}

const validateParticipation = (data: Participation) => {
  const schema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    percentage: z.number().min(0).max(100),
  });

  return schema.parseAsync(data);
};

export { validateParticipation, Participation };
