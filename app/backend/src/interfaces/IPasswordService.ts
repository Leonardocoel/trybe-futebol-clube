export interface IPasswordService {
  hash(password: string): string | Promise<string>;
  check(passwordDB: string, password: string): void;
}
