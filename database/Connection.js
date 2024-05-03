import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mssql",
  }
);

async function testConnectionToDb() {
  try {
    await sequelize.authenticate();
    console.log("Connection to db correct");
  } catch (error) {
    console.log("Error connecting to database");
    console.log(error);
  }
}

export { testConnectionToDb, sequelize };
