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
  "*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization", "access-control-allow-origin", "access-control-allow-credentials", "access-control-allow-methods", "access-control-allow-headers"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// rutas
app.route("/api/auth", usersRoute);

// ❗ EXPORT CORRECTO PARA VERCEL
export default app;
