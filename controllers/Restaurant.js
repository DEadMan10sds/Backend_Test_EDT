import Restaurant from "../models/Restaurant.js";
import fs from "fs";
import csv from "csv-parser";

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
  updateRestaurant: async function (req, res) {},
  deleteRestaurant: async function (req, res) {},
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
};

export default RestaurantController;
