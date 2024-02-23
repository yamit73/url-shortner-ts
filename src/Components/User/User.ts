import { user, IUser as UserInterface } from "../../Interfaces/IUser";
import { ApiResponse } from "../../Interfaces/Response";
import { User as UserModel } from "../../Models/User";
import { Password } from "./Password";

class User implements UserInterface {
  userModel: UserModel;
  private _passwordObj: any;

  constructor() {
    this.userModel = new UserModel();
    // this.validateSignParams = this.validateSignParams.bind(this);
  }

  signup(req: any, res: any): ApiResponse {
    let response: ApiResponse = {
      success: false,
      errors: [],
    };
    const rawBody = req.body ?? {};
    if (Object.keys(rawBody).length < 0) {
      response.errors!.push("No data found");
      return res.status(400).json(response);
    }
    console.log(rawBody);
    const isValidParams = this?.validateSignParams(rawBody);
    if (isValidParams.success) {
      this.userModel
        .getByEmail(rawBody.email)
        .then((user) => {
          if (user) {
            response.errors?.push("User with same email already exists!!");
            return res.status(400).json(response);
          }
          return this._passwordObj.encrypt();
        })
        .then((hashedPassword: string) => {
          return this.userModel.create({
            full_name: rawBody.full_name,
            email: rawBody.email,
            password: hashedPassword,
            phone_number: rawBody.phone,
          });
        })
        .then((user) => {
          res.status(200);
          response = {
            success: true,
            data: { user_id: user._id.toString() },
          };
        });
    } else {
      res.status(400);
      response = isValidParams;
    }

    return res.json(response);
  }

  signin(req: any, res: any): ApiResponse {
    let response: ApiResponse = {
      success: false,
      errors: [],
    };
    const rawBody = req.body ?? {};
    if (Object.keys(rawBody).length < 1) {
      response.errors?.push("No data found!!");
      return res.status(400).json(response);
    }
    const validateUserResponse = this?.validateSignParams(rawBody);
    if (validateUserResponse.success) {
      this.userModel
        .getByEmail(rawBody.email)
        .then((dbUser) => {
          if (dbUser === null) {
            response.errors?.push("User not found, kindly signup!!");
            return res.status(400).json(response);
          }
          return this._passwordObj
            .setPassword(rawBody.password)
            .match(dbUser?.password ?? "")
            .then((matched: boolean) => {
              if (!matched) {
                response.errors?.push("Invalid password!");
                return res.status(400).json(response);
              }
              response.success = true;
              response.data = dbUser;
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500);
          response.errors?.push("Internal server error!!");
        });
    } else {
      res.status(404);
      response = validateUserResponse;
    }
    return res.json(response);
  }

  getUser(req: any, res: any): ApiResponse {
    return res.json({ success: true, data: "Hello there! from getUser" });
  }

  deleteUser(req: any, res: any): ApiResponse {
    return res.json({ success: true, data: "Hello there! from deleteUser" });
  }

  protected validateSignParams(rawBody: any): ApiResponse {
    let response: ApiResponse = {
      success: true,
      errors: [],
    };

    if (!rawBody?.email || !rawBody?.password) {
      response.success = false;
      response.errors?.push("email, password are required!!");
      return response;
    }
    this._passwordObj = new Password(rawBody.password);
    const isValidEmail: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      rawBody.email
    );
    const isValidPassword: boolean = this._passwordObj.validate();
    if (!isValidEmail) {
      response.success = false;
      response.errors?.push("Email is not valid!");
    }
    if (!isValidPassword) {
      response.success = false;
      response.errors?.push("Password is invalid!!");
    }
    return response;
  }
}

export default User;
