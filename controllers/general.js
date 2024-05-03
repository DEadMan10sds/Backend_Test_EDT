import emptyTables from "../helpers/emptyTables.js";
import errorResponse from "../helpers/errorResponse.js";
import loadCSV from "../helpers/loadCSVonMemory.js";
import Restaurant from "../models/Restaurant.js";

const generalController = {
  resetDatabase: async function (req, res) {
    try {
      await emptyTables();
      loadCSV(Restaurant);
      return res.status(200).json({
        message: "API status reseted",
      });
    } catch (error) {
      errorResponse(res, error);
    }
  },
  health: function (req, res) {
    return res.status(200).json({
      message: "Server running correctly",
    });
  },
  redirect: function (req, res) {
    return res.status(404).redirect("/health");
  },
};

export default generalController;
