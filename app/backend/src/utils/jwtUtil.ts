import { sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export type TokenPayload = {
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
  return data;
}

export default {
  signToken,
  verifyToken,
};
