import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.statusCode || 500);
  res.json({
    message: err?.message,
    error: {
      path: req.path,
      stack: err?.stack,
    },
    statusCode: err?.statusCode || 500,
  });
}
