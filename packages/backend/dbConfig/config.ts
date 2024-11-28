import dotenv from "dotenv";
import { Dialect } from "sequelize";

dotenv.config();

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  port: number;
}

const config: DBConfig = {
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "postgres",
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: "postgres",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
};

export default config;
