import express from "express";
import cors from "cors";
import morgan from "morgan";

import testRoutes from "./routes/test.routes.js";
import selectedItemsRoutes from "./routes/selectedItems.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/test", testRoutes);
app.use("/api/selected-items", selectedItemsRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Intelligent Bistro API Running",
  });
});

export default app;