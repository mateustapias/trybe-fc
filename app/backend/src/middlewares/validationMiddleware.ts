import { NextFunction, Request, Response } from 'express';
import schema from '../services/validations/schema';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { error } = schema.loginUserSchema.validate(req.body);
    if (error) {
      const { type } = error.details[0];
      if (type === 'string.email' || type === 'string.min') {
        return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: error.message });
      }
      return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: error.message });
    }
    next();
  }

  static async validateAddMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    let errorMessage: string;
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      errorMessage = 'It is not possible to create a match with two equal teams';
      return res.status(mapStatusHTTP('UNPROCESSABLE_ENTITY')).json({ message: errorMessage });
    }
    next();
  }
}

export default Validations;
