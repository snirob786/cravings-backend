import jwt from 'jsonwebtoken';
import { TUser } from '../user/user.interface';

export const createToken = (
  jwtPayload: Partial<TUser>,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
