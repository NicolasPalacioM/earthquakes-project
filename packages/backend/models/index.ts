import { Sequelize } from "sequelize";
import config from "../dbConfig/config";
import Earthquake from "./earthquake";

const { database, username, password, host, dialect, port } = config;

console.log("Dialect in models/index.ts:", dialect);

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port,
  logging: console.log,
});

Earthquake.initModel(sequelize);

export { sequelize, Earthquake };
export default sequelize;
