import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { contentRouter } from "./routers/contentRouter.js";
import { sequelize } from "./datasource.js";

export const app = express();
const PORT = 3000;

app.use(cors({
  origin: "*", // Allow all origins
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

try {
  await sequelize.authenticate();
  // Automatically detect all of your defined models and create (or modify) the tables for you.
  // This is not recommended for production-use, but that is a topic for a later time!
  await sequelize.sync({ alter: { drop: false }, logging: console.log() });
  console.log("Connection has been established successfully.");
  // console.log(User.getAttributes());
  // console.log(Message.getAttributes());
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

app.use("/api/content", contentRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
