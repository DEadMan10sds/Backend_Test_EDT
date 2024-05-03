import Restaurant from "../models/Restaurant.js";
import fs from "fs";
import csv from "csv-parser";
import { where } from "sequelize";

const results = [];

const RestaurantController = {
  getAll: async function (req, res) {
    try {
      const allRestaurants = await Restaurant.findAll();

      console.log(allRestaurants);

      if (!allRestaurants || !allRestaurants.length)
        return res.status(404).json({
          message: "There are no restaurants.",
        });

      return res.status(200).json({
        message: "Restaurants finded.",
        data: allRestaurants,
      });
    } catch (error) {
      console.log(error, new Date());
      return res.status(400).json({ error: error.error });
    }
  },

  getSingle: async function (req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        message: "The id of the restaurant is required",
      });

    try {
      const findedRestaurant = await Restaurant.findByPk(id);

      if (!findedRestaurant)
        return res.status(404).json({
          message: "There's no restaurant with this id",
        });

      return res.status(200).json({
        message: "Restaurant finded",
        data: findedRestaurant,
      });
    } catch (error) {
      console.log(error, new Date());
      return res.status(400).json({ error: error.error });
    }
  },

  createRestaurant: async function (req, res) {
    const restaurantData = req.body;

    if (!restaurantData)
      return res.status(404).json({
        message: "The restaurant data is required",
      });

    try {
      const restaurantSaved = await Restaurant.create(restaurantData);
      console.log(restaurantSaved);
      return res.status(200).json({
        message: "Restaurant created succesfully",
      });
    } catch (error) {
      console.log(error, new Date());
      return res.status(400).json({ error: error.error });
    }
  },

  updateRestaurant: async function (req, res) {
    const { id } = req.params;
    const restaurantNewData = req.body;

    if (!id)
      return res.status(400).json({
        message: "The id of the restaurant to update is required",
      });

    if (!restaurantNewData)
      return res.status(400).json({
        message: "The data of the restaurant to update is required",
      });

    try {
      const restaurantUpdated = await Restaurant.update(restaurantNewData, {
        where: { id },
      });

      console.log(restaurantUpdated);
      return res.status(200);
    } catch (error) {
      console.log(error, new Date());
      return res.status(400).json({ error: error.error });
    }
  },

  deleteRestaurant: async function (req, res) {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({
        message: "The id of the restaurant to delete is required",
      });

    try {
      const restaurantDeleted = await Restaurant.destroy({
        where: { id },
      });

      console.log(restaurantDeleted);
      return res.status(200);
    } catch (error) {
      console.log(error, new Date());
      return res.status(400).json({ error: error.error });
    }
  },

  loadFromCSVtoDB: async function (req, res) {
    fs.createReadStream("./documents/restaurantes.csv")
      .pipe(csv())
      .on("data", async (data) => {
        const newRestaurantInstance = await Restaurant.create(data);
        results.push(newRestaurantInstance);
      })
      .on("end", () => {
        return res.status(200).json({ results });
      });
  },

  dropTable: async function (req, res) {
    await Restaurant.drop();
    return res.status(200).json({
      message: "Restauran table dropped",
    });
  },
};

export default RestaurantController;
