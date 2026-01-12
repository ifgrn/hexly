import type { Context, Next } from "hono";
import { getSignedCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { COOKIE_NAME } from "../utils/cookie-options";

export const middleware = async (c: Context, next: Next) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    console.error("JWT_SECRET_KEY is not defined");
    return c.json({ success: false, msg: "Internal Server Error" }, 500);
  }

  const cookie = await getSignedCookie(c, secretKey, COOKIE_NAME);

  if (!cookie)
    return c.json({ success: false, msg: "User not authorized" }, 401);

  try {
    const { id } = await verify(cookie, secretKey);
    c.set("userId", id);
    await next();
  } catch (error) {
    return c.json({ success: false, msg: "Invalid or expired token" }, 401);
  }
};
