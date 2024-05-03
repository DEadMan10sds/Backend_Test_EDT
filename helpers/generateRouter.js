import { Router } from "express";

export default function generateRouter(routesArray) {
  const genericRouter = Router();

  routesArray.forEach((route) => {
    genericRouter[route.type](route.route, route.middlewares, route.function);
  });

  return genericRouter;
}
