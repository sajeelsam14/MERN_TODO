import express from "express";
import { authHandler } from "../middleware/authhandler.js";
import {
  getTodo,
  getData,
  getDataByID,
  deleteData,
  newData,
  updateData,
} from "../controller/data.controller.js";
const router = express.Router();
router.get("/todo", authHandler, getTodo);
router.get("/", authHandler, getData);
router.get("/:id", getDataByID);
router.put("/", authHandler, newData);
router.post("/", updateData);
router.delete("/:id", deleteData);

export default router;
