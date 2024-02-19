import { user, IUser as UserInterface } from "../../Interfaces/User";
import { ApiResponse } from "../../Interfaces/Response";

class User implements UserInterface {
  getUser(req: any, res: any): ApiResponse {
    return res.json({ success: true, data: "Hello there! from getUser" });
  }

  deleteUser(req: any, res: any): ApiResponse {
    return res.json({ success: true, data: "Hello there! from deleteUser" });
  }
}

export default User;
