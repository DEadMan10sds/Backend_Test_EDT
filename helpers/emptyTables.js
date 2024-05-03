import { sequelize } from "../database/Connection.js";

export default async function emptyTables() {
  await sequelize.sync({ force: true });
}
