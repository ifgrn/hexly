import { Hono } from "hono";
import { logger } from "hono/logger";
import usersRoute from "./routes/users";
import { cors } from "hono/cors";

const app = new Hono();

const PORT = Bun.env.PORT || 4000;
app.use(logger());

app.use("/api/*", cors({
  origin: (origin) => origin,
  credentials: true,
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.route("/api/auth", usersRoute);

export default {
  port: PORT,
  fetch: app.fetch,
};
