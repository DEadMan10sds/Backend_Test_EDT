import Restaurant from "../models/Restaurant.js";
import errorResponse from "../helpers/errorResponse.js";
import loadCSV from "../helpers/loadCSVonMemory.js";

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
      errorResponse(res, error);
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
      errorResponse(res, error);
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
      return res.status(200).json({
        message: "Restaurant created succesfully",
        data: restaurantSaved,
      });
    } catch (error) {
      errorResponse(res, error);
    }
  },

  updateRestaurant: async function (req, res) {
    const { id } = req.params;
    const restaurantNewData = req.body;

    if (!id)
      return res.status(400).json({
        message: "The id of the restaurant to update is required",
      });

    try {
      const restaurantUpdated = await Restaurant.update(restaurantNewData, {
        where: { id },
      });

      if (!restaurantUpdated[0])
        return res.status(200).json({
          message: "Nothing to update",
        });

      return res.status(200).json({
        message: "Restaurant updated correctly",
        data: restaurantUpdated,
      });
    } catch (error) {
      errorResponse(res, error);
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

      if (!restaurantDeleted)
        return res.status(200).json({
          message: "Nothing to delete",
        });

      return res.status(200).json({
        message: "Restaurant deleted correctly",
        data: restaurantDeleted,
      });
    } catch (error) {
      errorResponse(res, error);
    }
  },

  loadFromCSVtoDB: async function (req, res) {
    try {
      loadCSV(Restaurant);

      return res.status(200).json({
        message: "CSV loaded on database",
      });
    } catch (error) {
      errorResponse(res, error);
    }
  },

  dropTable: async function (req, res) {
    try {
      await Restaurant.drop();
      return res.status(200).json({
        message: "Restaurant table dropped",
      });
    } catch (error) {
      errorResponse(res, error);
    }
  },
};

export default RestaurantController;
