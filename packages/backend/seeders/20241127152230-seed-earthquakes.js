"use strict";

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const csvFilePath = path.join(__dirname, "../data/earthquakes.csv");
    const earthquakes = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (row) => {
          earthquakes.push({
            location: `${row["Latitude"]}, ${row["Longitude"]}`,
            magnitude: parseFloat(row["Magnitude"]),
            date: new Date(row["DateTime"]),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        })
        .on("end", resolve)
        .on("error", reject);
    });

    await queryInterface.bulkInsert("Earthquakes", earthquakes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Earthquakes", null, {});
  },
};
