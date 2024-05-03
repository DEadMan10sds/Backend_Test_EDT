import Restaurant from "../models/Restaurant.js";
import errorResponse from "../helpers/errorResponse.js";
import loadCSV from "../helpers/loadCSVonMemory.js";
import { sequelize } from "../database/Connection.js";
import { Op } from "sequelize";

const RestaurantController = {
  getAll: async function (req, res) {
    try {
      const allRestaurants = await Restaurant.findAll();

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

  statistics: async function (req, res) {
    const { latitude: lat, longitude: lng, radius: rad } = req.query;
    let findedRestaurants;

    const radiousInMiles = rad / 1609.344;

    findedRestaurants = await Restaurant.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(
              "3959 * acos(cos(radians(" +
                lat +
                ")) * cos(radians(lat)) * cos(radians(" +
                lng +
                ") - radians(lng)) + sin(radians(" +
                lat +
                ")) * sin(radians(lat)))"
            ),
            "distance",
          ],
        ],
      },
      having: {
        ["distance"]: { [Op.lte]: radiousInMiles },
      },
    });

    const avgRating =
      findedRestaurants.reduce((acumulator, currentValue) => {
        return acumulator + currentValue.rating;
      }, 0) / findedRestaurants.length;

    const mediumDistanceSquare = findedRestaurants.reduce(
      (acumulator, currentValue) => {
        return (
          acumulator + Math.pow(Math.abs(currentValue.rating - avgRating), 2)
        );
      },
      0
    );

    const finalStd = mediumDistanceSquare / findedRestaurants.length;

    return res.status(200).json({
      message: "Statistics solicitated",
      data: findedRestaurants,
      count: findedRestaurants.length,
      avg: avgRating,
      std: finalStd,
    });
  },
};

export default RestaurantController;
