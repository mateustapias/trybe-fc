import { NextFunction, Request, Response } from 'express';
import schema from '../services/validations/schema';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    // const user = req.body;
    // const requiredKeys = ['email', 'password'];
    // const notFoundKey = requiredKeys.find((key) => !(key in user));
    // if (notFoundKey) {
    //   return res.status(400).json({ message: 'All fields must be filled' });
    // }
    // next();
    const { error } = schema.loginUserSchema.validate(req.body);
    if (error) {
      return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: error.message });
    }
    next();
  }
}

export default Validations;
