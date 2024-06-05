import app from "./app.js";
import mongoose from "mongoose";
import mongodb from "mongodb";
import logger from "./configs/logger.config.js";

const PORT = process.env.PORT || 8000;
const { DATABASE_URL } = process.env;

mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection Error: ${err}`);
  process.exit(1);
});

mongoose.connect(DATABASE_URL, {}).then(() => {
  logger.info("Sucessfully Connected to Mongodb");
});

let server;

server = app.listen(PORT, () => {
  logger.info(`App Running on ${PORT}..`);
});

const exitHandler = () => {
  if (server) {
    logger.info("server Closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);

//SIGTERM

process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
});

// import fs from "fs";
// import path from "path";

// const filePath = path.join(path.resolve(), "Data", "development-data.json");
// const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// app.get("/", (req, res) => {
//   res.status(200).json({
//     results: data.length,
//     data: data,
//   });
// });
