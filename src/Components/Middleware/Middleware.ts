import { NextFunction } from "express";
import { Token } from "../User/Token";

class Middleware {
  allowedEndpoints: { [key: string]: boolean } = {
    "/user/signup": true,
    "/user/signin": true,
  };

  async beforeHandleRequest(request: any, response: any, next: NextFunction) {
    try {
      const currentEndpoint: string = request.originalUrl || request.url;
      if (!this.allowedEndpoints[currentEndpoint]) {
        const token = this.getTokenFromRequest(request);
        const tokenObj = new Token();
        const tokenData = await tokenObj.validate(token);
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  errorHandler(err: Error, req: any, res: any, next: NextFunction) {
    res.status(500).json({
      success: false,
      errors: [err.message ?? "Internal Server Error"],
    });
  }

  getTokenFromRequest(request: any): string {
    let token = request.query.token ?? "";
    if (token) {
      return token;
    }

    const header = request.headers["authorization"];
    if (header && header.startsWith("Bearer ")) {
      token = header.substring(7);
    }
    if (token) {
      return token;
    }
    throw new Error("Token is required!!");
  }

  getRegisteredRoutes(req: any): any {
    const routes: string[] = [];
    req.app._router.stack.forEach((layer: any) => {
      if (layer.route) {
        const { path, methods } = layer.route;
        routes.push(path);
      } else if (layer.name === "router") {
        layer.handle.stack.forEach((nestedLayer: any) => {
          const { path, methods } = nestedLayer.route;
          routes.push(path);
        });
      }
    });
    return routes;
  }
}

export { Middleware };
