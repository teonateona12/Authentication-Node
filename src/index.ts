import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(2000, () => {
  console.log("Server is running on port 2000");
});

const MONGO_URL =
  "mongodb+srv://teonapiranishvili1:teonapiranishvili1@cluster0.a9h6h8t.mongodb.net/";

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/", router());
