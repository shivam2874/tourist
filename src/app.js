import express, { json } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongosanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileupload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";

//dotenv config
dotenv.config();

//Create app from Express
const app = express();

//Morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//Helmet
app.use(helmet());

//Parse Json request Url
app.use(express.json());

//Parse Jsonrequest body
app.use(express.urlencoded({ extended: true }));

//Sanitize request Data
app.use(mongosanitize());

//Enable cookie Parse
app.use(cookieParser());

//gzip compression
app.use(compression());

//cors
app.use(cors());

//file upload
app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This Route Does Not Exist"));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: err.status || 500,
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.send("Hello from server");
});
export default app;
