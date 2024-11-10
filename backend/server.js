import express from "express";
import Dataroute from "./router/data.router.js";
import authroutes from "./router/auth.router.js";
import connectdb from "./config/db.js";

connectdb();

const server = express();
server.use(express.json());

server.use("/data", Dataroute);
server.use("/", authroutes);

server.listen(5000, () => {
  console.info("Server is running at port 5000");
});
