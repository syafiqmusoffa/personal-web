require("dotenv").config();
const pg = require("pg");

module.exports = {
  development: {
    username: "postgres",
    password: "12345678",
    database: "personalweb_syafiq",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    dialectModule: pg,
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl:
        process.env.POSTGRES_SSL === "true"
          ? { require: true, rejectUnauthorized: false }
          : false,
    },
  },
};
