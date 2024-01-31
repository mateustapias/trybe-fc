import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import jwtUtil from '../utils/jwtUtil';

export default class AuthMiddleware {
  private static extractToken(authorization: string) {
    return authorization.split(' ')[1];
  }

  static async auth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
    }

    const token = AuthMiddleware.extractToken(authorization);

    try {
      const decoded = jwtUtil.verifyToken(token);
      // return res.status(200).json({ message: decoded });
      res.locals.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
