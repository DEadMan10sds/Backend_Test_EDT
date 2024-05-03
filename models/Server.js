import express, { json } from "express";
import cors from "cors";
import { sequelize, testConnectionToDb } from "../database/Connection.js";
import RestaurantController from "../controllers/Restaurant.js";
import generateRouter from "../helpers/generateRouter.js";

const restaurantRoutes = [
  {
    type: "get",
    route: "/all",
    middlewares: [],
    function: RestaurantController.getAll,
  },
  {
    type: "get",
    route: "/single/:id",
    function: RestaurantController.getSingle,
  },
  {
    type: "get",
    route: "/loadCSV",
    middlewares: [],
    function: RestaurantController.loadFromCSVtoDB,
  },
];

const generalRoutes = [
  {
    type: "get",
    route: "/health",
    middlewares: [],
    function: (req, res) => {
      return res.status(200).json({
        message: "Server running correctly",
      });
    },
  },
];

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.APIRoutes = {
      general: {
        path: "",
        router: generateRouter(generalRoutes),
      },
      restaurant: {
        path: "/api/restaurant",
        router: generateRouter(restaurantRoutes),
      },
    };

    this.database();
    this.syncModels();
    this.middlewares();
    this.routes();
  }

  async database() {
    await testConnectionToDb();
  }

  async syncModels() {
    await sequelize.sync();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(json());
  }

  routes() {
    //Automatic generation of routes
    Object.keys(this.APIRoutes).forEach((newRoute) => {
      this.app.use(
        this.APIRoutes[newRoute].path,
        this.APIRoutes[newRoute].router
      );
    });
  }

  listen() {
    this.app.listen(this.port, (err) => {
      console.log(" --------------------------");
      console.log(`|  Server running on: ${this.port} |`);
      console.log(" --------------------------");
    });
  }
}

export default Server;
