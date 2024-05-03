import Restaurant from "../models/Restaurant.js";

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
  createRestaurant: async function (req, res) {},
  updateRestaurant: async function (req, res) {},
  deleteRestaurant: async function (req, res) {},
  loadFromCSV: async function (req, res) {},
};

export default RestaurantController;
