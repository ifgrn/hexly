import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import usersRoute from "./routes/users";

export const config = {
  runtime: "edge",
};

const app = new Hono();

app.use(logger());

// 🔑 CORS GLOBAL
app.use(
  "/api/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// rutas
app.route("/api/auth", usersRoute);

// ❗ EXPORT CORRECTO PARA VERCEL
export default app;
