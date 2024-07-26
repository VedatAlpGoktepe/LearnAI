import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { contentRouter } from "./routers/contentRouter.js";

export const app = express();
const PORT = 3000;

app.use(cors({
  origin: "*", // Allow all origins
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

app.use("/api/content", contentRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
