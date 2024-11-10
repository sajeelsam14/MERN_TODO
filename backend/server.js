import express from "express";
import http from "http";
import dotenv from "dotenv";

import Dataroute from "./router/data.router.js";
import authroutes from "./router/auth.router.js";
import connectdb from "./config/db.js";

dotenv.config();
connectdb();

const app = express();
app.use(express.json());

app.use("/data", Dataroute);
app.use("/", authroutes);

const server = http.createServer(app);
server.listen(5000, () => {
  console.info("Server is running at port 5000");
});
