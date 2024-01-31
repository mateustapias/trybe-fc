// import jwt from 'jsonwebtoken';
import { sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  email: string,
  role: string,
};

function signToken(payload: TokenPayload): string {
  const token = sign(payload, secret);
  return token;
}

function verifyToken(token: string): TokenPayload {
  const data = verify(token, secret) as TokenPayload;
  console.log('DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:', data);
  return data;
}

export default {
  signToken,
  verifyToken,
};
