import fs from "fs";
import csv from "csv-parser";

function loadCSV(model, pathOfFile = "./documents/restaurantes.csv") {
  const results = [];
  fs.createReadStream(pathOfFile)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", async () => {
      await model.bulkCreate(results);
    });
}

export default loadCSV;
