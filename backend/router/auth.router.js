import express from "express";
import { login, singup } from "../controller/auth.controller.js";

const router = express.Router();

router.put("/",login);
router.put("/singup",singup);

export default router