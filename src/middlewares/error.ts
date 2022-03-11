import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.statusCode || 500);
  res.json({
    error: err?.message,
    path: req.path,
    stack: err?.stack,
    statusCode: err?.statusCode || 500,
  });
}
