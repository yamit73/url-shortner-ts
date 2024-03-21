import { JwtPayload } from "jsonwebtoken";

interface IToken {
  generate(payload: {}): Promise<string>;
  validate(token: string): Promise<string | JwtPayload>;
}

export { IToken };
