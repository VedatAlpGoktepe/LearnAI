import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { contentRouter } from "./routers/contentRouter.js";
import { accountRouter } from "./routers/accountRouter.js";
import { twilioRouter } from "./routers/twilioRouter.js";
import * as dotenv from "dotenv";
dotenv.config({
  path: "./.env",
})

export const app = express();
const PORT = 3000;

app.use(cors({
  origin: process.env.NODE_ENV=='production'? "https://utsc-learnai.tech": "http://localhost:4200",
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

app.use("/api/content", contentRouter);
app.use("/api/account", accountRouter);
app.use("/api/twilio", twilioRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
