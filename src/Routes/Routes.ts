import { Router } from "express";
import User from "../Components/User/User";
import { IRoutes } from "../Interfaces/Routes";

class Routes implements IRoutes {
  _router: Router;

  constructor() {
    this._router = Router();
  }

  getRoutes(): Router {
    this.userRoutes();
    return this._router;
  }

  productRoutes(): Router {
    return this._router;
  }

  userRoutes(): Router {
    const user = new User();
    this._router.get("/user", user.getUser);
    return this._router;
  }
}

export default Routes;
