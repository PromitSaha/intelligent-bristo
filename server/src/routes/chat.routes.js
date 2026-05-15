import express from "express";

import { processChat } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", processChat);

export default router;