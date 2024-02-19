import { Router } from "express";

interface IRoutes {
  getRoutes(): Router;
  productRoutes(): Router;
  userRoutes(): Router;
}

export { IRoutes };
