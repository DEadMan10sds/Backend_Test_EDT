import "dotenv/config.js";
import Server from "./models/Server.js";

const EDT_Backend_App = new Server();

EDT_Backend_App.listen();
