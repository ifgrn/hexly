import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import usersRoute from "./routes/users";

export const runtime = "nodejs";

const app = new Hono();

app.use("*", logger());

app.use(
  "/api/*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://hexly-gamma.vercel.app",
    ],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.route("/api/auth", usersRoute);

app.get("/", (c) => c.json({ status: "ok" }));

export default app;
