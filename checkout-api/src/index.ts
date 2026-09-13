import express from "express";
import { healthRouter } from "./routes/health";
import { productsRouter } from "./routes/products";
import { ordersRouter } from "./routes/orders";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Permissive CORS for local/dev use across services.
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 🚨 DELIBERATELY BROKEN CODE FOR ROLLABACK TEST 🚨
// This intercepts all requests and returns a 500 error, 
// causing the Load Balancer health check to fail.
app.use((req, res, next) => {
  res.status(500).json({ error: "DELIBERATELY BROKEN FOR ROLLABACK TEST" });
});

app.use(healthRouter);
app.use(productsRouter);
app.use(ordersRouter);

app.listen(port, () => {
  console.log(`FreshCart checkout-api listening on port ${port}`);
});