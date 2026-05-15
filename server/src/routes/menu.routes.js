import express from "express";

import {
  fetchMenu,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.get("/", fetchMenu);

export default router;