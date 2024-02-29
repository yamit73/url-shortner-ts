import { User } from "../Models/User";
import { ApiResponse } from "./Response";

type user = {
  email: string;
  password: string;
  name: string;
};

interface IUser {
  userModel: User;

  getUser(req: any, res: any): ApiResponse;
  deleteUser(req: any, res: any): ApiResponse;
  signup(req: any, res: any): Promise<ApiResponse>;
  signin(req: any, res: any): Promise<ApiResponse>;
}

export { user, IUser };
