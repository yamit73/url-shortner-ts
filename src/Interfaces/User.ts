import { ApiResponse } from "./Response";

type user = {
  email: string;
  password: string;
  name: string;
};

interface IUser {
  getUser(req: any, res: any): ApiResponse;
  deleteUser(req: any, res: any): ApiResponse;
}

export { user, IUser };
