import { Router } from "express";
import User from "../Components/User/User";

class Routes {
  _router: Router;

  constructor() {
    this._router = Router();
  }

  getRoutes(): any {
    const user = new User();
    this._router.get("/user", user.getUser);
  }
}

export default Routes;
