import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { UserDTO } from '../interfaces/IUser';

const options: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export default class JwtService {
  static sign(user: UserDTO): string {
    const token = sign({ data: user }, process.env.JWT_SECRET as string, options);

    return token;
  }

  static verify(token:string) {
    try {
      const payload = verify(token, process.env.JWT_SECRET as string);
      const { data } = payload as JwtPayload;

      return data as UserDTO;
    } catch (_err) {
      const error = new Error('Token must be a valid token');
      error.name = 'UNAUTHORIZED';
      throw error;
    }
  }
}
