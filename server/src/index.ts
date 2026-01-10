import { Hono } from "hono";
import { logger } from "hono/logger";
import usersRoute from "./routes/users";

const app = new Hono();

const PORT = Bun.env.PORT || 4000;
app.use(logger());

app.route("/api/auth", usersRoute);

export default {
  port: PORT,
  fetch: app.fetch,
};
