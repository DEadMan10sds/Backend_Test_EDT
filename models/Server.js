import express, { json } from "express";
import cors from "cors";
import { sequelize, testConnectionToDb } from "../database/Connection.js";
import User from "./User.js";

const modelsArray = [];

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.database();
    this.syncModels();
    this.middlewares();
  }

  async database() {
    await testConnectionToDb();
  }

  async syncModels() {
    await sequelize.sync({ force: true });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(json());
  }

  listen() {
    this.app.listen(this.port, (err) => {
      console.log("---------------------------");
      console.log(`|  Server running on: ${this.port} |`);
      console.log("---------------------------");
    });
  }
}

export default Server;
