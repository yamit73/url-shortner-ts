import { user, User as UserInterface } from "../../Interfaces/User";

class User implements UserInterface {
  getUser(req: any, res: any): any {
    return res.json({ success: true, msg: "Hello there! from getUser" });
  }

  deleteUser(req: any, res: any): any {
    return res.json({ success: true, msg: "Hello there! from deleteUser" });
  }
}

export default User;
