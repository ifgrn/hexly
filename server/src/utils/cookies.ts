import type { Context } from "hono";
import { setSignedCookie, deleteCookie } from "hono/cookie";
import { generateToken } from "./jwt-auth.js";
import { cookieOptions, COOKIE_NAME } from "./cookie-options.js";

export const setCookies = async (c: Context, userId: string) => {
  const token = await generateToken(userId);
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) throw new Error("JWT_SECRET_KEY is not defined");

  await setSignedCookie(c, COOKIE_NAME, token, secretKey, cookieOptions);
};

export const eraseCookie = (c: Context, cookieName: string) => {
  deleteCookie(c, cookieName);
};
