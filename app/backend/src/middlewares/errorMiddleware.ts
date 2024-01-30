import { Request, Response, NextFunction } from 'express';
import ICustomError from '../Interfaces/ICustomError';

function errorMiddleware(error: ICustomError, _req: Request, res: Response, _next: NextFunction) {
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong';

  console.log(error);
  return res.status(status).json({ message });
}

export default errorMiddleware;
