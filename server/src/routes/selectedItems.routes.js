import express from "express";
import { getSelectedItems } from "../controllers/selectedItems.controller.js";

const router = express.Router();

router.get("/", getSelectedItems);

export default router;