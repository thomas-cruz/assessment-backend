import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.on("finish", function () {
    console.error(
      req.method,
      decodeURI(req.url),
      res.statusCode,
      res.statusMessage
    );
  });
  res.status(500).send("Internal Server Error");
};
