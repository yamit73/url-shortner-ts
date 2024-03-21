import Jwt, { JwtPayload } from "jsonwebtoken";
import fs from "fs/promises";
import { IToken } from "../../Interfaces/IToken";

class Token implements IToken {
  passphrase: string = "amit";

  async generate(payload: {}) {
    try {
      if (!payload) {
        throw new Error("Payload is required!");
      }
      const privateKey = await this.loadPrivateKey();
      const token = Jwt.sign(
        payload,
        { key: privateKey, passphrase: this.passphrase },
        {
          algorithm: "RS256",
          expiresIn: "2h",
        }
      );
      return token;
    } catch (error) {
      throw error;
    }
  }

  async validate(token: string) {
    try {
      const publicKey = await this.loadPublicKey();
      const tokenData = Jwt.verify(publicKey, token);
      return tokenData;
    } catch (error) {
      throw error;
    }
  }

  private async loadPrivateKey(): Promise<string> {
    const key = await fs.readFile("/home/cedcoss/Node/filereader/security/private.pem");
    return key.toString();
  }
  private async loadPublicKey(): Promise<string> {
    const key = await fs.readFile("/home/cedcoss/Node/filereader/security/public.pem");
    return key.toString();
  }
}

export { Token };
