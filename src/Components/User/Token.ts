import { Jwt } from "jsonwebtoken";
import fs from "fs/promises";
import { IToken } from "../../Interfaces/IToken";

class Token implements IToken {
  async generate() {
    try {
      const privateKey = await this.loadPrivateKey();
      const token = "";
      return token;
    } catch (error) {
      throw error;
    }
  }

  async validate(token: string) {
    try {
      const publicKey = await this.loadPublicKey();
    } catch (error) {
      throw error;
    }
    return true;
  }
  private async loadPrivateKey(): Promise<string> {
    const key = await fs.readFile("././././security/private-key.pem");
    return key.toString();
  }
  private async loadPublicKey(): Promise<string> {
    const key = await fs.readFile("./././././security/public-key.p");
    return key.toString();
  }
}

export { Token };
