import * as bcrypt from 'bcryptjs';

export default class PasswordService {
  static hash(password: string): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
  }

  static check(password: string, passwordDB: string): void {
    const match = bcrypt.compareSync(password, passwordDB);

    if (!match) {
      const error = new Error('Incorrect email or password');
      error.name = 'UNAUTHORIZED';
      throw error;
    }
  }
}
