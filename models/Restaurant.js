import { DataTypes } from "sequelize";
import { sequelize } from "../database/Connection.js";

const Restaurant = sequelize.define(
  "Restaurant",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 4,
      },
    },
    name: {
      type: DataTypes.TEXT,
    },
    site: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    street: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.TEXT,
    },
    state: {
      type: DataTypes.TEXT,
    },
    lat: {
      type: DataTypes.FLOAT,
    },
    lng: {
      type: DataTypes.FLOAT,
    },
  },
  {
    // Other model options go here
    timestamps: true,
  }
);

export default Restaurant;
